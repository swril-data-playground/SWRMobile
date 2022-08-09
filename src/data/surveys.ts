import { statusType } from 'types/data'
import { SurveyType } from 'types/surveys';
import { exampleSurveys } from './exampleData';

export const tryGetSurveys = async (): Promise<{ status: statusType; surveys: SurveyType[] }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return {
		status: 200,
		surveys: exampleSurveys
	}
}
