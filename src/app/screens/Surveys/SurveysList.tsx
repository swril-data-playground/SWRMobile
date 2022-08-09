import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { SurveyType } from "types/surveys"

export const SurveysList = (props: {
	title: string,
	surveys: SurveyType[]	
}) => {
	const { setNav } = useContext(NavContext)
	return (
		<View>
			<SWRText style={gs.mediumText}>{props.title}</SWRText>
			<View style={styles.list}>
				{props.surveys.map((survey, i) => {
					return (
						<TouchableOpacity key={i} style={styles.survey} onPress={() => setNav('Survey', survey)}>
							<SWRText style={styles.surveyName}>{survey.name}</SWRText>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	},
	list: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	survey: {
		padding: 15,
		paddingTop: 20,
		marginVertical: 10,
		borderRadius: 20,
		width: '45%',
		backgroundColor: 'white'
	},
	surveyName: {
		fontSize: 18,
	}
})