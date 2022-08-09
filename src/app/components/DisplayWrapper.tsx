import { View } from "react-native"

export const DisplayWrapper = (props: {
	display: boolean,
	children: JSX.Element|JSX.Element[],
}) => {
	const display = props.display? 'flex': 'none'
	return (
		<View style={{display}}>
			{props.children}
		</View>
	)
}