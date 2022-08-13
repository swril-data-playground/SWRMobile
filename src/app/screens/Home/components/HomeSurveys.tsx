import BackgroundImage from "components/BackgroundImage"
import { SWRText } from "components/SWRText"
import { TextButton } from "components/TextButton"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { SurveyType } from "types/surveys"

export const HomeSurveys = (props: {
	surveys: SurveyType[]	
}) => {
	const { setNav } = useContext(NavContext)
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<SWRText style={gs.h5} font={'bold'}>Featured Surveys</SWRText>
				<TextButton onPress={() => setNav('Surveys')}>View all</TextButton>
			</View>
			<ScrollView style={styles.scroller} horizontal showsHorizontalScrollIndicator={false}>
				{props.surveys.map((survey, i) => {
					return (
						<TouchableOpacity style={styles.survey} onPress={() => setNav('Survey', survey)} key={i}>
							<View style={styles.surveyImage}>
								<BackgroundImage image={{uri: survey.image}} style={gs.fillImage}/>
							</View>
							<View style={styles.surveyInfoView}>
								<SWRText font={'medium'} style={gs.h6}>{survey.title}</SWRText>
								<SWRText style={styles.surveyCreator}>By {survey.creator}</SWRText>
							</View>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 15
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	scroller: {
		overflow: 'visible'
	},
	survey: {
		height: 170,
		width: 250,
		marginVertical: 5,
		marginRight: 10,
		borderRadius: 20,
		padding: 10,
		flexDirection: 'row',
		backgroundColor: 'white'
	},
	surveyImage: {
		flex: 1,
		borderRadius: 20,
		overflow: 'hidden',
	},
	surveyInfoView: {
		flex: 1,
		padding: 7
	},
	surveyCreator: {
		fontSize: 12,
		marginTop: 20,
	},
})