import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { gs } from 'styles/globals'
import { BackButton } from 'components/BackButton'
import { SWRText } from 'components/SWRText'
import { images } from 'assets/images'
import { SurveysList } from './SurveysList'
import { useContext } from 'react'
import { DataContext } from 'contexts/dataContext'

const SurveysScreen = () => {
	const { data } = useContext(DataContext)
	const requestedSurveys = data.surveys
	const nearYouSurveys = data.surveys
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<View style={[styles.header, gs.screenPadding]}>
				<SWRText font={'medium'} style={gs.h1}>Surveys</SWRText>
				<TouchableOpacity>
					<Image source={images['tune']}/>
				</TouchableOpacity>
			</View>
			<ScrollView style={gs.screenPadding}>
				<SurveysList surveys={requestedSurveys} title={'Requested'}/>
				<SurveysList surveys={nearYouSurveys} title={'For you'}/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}
})

export default SurveysScreen
