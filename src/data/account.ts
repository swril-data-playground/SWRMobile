import { AuthContextType } from 'contexts/authContext'
import { SignUpData } from 'screens/SignUp/SignUpFlow';
import { AccountType } from 'types/account';
import { statusType } from 'types/data';
import { HouseholdRequestType } from 'types/householdRequest';
import { exampleAccount } from './exampleData';

export const tryGetAuth = async (): Promise<{ status: statusType, auth: AuthContextType }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return {
		status: 200,
		auth: {
			auth: '',
			account: exampleAccount
		}
	}
}

export const tryCreateHumanAccount = async (data: SignUpData): Promise<{ status: statusType }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}

export const tryCreateOrgAccount = async (data: SignUpData): Promise<{ status: statusType }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}

export const tryRespondToHouseholdRequest = async (data: HouseholdRequestType, approve: boolean): Promise<{status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}
export const tryAddHouseholdMember = async (data: String, account: AccountType): Promise<{ status: statusType, householdMember: String }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 , householdMember: data}
}
export const tryEditProfileInfo = async (data: AccountType, account: AccountType): Promise<{ status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}