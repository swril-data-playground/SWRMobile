
import { SWRText } from "components/SWRText"
import { ToastContext } from "contexts/toastContext"
import { useContext } from "react"
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"
import { SWRInputLabel } from "./SWRInputLabel"

export interface SWRUnitInputProps {
	name?: string,
	value: string,
	units: string[],
	onChange: (newText: string) => void,
	withTitle?: boolean
	containerStyle?: StyleProp<ViewStyle>,
	inputStyle?: StyleProp<ViewStyle>,
}

export const SWRUnitInput = (props: SWRUnitInputProps) => {
	const { pushToast } = useContext(ToastContext)
	if (props.units.length === 0) {
		pushToast({title: 'Data Error', details: 'No units provided', type: 'error'})
		return null
	}
	const content = (
		<>
			<TextInput 
				keyboardType={"numeric"} 
				value={props.value} 
				style={[styles.textInput, props.inputStyle]} 
				placeholder={"0"} 
				onChangeText={props.onChange}
			/>
			<SWRText>{props.units[0]}</SWRText>
		</>
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