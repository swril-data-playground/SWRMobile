import { BackButton } from "components/BackButton"
import { Questions } from "components/Questions"
import { generateAnswersArray } from "components/Questions/generateAnswersArray"
import { SWRText } from "components/SWRText"
import { DisplayContext } from "contexts/displayContext"
import { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { AnswerType } from "types/questions"
import { SurveyType } from "types/surveys"

export const Survey = (props: {content: any}) => {
	const content = props.content as SurveyType
	const [answers, setAnswers] = useState<AnswerType[]>(generateAnswersArray(content.questions))
	const { display } = useContext(DisplayContext)
	const keyboardPadding = {marginBottom: display.keyboardHeight}
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<ScrollView style={keyboardPadding}>
				<SWRText font={'medium'} style={styles.h1}>{content.title}</SWRText>
				<Questions answers={answers} setAnswers={setAnswers} questions={content.questions} />
			</ScrollView>
		</View>
	)
}	

const styles = StyleSheet.create({
	h1: {
		fontSize: 25,
		marginTop: 10,
		marginHorizontal: 20
	}
})