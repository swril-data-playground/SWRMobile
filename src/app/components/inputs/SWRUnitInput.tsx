
import { SWRText } from "components/SWRText"
import { ToastContext } from "contexts/toastContext"
import { useContext } from "react"
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"
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
		<View style={styles.container}>
			<TextInput 
				keyboardType={"numeric"} 
				value={props.value} 
				style={[styles.textInput, props.inputStyle]} 
				placeholder={"0"} 
				onChangeText={props.onChange}
			/>
			<SWRText style={styles.unitText}>{props.units[0]}</SWRText>
		</View>
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
		borderColor: 'lightgrey',
		borderRadius: 15,
		borderWidth: 1,
		width: 120,
		overflow: 'hidden',
		marginVertical: 4,
	},
	textInput: {
		height: 50,
		paddingHorizontal: 20,
		fontSize: 18,
		textAlign: 'left',
		borderRightColor: 'lightgrey',
		borderRightWidth: 1,
	},
	unitText: {
		paddingHorizontal: 10,
		fontSize: 20,
		textAlign: 'left',
		width: '100%'
	}
})