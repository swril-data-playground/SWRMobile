import { BackButton } from "components/BackButton"
import { Questions } from "components/Questions"
import { generateAnswersArray } from "components/Questions/generateAnswersArray"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { AuthContext } from "contexts/authContext"
import { DisplayContext } from "contexts/displayContext"
import { NavContext } from "contexts/navContext"
import { ToastContext } from "contexts/toastContext"
import { trySubmitPoll } from "data/polls"
import { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { PollType } from "types/polls"
import { AnswerType } from "types/questions"

export const Poll = (props: {content: any}) => {
	const poll = props.content as PollType
	const { auth } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	const { pushToast } = useContext(ToastContext)
	const [answers, setAnswers] = useState<AnswerType[]>(generateAnswersArray(poll.questions))
	const submitEnabled = answers.every((answer, i) => answer != '' || poll.questions[i].optional)

	const handleTrySubmitPoll = async () => {
		if (!auth.account) return
		const { status } = await trySubmitPoll(poll, answers, auth.account)
		if (status === 200) {
			setNav('ThankYou', <>
				<SWRText font={'medium'} style={gs.h3}>For answering</SWRText>
				<SWRText font={'medium'} style={[gs.h3, {color: '#234F68', textAlign:'center'} ]}>{poll.title}</SWRText>
			</>)
		} else {
			pushToast({title: 'Failed to create survey', type: 'error'})
		}
	}

	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<ScrollView>
				<SWRText font={'medium'} style={styles.h1}>{poll.title}</SWRText>
				<Questions answers={answers} setAnswers={setAnswers} questions={poll.questions} questionType="MC"/>
				<SWRButton disabled={!submitEnabled} onPress={handleTrySubmitPoll} style={styles.submit}>
					<SWRText style={gs.h4}>Submit</SWRText>
				</SWRButton>
			</ScrollView>
		</View>
	)
}	

const styles = StyleSheet.create({
	h1: {
		fontSize: 25,
		marginTop: 10,
		marginHorizontal: 20
	},
	submit: {
		marginTop: 20,
		marginBottom: 50,
		marginHorizontal: 10,
	},
})