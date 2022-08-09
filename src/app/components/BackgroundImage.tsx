import { useState } from "react"
import { StyleSheet, Animated, StyleProp, ImageStyle } from "react-native"
import { images } from "assets/images"

const BackgroundImage = (props: {image?: any, style?: StyleProp<ImageStyle>, fill?: boolean}) => {
	const [opacity, _] = useState(new Animated.Value(0))
	const onLoad = () => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start()
	}
	const image = props.image ?? images.gradient
	return (
		<Animated.Image
			source={image}
			style={[
				styles.image,
				{
					opacity: (opacity as any)
				},
				props.style
			]}
			onLoad={onLoad}
		/>
	)
}

const styles = StyleSheet.create({
	image: {
		position: "absolute",
		resizeMode: 'cover',
		width: '100%',
		height: '100%',
	}
})

export default BackgroundImage