import { AvatarType, defaultAvatar } from "./avatar"
import { ProgramType } from "./programs"
import { SurveyType } from "./surveys"

type AccountType = {
	walletId: string
	keyPhrase: string
	org: false,
	userInfo: {
		firstName: string
		lastName: string
		avatar: AvatarType
		householdMembers: PublicAccountType[]
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
} | {
	walletId: string
	keyPhrase: string
	org: true,
	orgInfo: {
		name: string,
		creations: {
			programs: ProgramType[],
			surveys: SurveyType[],
		},
	}
}

const defaultUserInfo = {
	firstName: '',
	lastName: '',
	avatar: defaultAvatar,
	householdMembers: [],
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

const defaultAccount: AccountType = {
	org: false,
	userInfo: defaultUserInfo,
	walletId: '',
	keyPhrase: '',
}

interface PublicAccountType {
	firstName: string
	lastName: string
	avatar: AvatarType,
}

const defaultPublicAccount: PublicAccountType = {
	firstName: '',
	lastName: '',
	avatar: defaultAvatar,
}


export { defaultAccount, defaultPublicAccount, defaultUserInfo }
export type { AccountType, PublicAccountType }
