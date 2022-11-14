import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { SurveyType } from 'types/surveys';
import { exampleSurveys } from './exampleData';
import { useAgent, useCredentialById } from '@aries-framework/react-hooks'

const {agent} = useAgent()

export const tryGetSurveys = async (): Promise<{ status: statusType; surveys: SurveyType[] }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return {
		status: 200,
		surveys: exampleSurveys
	}
}

export const tryCreateSurvey = async (survey: SurveyType, account: AccountType): Promise<{ status: statusType, survey: SurveyType}> => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	return {
		status: 200,
		survey: {
			...survey,
			creator: agent.walletId,
			id: Math.round(Math.random() * 100000).toString()
		}
	}
}