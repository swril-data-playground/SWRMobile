import { AnswerType, QuestionType } from "types/questions";

export const generateAnswersArray = (questions: QuestionType[]) => {
	const answers: AnswerType[] = []
	questions.forEach((question, i) => {
		answers.push('')
	})
	return answers
}