import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { PuzzleImage } from "components/PuzzleImage"
import { step } from "../LoginFlow"

export const ThankYou = (props: {
	done: step, back: step
}) => {
	return (
		<View style={gs.fullScreen} >
			<BackButton onPressOverride={props.back} leftAlign style={{position: 'absolute'}}/>
			<PuzzleImage width={200}/>
			<SWRText font={'medium'} style={styles.title}>Thank you</SWRText>
			<SWRText font={'medium'} style={styles.subtitle}> For contacting us, we will get back to you shortly</SWRText>
			<Image source={images.umbrella_cat} style={styles.image}/>
			<SWRButton onPress={props.done} style={styles.nextButton}>
				<SWRText style={gs.h4}>Done</SWRText>
			</SWRButton>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 37
	},
	subtitle: {
		marginTop: 20,
		fontSize: 30,
		textAlign: 'center'
	},
	textInput: {
		marginVertical: 3
	},
	nextButton: {
		width: '100%',
		marginTop: 15
	},
	image: {
		marginTop: 30,
		height: 270,
		width: 220
	}
})