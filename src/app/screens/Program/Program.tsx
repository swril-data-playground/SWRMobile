import { AvatarIcon } from "components/AvatarIcon"
import { BackButton } from "components/BackButton"
import BackgroundImage from "components/BackgroundImage"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { ToastContext } from "contexts/toastContext"
import { useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"
import { ProgramView } from "./views/ProgramView"

export const Program = (props: {content: any}) => {
	const { pushToast } = useContext(ToastContext)
	const trySignUp = async () => {
		// pushToast({
		// 	title: 'Successfully signed up!',
		// 	type: 'success'
		// })
	}
	return (
		<View style={styles.container}>
			<ProgramView program={props.content as ProgramType} />	
		</View>
	)
}	

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		height: '97%',
	},
})