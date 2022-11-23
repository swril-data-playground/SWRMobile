import { DisplayWrapper } from "components/DisplayWrapper"
import { useState } from "react"
import { PasswordLogin } from "./screens/PasswordLogin"
import { SeedLogin } from "./screens/SeedLogin"
import { ContactUs } from "./screens/ContactUs"
import { ContactData, defaultContactData } from "./screens/ContactData"
import { ThankYou } from "./screens/ThankYou"

export const Login = () => {
	const [loginStep, setLoginState] = useState<0|1|2|3>(0)
	// const [state, setState] = useState<LoginData>(defaultLoginData)
	const [contactData, setContactData] = useState<ContactData>(defaultContactData)

	return (
		<>
			<DisplayWrapper display={loginStep === 0}>
			<PasswordLogin
				switchLoginMethod= {() => setLoginState(1)}
				contactSupport={() => setLoginState(2)}
				// data={state}
				// setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={loginStep === 1}>
			<SeedLogin 
				switchLoginMethod={()=>setLoginState(0)} 
				contactSupport={() => setLoginState(2)}
				// data={state} 
				// setData={setState}
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
		</>
	)
}

