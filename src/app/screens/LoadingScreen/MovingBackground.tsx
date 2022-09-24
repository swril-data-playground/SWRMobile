import { images } from "assets/images"
import BackgroundImage from "components/BackgroundImage"
import { useState } from "react"
import { Animated, StyleSheet, View } from "react-native"

export const MovingBackground = () => {
	const [opacity1] = useState(new Animated.Value(1))
	const [opacity2] = useState(new Animated.Value(0))
	const [opacity3] = useState(new Animated.Value(0))
	const [opacity4] = useState(new Animated.Value(0))
	const fadeDur = 1500
	const onLoad = () => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity1, {
					toValue: 0,
					duration: fadeDur,
					useNativeDriver: true
				}),
				Animated.timing(opacity1, {
					toValue: 0,
					duration: fadeDur*2,
					useNativeDriver: true
				}),
				Animated.timing(opacity1, {
					toValue: 1,
					duration: fadeDur,
					useNativeDriver: true
				}),
			])
		).start()
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity2, {
					toValue: 1,
					duration: fadeDur,
					useNativeDriver: true,
				}),
				Animated.timing(opacity2, {
					toValue: 0,
					duration: fadeDur,
					useNativeDriver: true,
				}),
				Animated.timing(opacity2, {
					toValue: 0,
					duration: fadeDur*2,
					useNativeDriver: true,
				}),
			])
		).start()
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity3, {
					toValue: 0,
					duration: fadeDur,
					useNativeDriver: true,
				}),
				Animated.timing(opacity3, {
					toValue:1,
					duration: fadeDur,
					useNativeDriver: true,
				}),
				Animated.timing(opacity3, {
					toValue:0,
					duration: fadeDur,
					useNativeDriver: true,
				}),
				Animated.timing(opacity3, {
					toValue: 0,
					duration: fadeDur,
					useNativeDriver: true,
				}),
			])
		).start()
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity4, {
					toValue: 0,
					duration: fadeDur*2,
					useNativeDriver: true,
				}),
				Animated.timing(opacity4, {
					toValue: 1,
					duration: fadeDur,
					useNativeDriver: true,
				}),
				Animated.timing(opacity4, {
					toValue: 0,
					duration: fadeDur,
					useNativeDriver: true,
				}),
			])
		).start()
	}
	return (
		<View style={styles.background}>
			<Animated.Image
				source={images.blur1}
				style={[
					styles.image,
					{
						opacity: (opacity1 as any)
					}
				]}
				onLoad={onLoad}
			/>
			<Animated.Image
				source={images.blur2}
				style={[
					styles.image,
					{
						opacity: (opacity2 as any)
					}
				]}
				onLoad={onLoad}
			/>
			<Animated.Image
				source={images.blur3}
				style={[
					styles.image,
					{
						opacity: (opacity3 as any)
					}
				]}
				onLoad={onLoad}
			/>
			<Animated.Image
				source={images.blur4}
				style={[
					styles.image,
					{
						opacity: (opacity4 as any)
					}
				]}
				onLoad={onLoad}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	background: {
		position: "absolute",
		width: '100%',
		height: '100%',
		backgroundColor: 'white'
	},
	image: {
		position: "absolute",
		resizeMode: 'cover',
		width: '100%',
		height: '100%',
	}
})