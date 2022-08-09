import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavContainer, NavItem, Tabs } from 'src/app/navigation'
import { tabName, tabNames } from 'src/app/navigation/tabs'
import { AuthContext, AuthContextType, defaultAuthValue } from 'contexts/authContext'
import { defaultNavValue, NavContext, NavContextType } from 'contexts/navContext'
import { defaultErrorValue, ErrorContext, ErrorContextType } from 'contexts/errorContext'
import { DataContextType, defaultDataValue, DataContext } from 'contexts/dataContext'
import { LoadingScreen } from 'screens/LoadingScreen'
import { ErrorScreen } from 'screens/ErrorScreen'
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
import { Program } from 'screens/Program'
import { Privacy } from 'screens/Privacy'
import { Help } from 'screens/Help'
import { LearnMore } from 'screens/LearnMore'
import { Login } from 'screens/Login/Login'
import { tryGetSurveys } from 'data/surveys'
import { Survey } from 'screens/Survey/Survey'

const SmartWaterlooMobile = () => {
	const [screenState, setScreenState] = useState<'LOADING' | 'ERROR' | 'LOADED'>('LOADING')
	const [auth, setAuth] = useState<AuthContextType>(defaultAuthValue)
	const [nav, setNav] = useState<NavContextType>(defaultNavValue)
	const [error, setError] = useState<ErrorContextType>(defaultErrorValue)
	const [data, setData] = useState<DataContextType>(defaultDataValue)
	const [navContent, setNavContent] = useState<any>(null)
	const dataValue = { data, setData }
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
		}
	}
	const authValue = { 
		auth, 
		setAuth: (newAuth: AuthContextType) => {
			if (newAuth.account) navValue.setNav('Home')
			else navValue.setNav('SignUp')
			setAuth(newAuth)
		},
	 }
	const errorValue = {
		error,
		setError: (newError: ErrorContextType) => {
			console.error(newError)
			setScreenState('ERROR')
			setError(newError)
		},
	}
	const initialLoad = async () => {
		await Font.loadAsync(fonts);
		const { status: authStatus, auth: gotAuth } = await tryGetAuth()
		if (authStatus === 200) {
			setAuth(gotAuth)
		} else if (authStatus === 400) {
			errorValue.setError(new Error('User authorization failed'))
			return
		} else if (authStatus === 404) {
			navValue.setNav('SignUp')
		}
		const { status: programStatus, programs } = await tryGetPrograms()
		const { status: surveyStatus, surveys } = await tryGetSurveys()
		if (programStatus === 200 && surveyStatus === 200) {
			setData({programs, surveys})
			setScreenState('LOADED')
		} else {
			if (programStatus !== 200 && surveyStatus !== 200) {
				errorValue.setError(new Error('Programs and surveys failed to load'))
			} else if (programStatus !== 200) {
				errorValue.setError(new Error('Programs failed to load'))
			} else if (surveyStatus !== 200) {
				errorValue.setError(new Error('Surveys failed to load'))
			}
		}
	}
	if (screenState === 'LOADING') initialLoad()
	const mainTab = listIncludes(tabNames, nav.nav)
	return (
		<AuthContext.Provider value={authValue}>
			<DataContext.Provider value={dataValue}>
				<NavContext.Provider value={navValue}>
					<ErrorContext.Provider value={errorValue}>
						<View style={styles.parentContainer}>
							<BackgroundImage />
							{screenState === 'LOADING' && <LoadingScreen />}
							{screenState === 'ERROR' && <ErrorScreen />}
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
										<NavItem name={'Settings'} component={<Settings />} />
										<NavItem name={'Profile'} component={<Profile />} />
										<NavItem name={'Create'} component={<Create />} />
										<NavItem name={'Data'} component={<MyData />} />
										<NavItem name={'Privacy'} component={<Privacy />} />
										<NavItem name={'Help'} component={<Help />} />
										<NavItem name={'LearnMore'} component={<LearnMore />} />
									</NavContainer>
									{mainTab && <Tabs tab={nav.nav as tabName} />}
								</>
							)}
						</View>
					</ErrorContext.Provider>
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