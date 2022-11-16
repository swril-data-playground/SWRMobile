import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { ProgramType } from 'types/programs'
import { examplePrograms } from './exampleData';
import { useAgent, useCredentialById } from '@aries-framework/react-hooks'

const {agent} = useAgent()

export const tryGetPrograms = async (): Promise<{ status: statusType; programs: ProgramType[] }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return {
		status: 200,
		programs: examplePrograms
	}
}

export const tryCreateProgram = async (program: ProgramType, account: AccountType): Promise<{ status: statusType, program: ProgramType}> => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	return {
		status: 200,
		program: {
			...program,
			creator: "",
			id: Math.round(Math.random() * 100000).toString()
		}
	}
}