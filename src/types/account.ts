import { AvatarType, defaultAvatar } from "./avatar"
import { ProgramType } from "./programs"
import { SurveyType } from "./surveys"

type UserPersonalInfo = {
	DOB?: string,
	gender?: string,
	height?: number,
	weight?: number,
	religion?: string,
	race?: string,
	grade?: number,
	postalCode?: string,
}


type UserInfo = {
	firstName: string
	lastName: string
	avatar: AvatarType
	householdMembers: PublicAccountType[]
	personalInfo: UserPersonalInfo
}

type CreationsType = {
	programs: ProgramType[]
	surveys: SurveyType[]
}

type OrgInfo = {
	name: string,
	creations: CreationsType
}

type OrgAccountType = {
	walletId: string
	keyPhrase: string
	org: true,
	orgInfo: OrgInfo
}

type UserAccountType = {
	walletId: string
	keyPhrase: string
	org: false,
	userInfo: UserInfo
}

type AccountType = UserAccountType | OrgAccountType

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
export type { AccountType, PublicAccountType, UserInfo, OrgInfo, UserPersonalInfo, UserAccountType, CreationsType }
