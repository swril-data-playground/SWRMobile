import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { gs } from "styles/globals"
import { SWRText } from "./SWRText"
import { SWRTextInput, SWRTextInputProps } from "./SWRTextInput"

interface SWRTextInputWithTitleProps extends SWRTextInputProps {
	style?: StyleProp<ViewStyle>,
}

export const SWRTextInputWithTitle = (props: SWRTextInputWithTitleProps) => {
	return (
		<View style={[styles.container, props.style]}>
			<SWRText style={gs.text}>{props.name}</SWRText>
			<SWRTextInput {...props} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		width: '100%',
	},
})