import { defaultAccount, UserAccountType } from "./account";

export interface HouseholdRequestType {
	fromAccount: UserAccountType
	toAccount: UserAccountType
}

export const defaultHouseholdRequestType = {
	fromAccount: {
		...defaultAccount,
		firstName: 'Jonathan'
	},
	toAccount: defaultAccount
}