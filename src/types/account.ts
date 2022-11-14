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
