import { BackButton } from "components/BackButton"
import { QuestionsCreator } from "components/QuestionsCreator"
import { SWRButton } from "components/SWRButton"
import { SWRSelectInput } from "components/SWRSelectInput"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/SWRTextInput"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { tryCreateProgram } from "data/programs"
import { tryCreateSurvey } from "data/surveys"
import { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"
import { CategoryType, municipalities } from "types/filter"
import { defaultProgram, ProgramType } from "types/programs"
import { questionTypes } from "types/questions"

export const CreateProgram = () => {
	const [programData, setProgramData] = useState<ProgramType>(defaultProgram)
	const { auth } = useContext(AuthContext)
	const { setStack } = useContext(NavContext)
	const handleTryCreateProgram = async () => {
		if (!auth.account) return
		const {program, status} = await tryCreateProgram(programData, auth.account)
		if (status === 200) {
			setProgramData(defaultProgram)
			setStack(['Home', 'Program'], program)
		}
		else throw Error('Failed to create program')
	}
	const doneEnabled = (
		programData.title.length > 0 &&
		programData.description.length > 0 &&
		programData.category.length > 0 &&
		programData.municipality.length > 0 &&
		programData.address.length > 0
	)
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding />
			<ScrollView style={gs.screenPadding} keyboardShouldPersistTaps='handled'>
				<SWRText font={'medium'} style={styles.headerText}>Program</SWRText>
				<SWRTextInput 
					name={'Title'} 
					onChange={(title) => setProgramData({...programData, title})} 
					value={programData.title}
					withTitle
				/>
				<SWRTextInput
					name={'Description'} 
					onChange={(description) => setProgramData({...programData, description})} 
					value={programData.description}
					lines={3}
					withTitle
				/>
				<SWRSelectInput 
					value={programData.category}
					choices={questionTypes}
					onChange={(value) => setProgramData({...programData, category: value as CategoryType})}
					name={'Category'}
					withTitle
				/>
				<SWRTextInput
					name={'Address'} 
					onChange={(address) => setProgramData({...programData, address})} 
					value={programData.address}
					withTitle
				/>
				<SWRSelectInput 
					value={programData.municipality}
					choices={municipalities}
					onChange={(value) => setProgramData({...programData, category: value as CategoryType})}
					name={'Municipal Area'}
					withTitle
				/>
				<QuestionsCreator 
					questions={programData.questions} 
					setQuestions={(questions) => setProgramData({...programData, questions})} 
					withTitle
				/>
				<SWRButton style={styles.doneButton} onPress={handleTryCreateProgram} disabled={!doneEnabled}>
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