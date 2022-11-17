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
import { CategoryType } from "types/filter"
import { questionTypes, QuestionType} from "types/questions"
import { defaultSurvey, SurveyType } from "types/surveys"
import { useAgent, useCredentialById } from '@aries-framework/react-hooks'
import { surveySchema } from "types/creation"

export const CreateSurvey = () => {
	const { agent } = useAgent()
	const [surveyData, setSurveyData] = useState<SurveyType>(defaultSurvey)
	const [survSchema , setsurvSchema] = useState<surveySchema>()
	const { auth } = useContext(AuthContext)
	const { setStack } = useContext(NavContext)
	const handleTryCreateSurvey = async () => {
		if (!auth.account) return
		const {survey, status} = await tryCreateSurvey(surveyData, auth.account)
		if (status === 200) {
			setSurveyData(defaultSurvey)
			setStack(['Home', 'Survey'], survey)
		}
		else throw Error('Failed to create survey')
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
					choices={questionTypes}
					onChange={(value) => setSurveyData({...surveyData, category: value as CategoryType})}
					name={'Category'}
					withTitle
				/>
				<QuestionsCreator 
					questions={surveyData.questions} 
					setQuestions={(questions) => {setSurveyData({...surveyData, questions}); setsurvSchema({...survSchema , name:surveyData.title , version:'1.0.0' , attributes:{actionType:'survey' , category:surveyData.category ,description:surveyData.description, questions:questions}})}}
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
		borderRadius: 15,
	}
})