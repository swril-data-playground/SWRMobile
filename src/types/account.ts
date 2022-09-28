import { AvatarType, defaultAvatar } from './avatar'
import { ProgramType } from './programs'
import { SurveyType } from './surveys'

export const genderDataCategories = ['-Select-', 'Male', 'Female', 'Other'] as const
export const religionDataCategories = ['-Select-', 'Christian', 'Sikhs', 'Hindus', 'Jains'] as const

export type CategoryTypeGender = typeof genderDataCategories[number]
export type CategoryTypeReligion = typeof religionDataCategories[number]

interface AccountType {
	firstName: string
	lastName: string
	avatar: AvatarType
	walletId: string
	keyPhrase: string
	householdMembers: PublicAccountType[]
	creations: {
		programs: ProgramType[]
		surveys: SurveyType[]
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
}

interface PublicAccountType {
	firstName: string
	lastName: string
	avatar: AvatarType
}

const defaultPublicAccount: PublicAccountType = {
	...defaultAccount,
}

export { defaultAccount, defaultPublicAccount }
export type { AccountType, PublicAccountType }
