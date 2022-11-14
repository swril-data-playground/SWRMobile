import { DisplayWrapper } from "components/DisplayWrapper"
import { AuthContext } from "contexts/authContext"
import { tryCreateHumanAccount, tryCreateOrgAccount } from "data/account"
import { useContext, useState } from "react"
import { defaultAvatar } from "types/avatar"
import { CreateAccountHuman } from "./screens/CreateAccountHuman"
import { CreateAccountOrg } from "./screens/CreateAccountOrg"
import { GetStarted } from "./screens/GetStarted"
import { LoadingDoggo } from "./screens/LoadingDoggo"
import { Welcome } from "./screens/Welcome"
import { defaultSignUpData, SignUpData } from "./SignUpFlow"

/*
import { BaseAgent } from "src/agentdec/BaseAgent"
import {
	Agent,
	AutoAcceptCredential,
	ConsoleLogger,
	HttpOutboundTransport,
	LogLevel,
	MediatorPickupStrategy,
	WsOutboundTransport,
  } from '@aries-framework/core'
  import {AgentInit} from 'src/agentdec/agentaction'
  import { useAgent } from '@aries-framework/react-hooks'
  import { agentDependencies } from '@aries-framework/react-native'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import { useNavigation } from '@react-navigation/core'
  import React, { useEffect } from 'react'
  import { useTranslation } from 'react-i18next'
  import { StyleSheet } from 'react-native'
  import { Config } from 'react-native-config'
  import { SafeAreaView } from 'react-native-safe-area-context'
  import Toast from 'react-native-toast-message'
  
  import fabricLedgers from '../../configs/ledgers/fabric'
  import LoadingIndicator from '../components/animated/LoadingIndicator'
  import { ToastType } from '../components/toast/BaseToast'
  import { LocalStorageKeys } from '../constants'
  import { useAuth } from '../contexts/auth'
  import { DispatchAction } from '../contexts/reducers/store'
  import { useStore } from '../contexts/store'
  import { useTheme } from '../contexts/theme'
  import { Screens, Stacks } from '../types/navigators'
  import {
	Onboarding as StoreOnboardingState,
	Privacy as PrivacyState,
	Preferences as PreferencesState,
  } from '../types/state'
*/ 
/*
const SignUp: React.FC = () => {
	const { setAgent } = useAgent()
	const { t } = useTranslation()
	const [store, dispatch] = useStore()
	const navigation = useNavigation()
	const { getWalletCredentials } = useAuth()
*/	
const SignUp = (): JSX.Element => {
	//const { setAgent } = useAgent()
	//const { t } = useTranslation()
	//const [store, dispatch] = useStore()
	//const navigation = useNavigation()
	//const { setPIN , getWalletCredentials } = useAuth()
	//const [pin, setPin] = useState('')
	//const [pinTwo, setPinTwo] = useState('')//Confirm Password used in return section
	//const [walletId , setWalletId] = useState('')
	//const [name , setname] = useState('')//Used as Agent initialization Label

	//Setting Passcode for the wallet.Need Button onClick and TextInput 
	
	/*
	//Need Button onClick and TextInput feature development for implementation
	const confirmEntry = async (x: string, y: string , walletId: string) => {
		const negativePattern = /[^0-9]/g
		if (negativePattern.test(x)) {
		  setModalState({
			visible: true,
			title: t('PinCreate.InvalidPIN'),
			message: t('PinCreate.PleaseUseOnlyNumbersInYourPIN'),
		  })
		} else if (!x.length) {
		  setModalState({
			visible: true,
			title: t('PinCreate.EnterPINTitle'),
			message: t('PinCreate.YouNeedToCreateA6DigitPIN'),
		  })
		} else if (x.length < minPINLength) {
		  setModalState({
			visible: true,
			title: t('PinCreate.PINTooShort'),
			message: t('PinCreate.YourPINMustBe6DigitsInLength'),
		  })
		} else if (negativePattern.test(y)) {
		  setModalState({
			visible: true,
			title: t('PinCreate.InvalidPIN'),
			message: t('PinCreate.PleaseUseOnlyNumbersInYourPIN'),
		  })
		} else if (!y.length) {
		  setModalState({
			visible: true,
			title: t('PinCreate.ReenterPINTitle'),
			message: t('PinCreate.PleaseReenterYourPIN'),
		  })
		} else if (y.length < minPINLength) {
		  setModalState({
			visible: true,
			title: t('PinCreate.PINTooShort'),
			message: t('PinCreate.YourPINMustBe6DigitsInLength'),
		  })
		} else if (x !== y) {
		  setModalState({
			visible: true,
			title: t('PinCreate.PINsDoNotMatch'),
			message: t('PinCreate.EnteredPINsDoNotMatch'),
		  })
		} else {
		  await passcodeCreate(x,walletId)
		}
	}
	*/
//Identity Creation on Fabric using adminParty API


//Agent Initialization(Applied on CreateAccountHuman
/*
	const agentInitialization = async() =>{

		 const agent = AgentInit.build(walletId , name , pin);
		 setAgent(agent);

	}
*/
	const { setAuth } = useContext(AuthContext)
	const [signUpStep, setSignUpState] = useState<0|1|2|3|4>(0)
	const [state, setState] = useState<SignUpData>(defaultSignUpData)
	const afterInitialize = () => {
		setAuth({
			auth: 'abc',
			account: {
				...state,
				walletId: '4252-427e-af7d-3dcaaf2db2df',
				keyPhrase: 'One two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen',
				avatar: defaultAvatar,
				householdMembers: [],
				creations: {
					surveys: [],
					programs: [],
				}
			}
		})
	}
	return (
		<>
			<DisplayWrapper display={signUpStep === 0}>
			<Welcome
				next={()=>setSignUpState(1)} 
			/></DisplayWrapper>
			<DisplayWrapper display={signUpStep === 1}>
			<GetStarted 
				next={()=>setSignUpState(2)} 
				back={()=>setSignUpState(0)} 
				data={state} 
				setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={signUpStep===2 && state.type ==='Human'}>
			<CreateAccountHuman 
				next={
					async ()=>{
						setSignUpState(3);
						await tryCreateHumanAccount(state);
						setSignUpState(4);
					}
				} 
				back={()=>setSignUpState(1)} 
				data={state} 
				setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={signUpStep===2 && state.type ==='Org'}>
			<CreateAccountOrg 
				next={async ()=>{
					setSignUpState(3);
					await tryCreateOrgAccount(state);
					setSignUpState(4);
				}} 
				back={()=>setSignUpState(1)} 
				data={state} 
				setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={signUpStep===3 || signUpStep===4}>
			<LoadingDoggo next={afterInitialize} loaded={signUpStep===4}/></DisplayWrapper>
		</>
	)
}

export default SignUp