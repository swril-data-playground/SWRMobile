import { AvatarType, defaultAvatar } from "./avatar"

interface AccountType {
	firstName: string
	lastName: string
	avatar: AvatarType
	walletId: string
	keyPhrase: string
	householdMembers: PublicAccountType[]
}

const defaultAccount: AccountType = {
	firstName: '',
	lastName: '',
	avatar: defaultAvatar,
	walletId: '',
	keyPhrase: '',
	householdMembers: [],
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
