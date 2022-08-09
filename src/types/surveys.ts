export const questionTypes = ['Open-ended', 'Multiple choice', 'Demographic', 'Date'] as const
type questionType = typeof questionTypes[number]

interface Question {
	id?: string
	prompt: string
	type: questionType
	choices?: string[]
	optional: boolean
}
interface SurveyType  {
	id?: string
	name: string
	description: string
	creator: string
	image: string,
	questions: Question[]
}
const defaultSurvey: SurveyType = {
	id: '',
	name: '',
	image: '',
	description: '',
	creator: '',
	questions: [],
}
const defaultAnswer = {
	answer: '',
	question_id: 0,
}

export { defaultAnswer, defaultSurvey }
export type { Question, SurveyType }
