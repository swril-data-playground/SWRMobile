import { useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import { NavContainer, NavItem, Tabs } from 'src/app/navigation'
import { tabName, tabNames } from 'src/app/navigation/tabs'
import { AuthContext, AuthContextType, defaultAuthValue } from 'contexts/authContext'
import { defaultNavValue, NavContext, NavContextType } from 'contexts/navContext'
import { DataContextType, defaultDataValue, DataContext } from 'contexts/dataContext'
import { LoadingScreen } from 'screens/LoadingScreen'
import { ErrorScreen } from 'screens/ErrorScreen'
import { Program } from 'screens/Program'
import { Privacy } from 'screens/Privacy'
import { Help } from 'screens/Help'
import { LearnMore } from 'screens/LearnMore'
import { Login } from 'screens/Login/Login'
import { Survey } from 'screens/Survey'
import { CreateSurvey } from 'screens/CreateSurvey'
import { CreateProgram } from 'screens/CreateProgram'
import Home from 'screens/Home'
import Programs from 'screens/Programs'
import Settings from 'screens/Settings'
import Profile from 'screens/Profile'
import Surveys from 'screens/Surveys'
import SignUp from 'screens/SignUp'
import Create from 'screens/Create'
import MyData from 'screens/MyData'
import BackgroundImage from 'components/BackgroundImage'
import { tryGetAuth } from 'data/account'
import { listIncludes } from 'utils/typelessIncludes'
import * as Font from 'expo-font';
import { fonts } from 'assets/fonts/fonts'
import { tryGetPrograms } from 'data/programs'
import { tryGetSurveys } from 'data/surveys'
import { ProgramData } from 'screens/ProgramData'
import { SurveyData } from 'screens/SurveyData'
import { MyCreations } from 'screens/MyCreations'
import { UploadScreen } from 'screens/Upload'
import { defaultDisplayValue, DisplayContext, DisplayContextType } from 'contexts/displayContext'
import { tryGetPolls } from 'data/polls'
import Polls from 'screens/Polls'
import { Poll } from 'screens/Poll'
import { HouseholdRequest } from 'screens/HouseholdRequest'
import { AddHouseholdMember } from 'screens/AddHouseholdMember'
import { defaultToastValue, ToastContext, ToastContextType } from 'contexts/toastContext'
import { Toast } from 'types/toast'
import { Toasts } from 'components/toasts/Toasts'
import { AllToasts } from 'screens/AllToasts/AllToasts'

const SmartWaterlooMobile = () => {
	const [screenState, setScreenState] = useState<'LOADING' | 'ERROR' | 'LOADED'>('LOADING')
	const [auth, setAuth] = useState<AuthContextType>(defaultAuthValue)
	const [nav, setNav] = useState<NavContextType>(defaultNavValue)
	const [error, setError] = useState<Error|null>(null)
	const [display, setDisplay] = useState<DisplayContextType>(defaultDisplayValue)
	const [data, setData] = useState<DataContextType>(defaultDataValue)
	const [toastData, setToastData] = useState<ToastContextType>(defaultToastValue)
	const throwError = (e:Error) => { setError(e); setScreenState('ERROR')}
	const [navContent, setNavContent] = useState<any>(null)
	const dataValue = { data, setData }
	const toastDataRef = useRef<ToastContextType>(toastData)
	toastDataRef.current = toastData
	
	const removeToast = (toast:Toast) => {
		setToastData({
			...toastDataRef.current,
			activeToasts: toastDataRef.current.activeToasts.filter(t => t !== toast)
		})
	}
	const toastValue = { 
		content: toastData,  
		pushToast: (toast:Toast) => {
			setTimeout(() => {
				removeToast(toast)
			}, 5000)
			setToastData({ 
				toasts: [...toastData.toasts, toast],
				activeToasts: [...toastData.activeToasts, toast]
			})
		}
	}
	const displayValue = { display }
	const navValue = { 
		nav, 
		setNav: (newNav: string, newNavContent: any = null) => {
			if (newNavContent !== null) setNavContent(newNavContent)
			let newStack: string[]
			if (listIncludes(tabNames, newNav)) {
				newStack = [newNav]
			} else if (listIncludes(nav.stack, newNav)) {
				const idx = nav.stack.indexOf(newNav)
				newStack = [...nav.stack.slice(0, idx + 1)]
			} else {
				newStack = [...nav.stack, newNav]
			}
			setNav({nav: newNav, stack: newStack})
			if (newNavContent === null) setNavContent(newNavContent)
		},
		setStack: (newStack: string[], newNavContent: any = null) => {
			if (newNavContent !== null) setNavContent(newNavContent)
			setNav({nav: newStack[newStack.length-1], stack: newStack})
			if (newNavContent === null) setNavContent(newNavContent)
		},
	}
	const authValue = { 
		auth, 
		setAuth: (newAuth: AuthContextType) => {
			if (newAuth.account) navValue.setNav('Home')
			else navValue.setNav('SignUp')
			setAuth(newAuth)
		},
	 }
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow', (e) => {setDisplay({...display, keyboardHeight: e.endCoordinates.height})}
		)
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide', () => {setDisplay({...display, keyboardHeight: 0})}
		)
		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		}
	}, []);

	const initialLoad = async () => {
		await Font.loadAsync(fonts);
		const { status: authStatus, auth: gotAuth } = await tryGetAuth()
		if (authStatus === 200) {
			setAuth(gotAuth)
		} else if (authStatus === 400) {
			throwError(new Error('User authorization failed'))
			return
		} else if (authStatus === 404) {
			setScreenState('LOADED')
			navValue.setNav('SignUp')
			return
		}
		const { status: programStatus, programs } = await tryGetPrograms()
		const { status: surveyStatus, surveys } = await tryGetSurveys()
		const { status: pollStatus, polls } = await tryGetPolls()
		if (programStatus === 200 && surveyStatus === 200 && pollStatus === 200) {
			setData({...data, programs, surveys, polls})
			setScreenState('LOADED')
		} else {
			let errorStrings = []
			if (pollStatus !== 200) errorStrings.push('Polls')
			else if (programStatus !== 200) errorStrings.push('Programs')
			else if (surveyStatus !== 200) errorStrings.push('Surveys')
			throwError(new Error(`${errorStrings.join(' and ')} failed to load`))
		}
	}
	if (screenState === 'LOADING') initialLoad()
	const mainTab = listIncludes(tabNames, nav.nav)
	return (
		<AuthContext.Provider value={authValue}>
			<DataContext.Provider value={dataValue}>
				<NavContext.Provider value={navValue}>
					<ToastContext.Provider value={toastValue}>
						<DisplayContext.Provider value={displayValue}>
							<View style={styles.parentContainer}>
								<BackgroundImage />
								{screenState === 'LOADING' && <LoadingScreen />}
								{screenState === 'ERROR' && error && <ErrorScreen err={error} />}
								{screenState === 'LOADED' && (
									<>
										<NavContainer >
											<NavItem name={'SignUp'} component={<SignUp />} />
											<NavItem name={'Login'} component={<Login />} />
											<NavItem name={'Home'} component={<Home />} />
											<NavItem name={'Programs'} component={<Programs />} />
											<NavItem name={'Program'} component={<Program content={navContent} />} />
											<NavItem name={'Surveys'} component={<Surveys />} />
											<NavItem name={'Survey'} component={<Survey content={navContent} />} />
											<NavItem name={'Polls'} component={<Polls />} />
											<NavItem name={'Poll'} component={<Poll content={navContent} />} />
											<NavItem name={'Settings'} component={<Settings />} />
											<NavItem name={'Profile'} component={<Profile />} />
											<NavItem name={'Create'} component={<Create />} />
											<NavItem name={'Data'} component={<MyData />} />
											<NavItem name={'Privacy'} component={<Privacy />} />
											<NavItem name={'Help'} component={<Help />} />
											<NavItem name={'LearnMore'} component={<LearnMore />} />
											<NavItem name={'CreateSurvey'} component={<CreateSurvey />} />
											<NavItem name={'CreateProgram'} component={<CreateProgram />} />
											<NavItem name={'ProgramData'} component={<ProgramData />} />
											<NavItem name={'SurveyData'} component={<SurveyData />} />
											<NavItem name={'MyCreations'} component={<MyCreations />} />
											<NavItem name={'UploadScreen'} component={<UploadScreen />} />
											<NavItem name={'HouseholdRequest'} component={<HouseholdRequest content={navContent}/>} />
											<NavItem name={'AddHouseholdMember'} component={<AddHouseholdMember />} />
											<NavItem name={'AllToasts'} component={<AllToasts />} />
										</NavContainer>
										{mainTab && <Tabs tab={nav.nav as tabName} />}
										<Toasts tabs={mainTab} />
									</>
								)}
							</View>
						</DisplayContext.Provider>
					</ToastContext.Provider>
				</NavContext.Provider>
			</DataContext.Provider>
		</AuthContext.Provider>
	)
}

const styles = StyleSheet.create({
	parentContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
})

export default SmartWaterlooMobile