import { SWRText } from "components/SWRText"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { AnswerType, QuestionType } from "types/questions"

export const SWRMCInput = (props: {
	choices: string[],
	value: string|undefined,
	onChange: (newValue: string) => void,
}) => {
	return (
		<View>
			{props.choices?.map((choice, i) => {
				const selected = props.value === choice
				const selectedStyle = selected ? {backgroundColor: '#A2E1EE'}:null
				return (
					<TouchableOpacity key={i} 
						style={[styles.choice, selectedStyle]}
						onPress={() => props.onChange(choice)}
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