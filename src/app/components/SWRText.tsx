import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

export type SWRTextChild = string | undefined | JSX.Element | number

export const SWRText = (props: {
	style?: StyleProp<TextStyle>, 
	children: SWRTextChild | SWRTextChild[],
	font?: 'main' | 'bold' | 'medium'
}) => {
	const font = props.font ?? 'main'
	return (
		<Text style={[{
			fontFamily: font,
			color: 'black',
			alignItems: 'center',
			justifyContent: 'center'
		}, props.style]}>
			{props.children}
		</Text>
	)
}

