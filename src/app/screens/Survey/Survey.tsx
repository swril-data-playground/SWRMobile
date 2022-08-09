import { BackButton } from "components/BackButton"
import BackgroundImage from "components/BackgroundImage"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { SurveyType } from "types/surveys"

export const Survey = (props: {content: any}) => {
	const content = props.content as SurveyType
	return (
		<View style={styles.container}>
		</View>
	)
}	

const styles = StyleSheet.create({
	container: {
	}
})