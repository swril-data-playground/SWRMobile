import { BackButton } from "components/BackButton"
import { Questions } from "components/Questions"
import { generateAnswersArray } from "components/Questions/generateAnswersArray"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { ToastContext } from "contexts/toastContext"
import { trySubmitSurvey } from "data/surveys"
import { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { AnswerType } from "types/questions"
import { SurveyType } from "types/surveys"

export const Survey = (props: {content: any}) => {
	const survey = props.content as SurveyType
	const { auth } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	const { pushToast } = useContext(ToastContext)
	const [answers, setAnswers] = useState<AnswerType[]>(generateAnswersArray(survey.questions))
	const submitEnabled = answers.every((answer, i) => answer != '' || survey.questions[i].optional)

	const handleTrySubmitSurvey = async () => {
		if (!auth.account) return
		const { status } = await trySubmitSurvey(survey, answers, auth.account)
		if (status === 200) {
			setNav('ThankYou', <>
				<SWRText font={'medium'} style={gs.h3}>For answering</SWRText>
				<SWRText font={'medium'} style={[gs.h3, {color: '#234F68', textAlign:'center'} ]}>{survey.title}</SWRText>
			</>)
		} else {
			pushToast({title: 'Failed to create survey', type: 'error'})
		}
	}

	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<ScrollView >
				<SWRText font={'medium'} style={styles.h1}>{survey.title}</SWRText>
				<Questions answers={answers} setAnswers={setAnswers} questions={survey.questions} />
				<SWRButton onPress={handleTrySubmitSurvey} disabled={!submitEnabled} style={styles.submit}>
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
		marginHorizontal: 30,
	},
})