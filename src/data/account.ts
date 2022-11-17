import { AuthContextType } from 'contexts/authContext'
import { SignUpData } from 'screens/SignUp/SignUpFlow';
import { AccountType } from 'types/account';
import { statusType } from 'types/data';
import { HouseholdRequestType } from 'types/householdRequest';
import { exampleAccount } from './exampleData';
import {AgentInit} from 'src/agentdec/agentaction'
import { useAgent } from '@aries-framework/react-hooks'
import { useAuth } from '../contexts/auth'
import { hashPIN } from '/home/narukirito/SWRMobileAries/src/utils/crypto'
import { getSeedPhrase , loadWalletKey } from 'src/app/services/keychain';



export const checkkey = async (password:string) => {

let seedsalt = await getSeedPhrase();
const checkpass = await hashPIN(password , seedsalt);
const realpass = await loadWalletKey();

return checkpass === realpass?.key
	
}

export const agentInitialization = async(walletId: string , name: string , key :string) =>{

	const { setAgent } = useAgent()
	const agent = AgentInit.build(walletId , name , key);
	setAgent(agent);
}

export const passcodeCreate = async (pin: string , walletId: string , salt?: string) => {
	const {setPIN} = useAuth()
	try {
	  await setPIN(pin , walletId , salt)
	}catch (e){
		//fill in
	}
}

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