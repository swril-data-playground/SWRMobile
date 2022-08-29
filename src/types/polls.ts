import { QuestionType } from "./questions"
import { defaultSurvey, SurveyType } from "./surveys"

interface PollQuestionType extends QuestionType {
	choices: string[]
	type?: undefined
}
interface PollType extends SurveyType {
	questions: PollQuestionType[]
}
const defaultPoll: PollType = {
	...defaultSurvey,
	questions: []
}

export { defaultPoll }
export type { PollType }
