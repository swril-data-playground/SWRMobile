import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { PuzzleImage } from "components/PuzzleImage"
import { ContactData, setContactData } from "./ContactData"
import { step } from "../LoginFlow"

export const ContactUs = (props: {
	data: ContactData,
	setData: setContactData,
	sendMessage: step,
    back: step
}) => {
	const nextEnabled = (props.data.email.length > 0 && props.data.message.length > 0)
	return (
		<View style={gs.fullScreen} >
			<BackButton onPressOverride={props.back} leftAlign style={{position: 'absolute'}}/>
			<PuzzleImage width={200}/>
			<SWRText font={'medium'} style={styles.title}>Contact Us</SWRText>
			<SWRTextInput withTitle value={props.data.email} name={'Email address'} containerStyle={styles.textInput} onChange={(email) => {
				props.setData({...props.data, email})	
			}}/>
            <SWRTextInput lines={5} withTitle value={props.data.message} name={'Your message'} containerStyle={styles.textInput} onChange={(message) => {
				props.setData({...props.data, message})	
			}}/>

			<SWRButton disabled={!nextEnabled} onPress={props.sendMessage} style={styles.nextButton}>
				<SWRText style={gs.h4}>Send Message</SWRText>
			</SWRButton>
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