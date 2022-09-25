import { AccountType, defaultAccount } from "./account";

export interface HouseholdRequestType {
	fromAccount: AccountType
	toAccount: AccountType
}

export const defaultHouseholdRequestType = {
	fromAccount: {
		...defaultAccount,
		firstName: 'Jonathan'
	},
	toAccount: defaultAccount
}