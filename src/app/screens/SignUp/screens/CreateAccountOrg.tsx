import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { setSignUpData, SignUpData, step } from '../SignUpFlow'
import { PuzzleImage } from "../../../components/PuzzleImage"

export const CreateAccountOrg = (props: {
	data: SignUpData,
	setData: setSignUpData
	next: step
	back: step
}) => {
	const nextEnabled = (props.data.name.length > 0 &&
		props.data.password.length > 0 &&
		props.data.password === props.data.password2)
	return (
		<View style={gs.fullScreen} >
			<BackButton onPressOverride={props.back} leftAlign style={{position: 'absolute'}}/>
			<PuzzleImage width={200}/>
			<SWRText font={'medium'} style={styles.title}>Create an account</SWRText>
			<SWRTextInput withTitle value={props.data.name} name={'Name of Organization'} containerStyle={styles.textInput} onChange={(name) => {
				props.setData({...props.data, name})	
			}}/>
			<SWRTextInput password withTitle value={props.data.password} name={'Password'} containerStyle={styles.textInput} onChange={(password) => {
				props.setData({...props.data, password})	
			}}/>
			<SWRTextInput password withTitle value={props.data.password2} name={'Confirm Password'} containerStyle={styles.textInput} onChange={(password2) => {
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
		height: 200,
		width: 300
	}
})