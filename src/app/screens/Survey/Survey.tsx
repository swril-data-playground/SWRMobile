import { BackButton } from "components/BackButton"
import BackgroundImage from "components/BackgroundImage"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { SurveyType } from "types/surveys"

export const Survey = (props: {content: any}) => {
	const content = props.content as SurveyType
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign={true} screenPadding={true}/>
			<ScrollView >
				<SWRText font={'medium'} style={styles.titleText}>{content.name}</SWRText>

			</ScrollView>
		</View>
	)
}	

const styles = StyleSheet.create({
	titleText: {
		fontSize: 25,
		marginTop: 10,
		marginHorizontal: 20
	}
})