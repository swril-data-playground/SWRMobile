import { DisplayWrapper } from "components/DisplayWrapper"
import { AuthContext } from "contexts/authContext"
import { useContext, useState } from "react"
import { defaultAvatar } from "types/avatar"
import { CreateAccountHuman } from "./screens/CreateAccountHuman"
import { CreateAccountOrg } from "./screens/CreateAccountOrg"
import { GetStarted } from "./screens/GetStarted"
import { LoadingDoggo } from "./screens/LoadingDoggo"
import { Welcome } from "./screens/Welcome"
import { defaultSignUpData, SignUpData } from "./SignUpFlow"

const SignUp = (): JSX.Element => {
	const { setAuth } = useContext(AuthContext)
	const [signUpStep, setSignUpState] = useState<0|1|2|3>(0)
	const [state, setState] = useState<SignUpData>(defaultSignUpData)
	const trySignUp = () => {
		setAuth({
			auth: 'abc',
			account: {
				...state,
				walletId: '4252-427e-af7d-3dcaaf2db2df',
				keyPhrase: 'One two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen',
				avatar: defaultAvatar,
				householdMembers: []
			}
		})
		setSignUpState(3)
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
				next={trySignUp} 
				back={()=>setSignUpState(1)} 
				data={state} 
				setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={signUpStep===2 && state.type ==='Org'}>
			<CreateAccountOrg 
				next={()=>trySignUp()} 
				back={()=>setSignUpState(1)} 
				data={state} 
				setData={setState}
			/></DisplayWrapper>
			<DisplayWrapper display={signUpStep===3}>
			<LoadingDoggo /></DisplayWrapper>
		</>
	)
}

export default SignUp