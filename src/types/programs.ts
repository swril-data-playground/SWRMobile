import { defaultPublicAccount, PublicAccountType } from "./account"
import { CategoryType, MunicipalityType } from "./filter"
import { QuestionType } from "./questions"


interface ProgramType {
	id?: string,
	title: string,
	creator: string,
	image: string,
	description: string,
	category: CategoryType,
	municipality: MunicipalityType,
	address: string,
	date: string,
	startTime: string,
	endTime: string,
	repeat?: string,
	attendees: PublicAccountType[],
	questions: QuestionType[]
}
const defaultProgram: ProgramType = {
	title: '',
	creator: '',
	image: '',
	description: '',
	category: 'Learning',
	municipality: 'Waterloo',
	address: '',
	date: (new Date()).toUTCString(),
	startTime: (new Date()).toUTCString(),
	endTime: (new Date()).toUTCString(),
	attendees: [defaultPublicAccount, defaultPublicAccount, defaultPublicAccount, defaultPublicAccount],
	questions: []
}

export { defaultProgram }
export type { ProgramType }
