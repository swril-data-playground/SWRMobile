import { images } from "assets/images"
import { Image, View, StyleSheet, StyleProp, ViewStyle } from "react-native"
import { gs } from "styles/globals"
import { AvatarType } from "types/avatar"

export const AvatarIcon = (props: {
	avatar: AvatarType | undefined,
	style?: StyleProp<ViewStyle>,
	size?: number
}) => {
	return (
		<View style={[styles.container, {
			height: props.size ?? 50,
			width: props.size ?? 50,
		}, props.style]}>
			<Image 
				source={images['profile']}
				style={gs.fillImage}
			/>
		</View>
	)	
}


const styles = StyleSheet.create({
	container: {
		borderRadius: 25,
		backgroundColor: 'lightgrey',
		padding: 5,
		overflow: 'hidden'
	}
})