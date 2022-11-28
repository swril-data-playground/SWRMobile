import { PollQuestionType } from "types/polls";
import { AnswerType, QuestionType } from "types/questions";

export const generateAnswersArray = (questions: (QuestionType|PollQuestionType)[]) => {
	const answers: AnswerType[] = []
	questions.forEach((question, i) => {
		answers.push('')
	})
	return answers
}