import { SWRText } from "components/SWRText"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { gs } from "styles/globals"

export const SWRInputLabel = (props: {
	children: JSX.Element,
	style: StyleProp<ViewStyle>,
	name: string
}) => {
	return (
		<View style={[styles.withTitleContainer, props.style]}>
			<SWRText style={gs.h4}>{props.name}</SWRText>
			{props.children}
		</View>
	)
}

const styles = StyleSheet.create({
	withTitleContainer: {
		alignItems: 'flex-start',
		width: '100%',
	},
})