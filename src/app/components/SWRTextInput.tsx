import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"
import { gs } from "styles/globals"
import { SWRText } from "./SWRText"

export interface SWRTextInputProps {
	name: string,
	value: string,
	onChange: (newText: string) => void,
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" |"url"
	lines?: number
	withTitle?: boolean
	style?: StyleProp<ViewStyle>,
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
			style={[styles.textInput, additionalStyles]} 
			placeholder={props.name} 
			onChangeText={props.onChange}
			multiline={multiline}
		/>
	)
	if (!props.withTitle) return content
	return (
		<View style={[styles.container, props.style]}>
			<SWRText style={gs.h4}>{props.name}</SWRText>
			{content}
		</View>
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