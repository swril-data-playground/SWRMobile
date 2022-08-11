import { BackButton } from "components/BackButton"
import { QuestionsCreator } from "components/QuestionsCreator"
import { SWRSelectInput } from "components/SWRSelectInput"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/SWRTextInput"
import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"
import { CategoryType } from "types/filter"
import { questionTypes } from "types/questions"
import { defaultSurvey, SurveyType } from "types/surveys"

export const CreateSurvey = () => {
	const [surveyData, setSurveyData] = useState<SurveyType>(defaultSurvey)
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
					setQuestions={(questions) => setSurveyData({...surveyData, questions})} 
					withTitle
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	headerText: {
		textAlign: 'center',
		fontSize: 40,
		marginBottom: 10
	}
})