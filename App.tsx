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
import { PollData } from 'screens/PollData'
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
// import { ApolloProvider, gql } from '@apollo/client'
import { graphql } from 'data/graphql'
import { Storage } from 'data/storage'
import { EditProfile } from 'screens/EditProfile/EditProfile'
import { FilterType } from 'types/filter'
import { ThankYou } from 'screens/ThankYou'


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
	const dataValue = { data, setData, reloadData: async () => { await loadData() }}
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
			let newStack: string[]
			if (listIncludes(tabNames, newNav) || nav == null) {
				newStack = [newNav]
			} else if (listIncludes(nav.stack, newNav)) {
				const idx = nav.stack.indexOf(newNav)
				newStack = [...nav.stack.slice(0, idx + 1)]
			} else {
				newStack = [...nav.stack, newNav]
			}
			if (newNavContent !== null) {
				setNav(null)
				setNavContent(newNavContent)
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
		setAuth: async (newAuth: AuthContextType) => {
			await Storage.setJson('auth', newAuth)
			graphql.setAuth(newAuth.auth)
			setAuth(newAuth)
		},
		signOut: async () => {
			await Storage.remove('auth')
			setAuth(defaultAuthValue)
			navValue.setNav('SignUp')
		}
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

	const loadAccount = async ():Promise<boolean> => {
		const { status: authStatus, auth: gotAuth } = await tryGetAuth()
		if (authStatus === 200) {
			if (!gotAuth) {
				console.error("No auth")
				return false
			}
			setAuth(gotAuth)
			return true
		} else if (authStatus === 400) {
			throwError(new Error('User authorization failed'))
		} else if (authStatus === 404) {
			setScreenState('LOADED')
			navValue.setNav('SignUp')
		}
		return false
	}

	const loadData = async () => {
		const defaultFilter: FilterType = {
			category: 'All',
			municipality: 'Waterloo',
			sort: {
				recent: true,
				// lastOpened: boolean - not implemented
				nameAZ: false,
				nameZA: false
			}
		}
		const { status: programStatus, programs } = await tryGetPrograms(defaultFilter)
		const { status: surveyStatus, surveys } = await tryGetSurveys(defaultFilter)
		const { status: pollStatus, polls } = await tryGetPolls(defaultFilter)
		if (programStatus === 500 || surveyStatus === 500 || pollStatus === 500) {
			throwError(new Error(`Network connection error`))
		}
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

	const [initialLoadStarted, setInitialLoadStarted] = useState(false)

	const initialLoad = async () => {
		await Font.loadAsync(fonts);
		const accountSuccess = await loadAccount()
		if (accountSuccess) await loadData()
	}
	if (screenState === 'LOADING' && !initialLoadStarted) {
		setInitialLoadStarted(true)
		initialLoad()
	}
	const mainTab = !!nav && listIncludes(tabNames, nav.nav)
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
											<NavItem name={'PollData'} component={<PollData />} />
											<NavItem name={'MyCreations'} component={<MyCreations />} />
											<NavItem name={'UploadScreen'} component={<UploadScreen />} />
											<NavItem name={'HouseholdRequest'} component={<HouseholdRequest content={navContent}/>} />
											<NavItem name={'AddHouseholdMember'} component={<AddHouseholdMember />} />
											<NavItem name={'AllToasts'} component={<AllToasts />} />
											<NavItem name={'EditProfile'} component={<EditProfile />} />
											<NavItem name={'ThankYou'} component={<ThankYou content={navContent} />} />
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