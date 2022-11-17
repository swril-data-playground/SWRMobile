import { AvatarType, defaultAvatar } from "./avatar"
import { ProgramType } from "./programs"
import { SurveyType } from "./surveys"

interface AccountType {
	firstName: string
	lastName: string
	avatar: AvatarType
	walletId: string
	keyPhrase: string
	householdMembers: PublicAccountType[]
	creations: {
		programs: ProgramType[],
		surveys: SurveyType[],
	},
	personalInfo: {
		DOB: string,
		gender: string,
		height: number,
		weight: number,
		religion: string,
		race: string,
		grade: number,
		postalCode: string,
	}
}

const defaultAccount: AccountType = {
	firstName: '',
	lastName: '',
	avatar: defaultAvatar,
	walletId: '',
	keyPhrase: '',
	householdMembers: [],
	creations: {
		programs: [],
		surveys: [],
	},
	personalInfo: {
		DOB: '',
		gender: '',
		height: 0,
		weight: 0,
		religion: '',
		race: '',
		grade: 0,
		postalCode: '',
	}
}

interface PublicAccountType {
	firstName: string
	lastName: string
	avatar: AvatarType,
}

const defaultPublicAccount: PublicAccountType = {
	...defaultAccount
}


export { defaultAccount, defaultPublicAccount }
export type { AccountType, PublicAccountType }
