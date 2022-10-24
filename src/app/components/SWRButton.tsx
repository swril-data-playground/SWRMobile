import { useState } from "react"
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, View } from "react-native"

export const SWRButton = (props: {
	onPress: () => Promise<void>|void, 
	style?: StyleProp<ViewStyle>, 
	children: JSX.Element|JSX.Element[],
	disabled?: boolean,
	singleUse?: boolean
}) => {
	const [running, setRunning] = useState(false)
	const onPressFunction = async () => {
		setRunning(true)
		await props.onPress()
		if (!props.singleUse) setRunning(false)
	}
	const disabled = props.disabled || running
	if (disabled) {
		return (	
			<View style={[style.container, {backgroundColor: 'grey'}, props.style]}>
				{props.children}
			</View>
		)
	}
	return (
		<TouchableOpacity 
			onPress={!running && !props.disabled ? onPressFunction: () => {}} 
			style={[style.container, props.style]}>
			{props.children}
		</TouchableOpacity>
	)
}

const style = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	}
})