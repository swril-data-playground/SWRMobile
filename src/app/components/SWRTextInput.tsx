import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"

export interface SWRTextInputProps {
	name: string,
	value: string,
	onChange: (newText: string) => void,
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" |"url"
}

export const SWRTextInput = (props: SWRTextInputProps) => {
	return (
		<TextInput 
			keyboardType={props.keyboardType} 
			value={props.value} 
			style={styles.textInput} 
			placeholder={props.name} 
			onChangeText={props.onChange}
		/>
	)
}

const styles = StyleSheet.create({
	textInput: {
		height: 50,
		padding: 10,
		marginVertical: 4,
		borderRadius: 15,
		fontSize: 18,
		textAlign: 'left',
		width: '100%',
		backgroundColor: 'white'
	},
})