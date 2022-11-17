import { gql } from '@apollo/client'
import { AuthContextType } from 'contexts/authContext'
import { SignUpData } from 'screens/SignUp/SignUpFlow'
import { AccountType, defaultAccount } from 'types/account'
import { statusType } from 'types/data'
import { HouseholdRequestType } from 'types/householdRequest'
import { exampleAccount } from './exampleData'
import { client } from './graphql'
import { Storage } from './storage'

const GET_ACCOUNT = gql`
	query Account($input: AccountAuth!) {
		account(input: $input) {
			org {
				name
			}
			user {
				firstName
				lastName
				householdMembers {
					firstName
					lastName
				}
			}
		}
	}
`

export const tryGetAuth = async (): Promise<{ status: statusType; auth: AuthContextType|null }> => {
	const auth = await Storage.getJson<AuthContextType>('auth')
	if (!auth || !auth.account) {
		return {
			status: 404,
			auth: null
		}
	}
	try {
		const res = await client.query({
			query: GET_ACCOUNT,
			variables: {
				input: {
					walletId: auth.account.walletId,
					token: ''
				},
			},
		})
		const data = res.data
		if (!data) {
			return { 
				status: 400, 
				auth: null 
			}
		}
		const account = data.account.user
		return {
			status: 200,
			auth: {
				auth: '',
				account: {
					...defaultAccount,
					firstName: account.firstName,
					lastName: account.lastName,
					walletId: auth.account.walletId,
					householdMembers: account.householdMembers,
				},
			},
		}
	} catch (e: any) {
		if (e.message === 'user not found') {
			return {
				status: 404,
				auth: null,
			}
		} else {
			console.error(e)
			return {
				status: 500,
				auth: null,
			}
		}
	}
	
}

const CREATE_USER = gql`
	mutation CreateUser($input: UserInput!) {
		createUser(input: $input) {
			firstName
			lastName
			walletId
		}
	}
`

export const tryCreateHumanAccount = async (input: SignUpData): Promise<{ status: statusType; account: AccountType | null }> => {
	try {
		const res = await client.mutate({
			mutation: CREATE_USER,
			variables: {
				input: {
					firstName: input.firstName,
					lastName: input.lastName,
					password: input.password,
				},
			},
		})
		const data = res.data
		if (!data) {
			console.log(res.errors)
			return { status: 400, account: null }
		}
		return {
			status: 200,
			account: {
				...defaultAccount,
				firstName: data.createUser.firstName,
				lastName: data.createUser.lastName,
				walletId: data.createUser.walletId,
			},
		}
	} catch (e) {
		console.log(e)
		return { status: 500, account: null }
	}
}

export const tryCreateOrgAccount = async (data: SignUpData): Promise<{ status: statusType }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}

export const tryRespondToHouseholdRequest = async (data: HouseholdRequestType, approve: boolean): Promise<{ status: statusType }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}
export const tryAddHouseholdMember = async (data: String, account: AccountType): Promise<{ status: statusType; householdMember: String }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 , householdMember: data}
}
export const tryEditProfileInfo = async (data: AccountType, account: AccountType): Promise<{ status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}
