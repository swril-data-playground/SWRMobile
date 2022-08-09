import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { setSignUpData, SignUpData, step } from "../SignUpFlow"
import { PuzzleImage } from "./components/PuzzleImage"

export const GetStarted = (props: {
	data: SignUpData,
	setData: setSignUpData
	next: step
	back: step
}) => {
	return (
		<View style={gs.fullScreen} >
			<BackButton onPressOverride={props.back} leftAlign={true} style={{position: 'absolute'}}/>
			<PuzzleImage/>
			<SWRText font={'medium'} style={gs.largeText}>Let's get started</SWRText>
			<SWRText  style={gs.text}>Tell us a little bit about yourself!</SWRText>
			<SWRText style={[gs.mediumText, {marginTop: 50}]}>Are you a...</SWRText>
			<SWRButton onPress={() => {
				props.setData({...props.data, type: 'Human'})
				props.next()
			}} style={styles.button}>
				<SWRText style={gs.text}>Human</SWRText>
			</SWRButton>
			<SWRText style={gs.mediumText}>or</SWRText>
			<SWRButton onPress={() => {
				props.setData({...props.data, type: 'Org'})
				props.next()
			}} style={styles.button}>
				<SWRText style={gs.text}>Community Organization</SWRText>
			</SWRButton>
			<Image source={images.cape_boy} style={styles.capeBoy}/>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '80%',
		margin: 25
	},
	capeBoy: {
		height: 225,
		width: 225
	}
})