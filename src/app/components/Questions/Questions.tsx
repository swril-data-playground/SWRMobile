import { SWRDateInput } from "components/inputs/SWRDateInput";
import { SWRMCInput } from "components/inputs/SWRMCInput";
import { SWRSelectInput } from "components/inputs/SWRSelectInput";
import { SWRTextInput } from "components/inputs/SWRTextInput";
import { SWRText } from "components/SWRText";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { gs } from "styles/globals";
import { AnswerType, QuestionType } from "types/questions";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

export const Questions = (props: {
	quesions: QuestionType[],
	answers: AnswerType[],
	setAnswers: (newAnswers: AnswerType[]) => void,
	style?: StyleProp<ViewStyle>
}) => {
	return (
		<View style={props.style}>
			{props.quesions.map((question, i) => {
				const answer = props.answers[i];
				const setAnswer = (newAnswer: AnswerType) => {
					const newAnswers = [...props.answers]
					newAnswers[i] = newAnswer
					props.setAnswers(newAnswers)
				}
				let input;
				switch (question.type) {
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
