
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"
import { SWRInputLabel } from "./SWRInputLabel"

export interface SWRSmallIntInputProps {
	name?: string,
	value: string,
	onChange: (newText: string) => void,
	withTitle?: boolean
	containerStyle?: StyleProp<ViewStyle>,
	inputStyle?: StyleProp<ViewStyle>,
}

export const SWRSmallIntInput = (props: SWRSmallIntInputProps) => {
	const content = (
		<TextInput 
			keyboardType={"number-pad"}
			value={props.value} 
			style={[styles.textInput, props.inputStyle]} 
			placeholder={"0"} 
			onChangeText={props.onChange}
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