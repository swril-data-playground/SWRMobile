import { defaultPublicAccount, PublicAccountType } from "./account"
import { CategoryType, MunicipalityType,CategoryTypeGender,CategoryTypeReligion } from "./filter"
import { QuestionType } from "./questions"


interface ProgramType {
	id?: string,
	title: string,
	caption: string,
	creator: string,
	image: string,
	description: string,
	category: CategoryType,
	genderCategory:CategoryTypeGender,
	religionCategory:CategoryTypeReligion,
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
	caption: '',
	creator: '',
	image: '',
	description: '',
	category: 'Learning',
	genderCategory:'-Select-',
	religionCategory:'-Select-',
	municipality: 'Waterloo',
	address: '',
	date: '',
	startTime: '',
	endTime: '',
	attendees: [defaultPublicAccount, defaultPublicAccount, defaultPublicAccount, defaultPublicAccount],
	questions: []
}

export { defaultProgram }
export type { ProgramType }
