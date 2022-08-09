import { SWRText } from "components/SWRText"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { AnswerType, QuestionType } from "types/questions"

export const MultipleChoiceQuestion = (props: {
	question: QuestionType,
	answer: AnswerType,
	setAnswer: (newAnswer: AnswerType) => void	
}) => {
	return (
		<View>
			{props.question.choices?.map((choice, i) => {
				const selected = props.answer === choice
				const selectedStyle = selected ? {backgroundColor: '#A2E1EE'}:null
				return (
					<TouchableOpacity key={i} 
						style={[styles.choice, selectedStyle]}
						onPress={() => props.setAnswer(choice)}
					>
						<SWRText style={gs.h5}>{String.fromCharCode(i+65)}. {choice}</SWRText>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	choice: {
		width: '100%',
		marginVertical: 5,
		backgroundColor: '#eee',
		padding: 8,
		borderRadius: 8
	}
})