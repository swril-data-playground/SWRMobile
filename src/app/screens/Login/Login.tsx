import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { TextButton } from "components/TextButton"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { checkkey } from "data/account"

export const Login = () => {
	const { setNav } = useContext(NavContext)
	const tryLogin = () => {
		

	}
	return (
		<View style={gs.fullScreen}>
			<SWRButton onPress={tryLogin}>
				<SWRText>Login</SWRText>
			</SWRButton>
			<View style={styles.bottomText}>
				<SWRText style={gs.h4}>{'Don\'t have an account? '}</SWRText>
				<TextButton onPress={() => setNav('SignUp')} style={[gs.h4, {color: 'blue'}]}>Sign up</TextButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bottomText: {
		flexDirection: 'row',
		marginTop: 10
	}
})