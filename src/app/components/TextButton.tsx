import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native"
import { SWRText, SWRTextChild } from "./SWRText"

export const TextButton = (props: {
	onPress: () => void, 
	style?: StyleProp<TextStyle>, 
	containerStyle?: StyleProp<ViewStyle>, 
	children: SWRTextChild|SWRTextChild[]
}) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={[style.container, props.containerStyle]}>
			<SWRText style={props.style}>{props.children}</SWRText>
		</TouchableOpacity>
	)
}

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	}
})