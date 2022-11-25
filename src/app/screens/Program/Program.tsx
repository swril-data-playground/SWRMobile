import { AuthContext } from "contexts/authContext"
import { ToastContext } from "contexts/toastContext"
import { trySignUpForProgram } from "data/programs"
import { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import { ProgramType } from "types/programs"
import { ProgramQuestions } from "./views/ProgramQuestions"
import { ProgramView } from "./views/ProgramView"
import { ThankYou } from "../ThankYou"
import { gs } from "styles/globals"
import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"

export const Program = (props: {content: any}) => {
	const program = props.content as ProgramType
	const { auth } = useContext(AuthContext)
	const { pushToast } = useContext(ToastContext)
	const [programSignUpState, setProgramSignUpState] = useState<'Info'|'Questions'|'Done'>('Info')
	const { setNav } = useContext(NavContext)


	const trySignUp = async () => {
		if (!auth.account) {
			pushToast({
				title: 'Error signing up for program',
				type: 'error'
			})
			return
		}
		const { status } = await trySignUpForProgram(program, auth.account)
		if (status === 200) {
			setNav('ThankYou', <>
				<SWRText font={'medium'} style={gs.h3}>For signing up to</SWRText>
				<SWRText font={'medium'} style={[gs.h3, {color: '#234F68', textAlign:'center'} ]}>{program.title}</SWRText>
			</>)
		} else {
			pushToast({
				title: 'Error signing up for program',
				type: 'error'
			})
		}
	}
	const infoSignUp = program.questions.length === 0 ? trySignUp : () => setProgramSignUpState('Questions')
	return (
		<View style={styles.container}>
			{programSignUpState==='Info' && <ProgramView program={program} signUp={infoSignUp} />}
			{programSignUpState==='Questions' && <ProgramQuestions program={program} next={trySignUp} back={() => setProgramSignUpState('Info')} />}
		</View>
	)
}	

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		// backgroundColor: 'white',
		borderRadius: 20,
		height: '97%',
	},
})