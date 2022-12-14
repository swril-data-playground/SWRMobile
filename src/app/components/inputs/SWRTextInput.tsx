import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"
import { SWRInputLabel } from "./SWRInputLabel"

export interface SWRTextInputProps {
	name: string,
	value: string,
	onChange: (newText: string) => void,
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" |"url"
	lines?: number
	withTitle?: boolean
	containerStyle?: StyleProp<ViewStyle>,
	inputStyle?: StyleProp<ViewStyle>,
	password?: boolean
}

export const SWRTextInput = (props: SWRTextInputProps) => {
	const lines = props.lines ?? 1
	const multiline = lines > 1
	const additionalStyles = {
		height: 30 + lines*20,
		paddingTop: multiline ? 10 : undefined
	}
	const content = (
		<TextInput 
			keyboardType={props.keyboardType} 
			value={props.value} 
			style={[styles.textInput, additionalStyles, props.inputStyle]} 
			placeholder={props.name} 
			onChangeText={props.onChange}
			textContentType={props.password?'password':undefined}
			secureTextEntry={props.password}
			multiline={multiline}
		/>
	)
	if (!props.withTitle) return content
	return (
		<SWRInputLabel style={props.containerStyle} name={props.name??''}>
			{content}
		</SWRInputLabel>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		width: '100%',
	},
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