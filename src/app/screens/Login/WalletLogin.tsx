import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { PuzzleImage } from "../../components/PuzzleImage"
import { LoginData, setLoginData, step } from "./LoginFlow"
import { TextButton } from "components/TextButton"

export const WalletLogin = (props: {
	data: LoginData,
	setData: setLoginData
	login: step
    // to implement
	switchLoginMethod: step
    contactSupport: step
    back: step
}) => {
	const nextEnabled = (props.data.password.length > 0)
    
	return (
		<View style={gs.fullScreen} >
			<BackButton onPressOverride={props.back} leftAlign style={{position: 'absolute'}}/>
			<PuzzleImage width={200}/>
			<SWRText font={'medium'} style={styles.title}>Login</SWRText>
			<SWRTextInput withTitle value={props.data.walletID} name={'Wallet ID'} containerStyle={styles.textInput} onChange={(walletID) => {
				props.setData({...props.data, walletID})	
			}}/>
            <SWRTextInput lines={5} withTitle value={props.data.keyPhrase} name={'Key Phrase'} containerStyle={styles.textInput} onChange={(keyPhrase) => {
				props.setData({...props.data, keyPhrase})	
			}}/>

			<SWRButton disabled={!nextEnabled} onPress={props.login} style={styles.nextButton}>
				<SWRText style={gs.h4}>Login</SWRText>
			</SWRButton>
            <SWRText font={'medium'} style={styles.subtitle}>Having some trouble?</SWRText>
			<TextButton onPress={props.switchLoginMethod} style={styles.link}>Login using your name and password</TextButton>
            <SWRText font={'medium'} style={styles.subtitle}>Still can't login?</SWRText>
			<TextButton onPress={props.contactSupport} style={styles.link}>Contact us</TextButton>
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
    subtitle: {
        marginTop: 20,
        fontSize: 20
    },
    link: {
        ...gs.h4,
        color: 'blue',
        width: 200,
        textAlign: 'center'
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