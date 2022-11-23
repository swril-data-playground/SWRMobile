import { DisplayWrapper } from "components/DisplayWrapper"
import { AuthContext } from "contexts/authContext"
import { DataContext } from "contexts/dataContext"
import { ToastContext } from "contexts/toastContext"
import { tryCreateHumanAccount, tryCreateOrgAccount } from "data/account"
import { useContext, useState } from "react"
import { AccountType } from "types/account"
import { CreateAccountHuman } from "./screens/CreateAccountHuman"
import { CreateAccountOrg } from "./screens/CreateAccountOrg"
import { GetStarted } from "./screens/GetStarted"
import { LoadingDoggo } from "./screens/LoadingDoggo"
import { Welcome } from "./screens/Welcome"
import { defaultSignUpData, SignUpData } from "./SignUpFlow"

const SignUp = (): JSX.Element => {
	const { setAuth } = useContext(AuthContext)
	const { reloadData } = useContext(DataContext)
	const { pushToast } = useContext(ToastContext)
	const [signUpStep, setSignUpState] = useState<0|1|2|3|4>(0)
	const [state, setState] = useState<SignUpData>(defaultSignUpData)
	const [account, setAccount] = useState<AccountType|null>(null)
	const afterInitialize = () => {
		setAuth({
			auth: account?.walletId || '',
			account
		})
	}

	const createHuman = async () => {
		setSignUpState(3)
		const { status, account } = await tryCreateHumanAccount(state)
		if (status === 200) {
			await reloadData()
			setAccount(account)
			setSignUpState(4)
		} else if (status === 500) {
			setSignUpState(2)
			pushToast({
				type: 'error',
				title: 'Network Error',
				details: 'Something went wrong. Check your network connection.',
			})
		} else {
			setSignUpState(2)
			pushToast({
				type: 'error',
				title: 'Error',
				details: 'Something went wrong. Please try again.',
			})
		}	
	}

	const createOrg = async () => {
		setSignUpState(3)
		const { status } = await tryCreateOrgAccount(state)
		if (status === 200) {
			await reloadData()
			setSignUpState(4)
		} else {
			setSignUpState(2)
			pushToast({
				type: 'error',
				title: 'Error',
				details: 'Something went wrong. Please try again.',
			})
		}
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
				next={createHuman} 
				back={()=>setSignUpState(1)} 
				data={state} 
				setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={signUpStep===2 && state.type ==='Org'}>
			<CreateAccountOrg 
				next={createOrg} 
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