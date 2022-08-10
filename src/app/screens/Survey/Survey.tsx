import { BackButton } from "components/BackButton"
import BackgroundImage from "components/BackgroundImage"
import { Questions } from "components/Questions"
import { generateAnswersArray } from "components/Questions/generateAnswersArray"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { AnswerType } from "types/questions"
import { SurveyType } from "types/surveys"

export const Survey = (props: {content: any}) => {
	const content = props.content as SurveyType
	const [answers, setAnswers] = useState<AnswerType[]>(generateAnswersArray(content.questions))
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<ScrollView >
				<SWRText font={'medium'} style={styles.h1}>{content.title}</SWRText>
				<Questions answers={answers} setAnswers={setAnswers} quesions={content.questions}/>
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