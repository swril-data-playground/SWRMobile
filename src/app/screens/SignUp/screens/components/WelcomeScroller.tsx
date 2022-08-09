import { images } from "assets/images"
import { SWRText } from "components/SWRText"
import { View, StyleSheet, Image } from "react-native"

export const WelcomeScroller = () => {
	return (
		<View style={styles.container}>
			<SWRText style={styles.captionText}>Your information is yours and you chose who has access to it.</SWRText>
			<Image
				source={images.guitar_girl}
				style={styles.guitarGirlImage}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		marginTop: 40
	},
	captionText: {
		textAlign: 'center',
		fontSize: 20
	},
	guitarGirlImage: {
		marginTop: 10,
		height: 280,
		width: 230
	}
})