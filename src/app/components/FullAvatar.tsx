import { images } from "assets/images"
import { Image, View, StyleSheet, StyleProp, ViewStyle } from "react-native"
import { gs } from "styles/globals"
import { AvatarType } from "types/avatar"

export const FullAvatar = (props: {
	avatar: AvatarType | undefined,
	style?: StyleProp<ViewStyle>,
	height?: number
}) => {
	return (
		<View style={[styles.container, {
			height: props.height ?? 100,
			width: props.height ? props.height/2 : 50,
		}, props.style]}>
			<Image 
				source={images.default_avatar}
				style={gs.fillImage}
			/>
		</View>
	)	
}


const styles = StyleSheet.create({
	container: {
		borderRadius: 25,
		padding: 5,
		overflow: 'hidden'
	}
})