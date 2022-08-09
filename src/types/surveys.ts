import { QuestionType } from "./questions"

interface SurveyType  {
	id?: string
	name: string
	description: string
	creator: string
	image: string,
	questions: QuestionType[]
}
const defaultSurvey: SurveyType = {
	id: '',
	name: '',
	image: '',
	description: '',
	creator: '',
	questions: [],
}

export { defaultSurvey }
export type { SurveyType }
