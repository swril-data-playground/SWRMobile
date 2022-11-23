import { SWRDateInput } from "components/inputs/SWRDateInput";
import { SWRMCInput } from "components/inputs/SWRMCInput";
import { SWRSelectInput } from "components/inputs/SWRSelectInput";
import { SWRSmallIntInput } from "components/inputs/SWRSmallIntInput";
import { SWRTextInput } from "components/inputs/SWRTextInput";
import { SWRUnitInput } from "components/inputs/SWRUnitInput";
import { SWRText } from "components/SWRText";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { gs } from "styles/globals";
import { AnswerType, QuestionType, typeOfQuestion } from "types/questions";

export const Questions = (props: {
	questions: QuestionType[],
	answers: AnswerType[],
	setAnswers: (newAnswers: AnswerType[]) => void,
	questionType?: typeOfQuestion, 
	style?: StyleProp<ViewStyle>
}) => {
	return (
		<View style={props.style}>
			{props.questions.map((question, i) => {
				const answer = props.answers[i];
				const type = props.questionType ?? question.type
				const setAnswer = (newAnswer: AnswerType) => {
					const newAnswers = [...props.answers]
					newAnswers[i] = newAnswer
					props.setAnswers(newAnswers)
				}
				let input;
				switch (type) {
					case 'Multiple choice': input = <SWRMCInput
						value={answer}
						choices={question.choices ?? []}
						onChange={setAnswer}
					/>; break;
					case 'Select': input = <SWRSelectInput
						value={answer}
						choices={question.choices ?? []}
						onChange={setAnswer}
					/>; break;
					case 'Open-ended': input = <SWRTextInput
						name={'Enter your answer'}
						value={answer}
						onChange={setAnswer}
					/>; break;
					case 'Date': input = <SWRDateInput
						value={answer}
						onChange={setAnswer}
					/>; break;
					case 'SmallInt': input = <SWRSmallIntInput
						value={answer}
						onChange={setAnswer}
					/>; break;
					case 'Unit': 
					    if (!question.choices || question.choices.length < 1) {
							console.error("Unit question must unit choices")
					        return null
					    }
						input = <SWRUnitInput
							value={answer}
							onChange={setAnswer}
							units={question.choices}
						/>; break;
				}
				return (
					<View style={styles.question} key={i}>
						<SWRText style={gs.h5}>{i+1}. {question.prompt}</SWRText>
						{input}
					</View>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	question: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: 'white',
		marginVertical: 10,
	},
})	
