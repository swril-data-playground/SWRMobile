import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { PuzzleImage } from "components/PuzzleImage"
import { step } from "../LoginFlow"
import { TextButton } from "components/TextButton"
import { useContext, useState } from "react"
import { AuthContext } from "contexts/authContext"
import { DataContext } from "contexts/dataContext"
import { ToastContext } from "contexts/toastContext"
import { tryPasswordLogin } from "data/account"

export const PasswordLogin = (props: {
	// data: LoginData,
	// setData: setLoginData
    // to implement
	switchLoginMethod: step
    contactSupport: step
}) => {
	const [state, setState] = useState('')
	const { setAuth } = useContext(AuthContext)
	const { reloadData } = useContext(DataContext)
	const { pushToast } = useContext(ToastContext)

	const login = async () => {
		const { status, account } = await tryPasswordLogin(state)
		if (status === 200) {
			await reloadData()
			setAuth({
				auth: account?.walletId || '',
				account
			})
		} else if (status === 500) {
			pushToast({
				type: 'error',
				title: 'Network Error',
				details: 'Something went wrong. Check your network connection.',
			})
		} else {
			pushToast({
				type: 'error',
				title: 'Error',
				details: 'Something went wrong. Please try again.',
			})
		}	
	}

	const nextEnabled = (state.length > 0)
	return (
		<View style={gs.fullScreen} >
			<BackButton leftAlign style={{position: 'absolute'}}/>
			<PuzzleImage width={200}/>
			<SWRText font={'medium'} style={styles.title}>Login</SWRText>
			<SWRTextInput password withTitle value={state} name={'Password'} containerStyle={styles.textInput} onChange={(password) => {
				setState(password)
			}}/>

			<SWRButton disabled={!nextEnabled} onPress={login} style={styles.nextButton}>
				<SWRText style={gs.h4}>Login</SWRText>
			</SWRButton>
            <SWRText font={'medium'} style={styles.subtitle}>Having some trouble?</SWRText>
			<TextButton onPress={props.switchLoginMethod} style={styles.link}>Login using your key phrase</TextButton>
            <SWRText font={'medium'} style={styles.subtitle}>Still can't login?</SWRText>
			<TextButton onPress={props.contactSupport} style={styles.link}>Contact us</TextButton>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 37
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
	textInput: {
		marginVertical: 3
	},
	nextButton: {
		width: '100%',
		marginTop: 15
	},
	officeDeskImage: {
		marginTop: 50,
		height: 200,
		width: 220
	}
})