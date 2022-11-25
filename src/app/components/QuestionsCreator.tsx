import { images } from "assets/images"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"
import { defaultQuestion, QuestionType, questionTypes, typeOfQuestion } from "types/questions"
import { SWRButton } from "./SWRButton"
import { SWRSelectInput } from "./inputs/SWRSelectInput"
import { SWRText } from "./SWRText"
import { SWRTextInput } from "./inputs/SWRTextInput"
import { ListCreator } from "./ListCreator"

export const QuestionsCreator = (props: {
	questions: QuestionType[]
	setQuestions: (newQuestions: QuestionType[]) => void
	withTitle?: boolean
}) => {
	const addQuestion = () => {
		props.setQuestions([...props.questions, {...defaultQuestion}])
	}
	const content = (
		<View style={styles.container}>
			<SWRButton onPress={addQuestion} style={styles.addQuestion}>
				<SWRText style={gs.h5}>Add a question</SWRText>
				<Image source={images.add} style={styles.addIcon}/>
			</SWRButton>
			<View>
				{props.questions.map((question, i) => {
					const setQuestion = (newQuestion: QuestionType) => {
						const newQuestions = [...props.questions]
						newQuestions[i] = newQuestion
						props.setQuestions(newQuestions)
					}
					const moveUpQuestion = () => {
						const newQuestions = [...props.questions]
						newQuestions[i-1] = props.questions[i]
						newQuestions[i] = props.questions[i-1]
						props.setQuestions(newQuestions)
					}
					const moveDownQuestion = () => {
						const newQuestions = [...props.questions]
						newQuestions[i+1] = props.questions[i]
						newQuestions[i] = props.questions[i+1]
						props.setQuestions(newQuestions)
					}
					const deleteQuestion = () => {
						const newQuestions = [...props.questions]
						newQuestions.splice(i, 1)
						props.setQuestions(newQuestions)
					}


					return (
						<View key={i} style={styles.question}>
							<View style={styles.questionHeader}>
								<SWRText style={gs.h5}>{i+1}. Question prompt:</SWRText>
								<View style={styles.questionHeader}>
									{i > 0 && <TouchableOpacity onPress={moveUpQuestion} style={styles.questionButton}>
										<Image source={images.up_arrow} style={gs.fillImage} />
									</TouchableOpacity>}
									{i < props.questions.length - 1 && <TouchableOpacity onPress={moveDownQuestion} style={styles.questionButton}>
										<Image source={images.down_arrow} style={gs.fillImage} />
									</TouchableOpacity>}
									<TouchableOpacity onPress={deleteQuestion} style={[styles.questionButton, {backgroundColor: 'red' }]}>
										<Image source={images.delete} style={gs.fillImage} />
									</TouchableOpacity>
								</View>
							</View>
							<SWRTextInput 
								name={'Question Prompt'} 
								value={question.prompt} 
								onChange={(prompt) => {setQuestion({...question, prompt})}}
								inputStyle={{
									backgroundColor: colors.lightGrey,
									paddingLeft: 20
								}}
							/>
							<SWRText style={gs.h5}>Question Type</SWRText>
							<SWRSelectInput 
								value={question.type}
								onChange={(type) => {setQuestion({...question, type: type as typeOfQuestion})}}
								buttonStyle={{backgroundColor: colors.lightGrey}}
								choices={questionTypes}
							/>
							{ (question.type === 'MC' || question.type === 'Select') && (
								<View>
									<ListCreator
										list={question.choices??[]}
										setList={(newChoices) => {setQuestion({...question, choices: newChoices})}}
									/>
								</View>
							)}
						</View>
					)
				})}
			</View>
		</View>
	)
	if (!props.withTitle) return content
	return (
		<View style={[styles.withTitleContainer]}>
			<SWRText style={gs.h5}>Questions</SWRText>
			{content}
		</View>
	)
}

const styles = StyleSheet.create({
	withTitleContainer: {
		alignItems: 'flex-start',
		width: '100%',
	},
	container: {
		marginVertical: 4,
		width: '100%',
	},
	addQuestion: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		borderRadius: 10,
	},
	addIcon: {
		height: 25,
		width: 25
	},
	question: {
		backgroundColor: 'white',
		padding: 10,
		marginBottom: 5,
		borderRadius: 10
	},
	questionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	questionButtons: {
		flexDirection: 'row'
	},
	questionButton: {
		height: 35,
		width: 35,
		marginLeft: 10,
		borderRadius: 20,
		borderColor: 'black',
		borderWidth: 2
	}
})