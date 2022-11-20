import { DisplayWrapper } from "components/DisplayWrapper"
import { AuthContext } from "contexts/authContext"
import { DataContext } from "contexts/dataContext"
import { ToastContext } from "contexts/toastContext"
import { useContext, useState } from "react"
import { AccountType } from "types/account"
import { defaultLoginData, LoginData } from "./LoginFlow"
import { PasswordLogin } from "./PasswordLogin"
import { WalletLogin } from "./WalletLogin"
import { ContactUs } from "./ContactUs"
import { ContactData, defaultContactData } from "./ContactData"
import { ThankYou } from "./ThankYou"
import { tryLoginHumanAccount, tryLoginOrgAccount } from "data/account"

export const Login = () => {
	const { setAuth } = useContext(AuthContext)
	const { reloadData } = useContext(DataContext)
	const { pushToast } = useContext(ToastContext)
	const [loginStep, setLoginState] = useState<0|1|2|3|4>(0)
	const [state, setState] = useState<LoginData>(defaultLoginData)
	const [account, setAccount] = useState<AccountType|null>(null)
	const [contactData, setContactData] = useState<ContactData>(defaultContactData)
	const afterInitialize = () => {
		setAuth({
			auth: account?.walletId || '',
			account
		})
	}

	const login = async () => {
		setLoginState(4)
		const { status, account } = await tryLoginHumanAccount(state)
		if (status === 200) {
			await reloadData()
			setAccount(account)
			setLoginState(4)
		} else if (status === 500) {
			setLoginState(2)
			pushToast({
				type: 'error',
				title: 'Network Error',
				details: 'Something went wrong. Check your network connection.',
			})
		} else {
			setLoginState(2)
			pushToast({
				type: 'error',
				title: 'Error',
				details: 'Something went wrong. Please try again.',
			})
		}	
	}

	const createOrg = async () => {
		setLoginState(3)
		const { status } = await tryLoginOrgAccount(state)
		if (status === 200) {
			await reloadData()
			setLoginState(4)
		} else {
			setLoginState(2)
			pushToast({
				type: 'error',
				title: 'Error',
				details: 'Something went wrong. Please try again.',
			})
		}
	}

	return (
		<>
			<DisplayWrapper display={loginStep === 0}>
			<PasswordLogin
				login={login} 
				switchLoginMethod= {() => setLoginState(1)}
				contactSupport={() => setLoginState(2)}
				data={state}
				setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={loginStep === 1}>
			<WalletLogin 
				login={login} 
				switchLoginMethod={()=>setLoginState(0)} 
				contactSupport={() => setLoginState(2)}
				data={state} 
				setData={setState}
				back={() => setLoginState(0)}
			/></DisplayWrapper>
			<DisplayWrapper display={loginStep===2}>
			<ContactUs 
				sendMessage={()=> setLoginState(3)}
				data={contactData}
				setData={setContactData}
				back={() => setLoginState(0)}
			/></DisplayWrapper>
			<DisplayWrapper display={loginStep===3}>
			<ThankYou 
				back={()=>setLoginState(0)} 
				done={()=>setLoginState(0)}
			/></DisplayWrapper>
			<DisplayWrapper display={loginStep===3 || loginStep===4}>
			</DisplayWrapper>
		</>
	)
}

