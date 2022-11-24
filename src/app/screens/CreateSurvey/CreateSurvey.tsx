import { BackButton } from "components/BackButton"
import { QuestionsCreator } from "components/QuestionsCreator"
import { SWRButton } from "components/SWRButton"
import { SWRSelectInput } from "components/inputs/SWRSelectInput"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { tryCreateSurvey } from "data/surveys"
import { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { CategoryType, dataCategories } from "types/filter"
import { defaultSurvey, SurveyType } from "types/surveys"
import { ToastContext } from "contexts/toastContext"

export const CreateSurvey = () => {
	const [surveyData, setSurveyData] = useState<SurveyType>(defaultSurvey)
	const { auth } = useContext(AuthContext)
	const { setStack } = useContext(NavContext)
	const { pushToast } = useContext(ToastContext)
	const handleTryCreateSurvey = async () => {
		if (!auth.account) return
		const {survey, status} = await tryCreateSurvey(surveyData, auth.account)
		if (status === 200) {
			setSurveyData(defaultSurvey)
			setStack(['Home', 'Survey'], survey)
		} else {
			pushToast({title: 'Failed to create survey', type: 'error'})
		}
	}
	const doneEnabled = (
		surveyData.title.length > 0 &&
		surveyData.description.length > 0 &&
		surveyData.category &&
		surveyData.questions.length > 0
	)
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding />
			<ScrollView style={gs.screenPadding} keyboardShouldPersistTaps='handled'>
				<SWRText font={'medium'} style={styles.headerText}>Survey</SWRText>
				<SWRTextInput 
					name={'Title'} 
					onChange={(title) => setSurveyData({...surveyData, title})} 
					value={surveyData.title}
					withTitle
				/>
				<SWRTextInput
					name={'Description'} 
					onChange={(description) => setSurveyData({...surveyData, description})} 
					value={surveyData.description}
					lines={3}
					withTitle
				/>
				<SWRSelectInput 
					value={surveyData.category}
					choices={dataCategories}
					onChange={(value) => setSurveyData({...surveyData, category: value as CategoryType})}
					name={'Category'}
					withTitle
				/>
				<QuestionsCreator 
					questions={surveyData.questions} 
					setQuestions={(questions) => setSurveyData({...surveyData, questions})} 
					withTitle
				/>
				<SWRButton style={styles.doneButton} onPress={handleTryCreateSurvey} disabled={!doneEnabled}>
					<SWRText style={gs.h5} font={'medium'}>Done</SWRText>
				</SWRButton>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	headerText: {
		textAlign: 'center',
		fontSize: 40,
		marginBottom: 10
	},
	doneButton: {
		marginTop: 20,
		marginBottom: 50,
		borderRadius: 15,
	}
})