import { images } from "assets/images"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { TextButton } from "components/TextButton"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { View, StyleSheet } from "react-native"
import { gs } from "styles/globals"
import { step } from '../SignUpFlow'
import { PuzzleImage } from "./components/PuzzleImage"
import { WelcomeScroller } from "./components/WelcomeScroller"

export const Welcome = (props: {
	next: step,
}) => {
	const { setNav } = useContext(NavContext)
	return (
		<View style={gs.fullScreen} >
			<PuzzleImage/>
			<SWRText font={'medium'} style={gs.titleText}>Welcome!</SWRText>
			<WelcomeScroller/>
			<SWRButton onPress={props.next} style={styles.signUpButton}>
				<SWRText font={'medium'} style={gs.text}>Sign up</SWRText>
			</SWRButton>
			<View style={styles.bottomText}>
				<SWRText style={gs.text}>{'Already have an account? '}</SWRText>
				<TextButton onPress={() => setNav('Login')} style={[gs.text, {color: 'blue'}]}>Login</TextButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	signUpButton: {
		width: '80%',
		margin: 10
	},
	bottomText: {
		flexDirection: 'row',
		margin: 10
	}
})