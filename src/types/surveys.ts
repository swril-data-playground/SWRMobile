import { CategoryType } from "./filter"
import { QuestionType } from "./questions"

interface SurveyType  {
	id?: string
	title: string
	category?: CategoryType
	description: string
	creator: string
	image: string,
	questions: QuestionType[]
}
const defaultSurvey: SurveyType = {
	id: '',
	title: '',
	image: '',
	description: '',
	creator: '',
	questions: [],
}

export { defaultSurvey }
export type { SurveyType }
