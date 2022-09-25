import { images } from "assets/images"
import { Image, StyleProp, View, ViewStyle } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"

export const CheckBox = (props: {
	size: number,
	checked: boolean,
	color?: string,
	style?: StyleProp<ViewStyle>
}) => {
	const style = {
		height: props.size,
		width: props.size,
		borderRadius: props.size / 10,
		borderColor: colors.mediumGrey,
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: props.checked ?  props.color ?? 'black' : 'white'
	} as const
	return (
		<View style={[style, props.style]}>
			<Image source={images.check} style={{
				width: '70%',
				height: '70%',
				display: props.checked? 'flex' : 'none'
			}}/>
		</View>
	)
}