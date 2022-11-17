import { gql } from '@apollo/client';
import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { FilterType } from 'types/filter';
import { SurveyType } from 'types/surveys';
import { exampleSurveys } from './exampleData';
import { client } from './graphql';


const GET_SURVEYS = gql`
	query GetSurveys($input: FilterInput!) {
		surveys(input: $input) {
			id
			title
			image
			description
			category
			creator
			questions {
				id
				prompt
				type
				choices
				optional
			}
		}
	}
`


export const tryGetSurveys = async (filter: FilterType): Promise<{ status: statusType; surveys: SurveyType[] }> => {
	try {
		const res = await client.query({
			query: GET_SURVEYS,
			variables: {
				input: filter
			},
		})
		const data = res.data
		if (!data) {
			console.log(res.errors)
			return { status: 400, surveys: [] }
		}
		return {
			status: 200,
			surveys: data.surveys
		}
	} catch (e) {
		console.log(e)
		return { status: 500, surveys: [] }
	}
}

export const tryCreateSurvey = async (survey: SurveyType, account: AccountType): Promise<{ status: statusType, survey: SurveyType}> => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	return {
		status: 200,
		survey: {
			...survey,
			creator: account.walletId,
			id: Math.round(Math.random() * 100000).toString()
		}
	}
}