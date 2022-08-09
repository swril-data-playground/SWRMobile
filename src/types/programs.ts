import { mediumLorem } from "data/lorem"
import { defaultPublicAccount, PublicAccountType } from "./account"
import { CategoryType, LocationType } from "./filter"


interface ProgramType {
	id?: string,
	name: string,
	caption: string,
	image: string,
	description: string,
	category: CategoryType,
	location: LocationType,
	date: string,
	startTime: string,
	endTime: string,
	repeat?: string,
	attendees: PublicAccountType[],
}
const defaultProgram: ProgramType = {
	name: '',
	caption: '',
	image: '',
	description: '',
	category: 'Learning',
	location: 'Waterloo',
	date: '',
	startTime: '',
	endTime: '',
	attendees: [defaultPublicAccount, defaultPublicAccount, defaultPublicAccount, defaultPublicAccount],
}

export { defaultProgram }
export type { ProgramType }
