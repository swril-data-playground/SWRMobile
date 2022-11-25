import { BackButton } from "components/BackButton"
import { Questions } from "components/Questions"
import { generateAnswersArray } from "components/Questions/generateAnswersArray"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"
import { AnswerType } from "types/questions"

export const ProgramQuestions = (props: {
	program: ProgramType
	next: () => Promise<void>
	back: () => void
	answers: AnswerType[]
	setAnswers: (answers: AnswerType[]) => void
}) => {
	const program = props.program as ProgramType
	const submitEnabled = props.answers.every((answer, i) => answer != '' || program.questions[i].optional)

	return (
		<View style={gs.scrollParent}>
			<BackButton style={{margin: 10}} onPressOverride={props.back} />
			<ScrollView >
				<SWRText style={[gs.h3, {textAlign: 'center'}]}>Questions</SWRText>
				<Questions answers={props.answers} setAnswers={props.setAnswers} questions={program.questions} />
				<SWRButton disabled={!submitEnabled} singleUse onPress={props.next} style={styles.continue}>
					<SWRText style={[gs.h3, {textAlign: 'center'}]}>Continue</SWRText>
				</SWRButton>
			</ScrollView>
		</View>
	)
}	

const styles = StyleSheet.create({
	continue: {
		marginTop: 20,
		marginBottom: 50,
		marginHorizontal: 30,
		width: '70%'
	},
})