import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInputWithTitle } from "components/SWRTextInputWithTitle"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { setSignUpData, SignUpData, step } from '../SignUpFlow'
import { PuzzleImage } from "./components/PuzzleImage"

export const CreateAccountHuman = (props: {
	data: SignUpData,
	setData: setSignUpData
	next: step
	back: step
}) => {
	const nextEnabled = (props.data.firstName.length > 0 &&
		props.data.lastName.length > 0 &&
		props.data.password.length > 0 &&
		props.data.password === props.data.password2)
	return (
		<View style={gs.fullScreen} >
			<BackButton onPressOverride={props.back} leftAlign={true} style={{position: 'absolute'}}/>
			<PuzzleImage/>
			<SWRText font={'medium'} style={styles.title}>Create an account</SWRText>
			<SWRTextInputWithTitle value={props.data.firstName} name={'First Name'} style={styles.textInput} onChange={(firstName) => {
				props.setData({...props.data, firstName})	
			}}/>
			<SWRTextInputWithTitle value={props.data.lastName} name={'Last Name'} style={styles.textInput} onChange={(lastName) => {
				props.setData({...props.data, lastName})	
			}}/>
			<SWRTextInputWithTitle value={props.data.password} name={'Password'} style={styles.textInput} onChange={(password) => {
				props.setData({...props.data, password})	
			}}/>
			<SWRTextInputWithTitle value={props.data.password2} name={'Confirm Password'} style={styles.textInput} onChange={(password2) => {
				props.setData({...props.data, password2})	
			}}/>

			<SWRButton disabled={!nextEnabled} onPress={props.next} style={styles.nextButton}>
				<SWRText style={gs.h4}>Next</SWRText>
			</SWRButton>
			<Image source={images.woman_at_desk} style={styles.officeDeskImage}/>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 37
	},
	textInput: {
		marginVertical: 3
	},
	nextButton: {
		width: '100%',
		marginTop: 15
	},
	officeDeskImage: {
		marginTop: 10,
		height: 150,
		width: 220
	}
})