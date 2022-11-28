import { gql } from '@apollo/client'
import { AuthContextType } from 'contexts/authContext'
import { SignUpData } from 'screens/SignUp/SignUpFlow'
import { AccountType, defaultAccount, defaultUserInfo, UserPersonalInfo } from 'types/account'
import { statusType } from 'types/data'
import { HouseholdRequestType } from 'types/householdRequest'
import { graphql } from './graphql'
import { programFields } from './programs'
import { Storage } from './storage'
import { surveyFields } from './surveys'
import { hashPIN } from 'src/utils/crypto'
import { getSeedPhrase , loadWalletKey } from 'src/services/keychain';
import {
	secretForPIN,
	storeWalletSecret
  } from 'src/services/keychain'
 import {tokenStorage} from 'src/services/jwtstore'

const GET_ACCOUNT = gql(`
	query Account($input: AuthInput!) {
		account(input: $input) {
			org {
				name
				creations {
					programs {
						`+programFields+`
					}
					surveys {
						`+surveyFields+`
					}
				}
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
`)

export const tryGetAuth = async (): Promise<{ status: statusType; auth: AuthContextType|null }> => {
	const auth = await Storage.getJson<AuthContextType>('auth')
	if (!auth || !auth.account) {
		return {
			status: 404,
			auth: null
		}
	}
	graphql.setAuth(auth.auth)
	try {
		const res = await graphql.query(GET_ACCOUNT, {
			input: {
				walletId: auth.account.walletId,
			},
		})
		const data = res.data
		if (!data) {
			return { 
				status: 400, 
				auth: null 
			}
		}
		const user = data.account.user
		const org = data.account.org
		if (user) {
			return {
				status: 200,
				auth: {
					auth: user.walletId,
					account: {
						...defaultAccount,
						org: false,
						userInfo: {
							...defaultUserInfo,
							firstName: user.firstName,
							lastName: user.lastName,
							householdMembers: user.householdMembers,
						},
						walletId: auth.account.walletId,
					},
				},
			}
		} else if (org) {
			return {
				status: 200,
				auth: {
					auth: org.walletId,
					account: {
						...defaultAccount,
						org: true,
						orgInfo: {
							name: org.name,
							creations: org.creations,
						},
						walletId: auth.account.walletId,
					},
				},
			}
		} else {
			return {
				status: 400,
				auth: null
			}
		}
	} catch (e: any) {
		if ((e.message as string).includes('not found')) {
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


const CREATE_USER_MUTATION = gql` 
	mutation registerUser($firstName: String!, $lastName: String! , $publicKey: String!) {
		registerUser(input:{firstName: $firstName,lastName: $lastName,publicKey: $publicKey,}) {
			ok,
			message,
			token
		}
	}
`;

const CREATE_ORG = gql`
	mutation CreateOrg($input: OrgInput!) {
		createOrg(input: $input) {
			walletId
			name
			creations {
				programs {
					id
				}
				surveys {
					id
				}
			}
		}
	}
`

export const tryCreateHumanAccount = async (input: SignUpData): Promise<{ status: statusType; account: AccountType | null }> => {
	console.log("IntryCreateHumanAccount");
	try {
		console.log("Insidegraphqlstuff");
		const res = await graphql.mutate(CREATE_USER_MUTATION,{
			firstName: input.firstName,
			lastName: input.lastName,
			publicKey: input.publicaddr
	})
		const data = res.data
		console.log("tokenId:" + data.registerUser.token);
		await tokenStorage(data.registerUser.token);
		if (!data) {
			console.log(res.errors)
			console.log("inerror")
			return { status: 400, account: null }
		}
		return {
			status: 200,
			account: {
				...defaultAccount,
				org: false,
				userInfo: {
					...defaultUserInfo,
					firstName: input.firstName,
					lastName: input.lastName,
				},
				walletId: input.publicaddr,
			},
		}
	} catch (e:any) {
		console.log(e)
		return { status: 500, account: null }
	}
}

export const tryGetSeedPhrase = async (password: string): Promise<{ status: statusType; seedPhrase: string | null }> => {
	return {
		status: 200,
		seedPhrase: password,
	}
}	

export const tryLogin = async (seedPhrase: string): Promise<{ status: statusType; account: AccountType | null }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return {
			status: 200,
			account: {
				...defaultAccount,
				org: false,
				userInfo: {
					...defaultUserInfo,
				},
			},
		}
}


export const tryPasswordLogin = async (password: string): Promise<{ status: statusType; account: AccountType | null }> => {
	const { status, seedPhrase } = await tryGetSeedPhrase(password)
	if (status !== 200 || !seedPhrase) {
		return {
			status,
			account: null,
		}
	}
	return await tryLogin(seedPhrase)
}


export const tryCreateOrgAccount = async (input: SignUpData): Promise<{ status: statusType, account: AccountType | null }> => {
	try {
		const res = await graphql.mutate(CREATE_ORG, {
			input: {
				name: input.name,
				password: input.password,
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
				org: true,
				orgInfo: {
					name: data.createOrg.name,
					creations: data.createOrg.creations
				},
				walletId: data.createOrg.walletId,
			},
		}
	} catch (e:any) {
		console.log(e)
		return { status: 500, account: null }
	}
}

export const tryRespondToHouseholdRequest = async (data: HouseholdRequestType, approve: boolean): Promise<{ status: statusType }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}
export const tryAddHouseholdMember = async (data: String, account: AccountType): Promise<{ status: statusType; householdMember: String }> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 , householdMember: data}
}
export const tryEditProfileInfo = async (data: UserPersonalInfo): Promise<{ status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return { status: 200 }
}

export const checkkey = async (password:string) => {

	let seedsalt = await getSeedPhrase();
	console.log("inside checkkey" + seedsalt);
	const checkpass = await hashPIN(password , seedsalt??"");
	const realpass = await loadWalletKey();
	let checkpas = "\"" + checkpass + "\"" ;
	console.log("inside checkkey"+String(checkpass));
	console.log("inside checkkey"+realpass);
	
	return String(checkpas) === realpass;
		
	}

export const passcodeCreate = async (pin: string , walletId: string , salt?: string) => {
	//const {setPIN} = useAuth()
	const secret = await secretForPIN(walletId , pin , salt)//returns object with walledId and Pin
    await storeWalletSecret(secret)
	console.log("PasscodeCreated!")
		//await setPIN(pin , walletId , salt)
	}

