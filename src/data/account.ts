import { AuthContextType } from 'contexts/authContext'
import { SignUpData } from 'screens/SignUp/SignUpFlow';
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