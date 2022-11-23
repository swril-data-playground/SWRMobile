import { gql } from '@apollo/client';
import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { FilterType } from 'types/filter';
import { SurveyType } from 'types/surveys';
import { graphql } from './graphql';

export const surveyFields = `
	id
	title
	category
	description
	creator
	image
	questions {
		id
		prompt
		type
		choices
		optional
	}
`

const GET_SURVEYS = gql(`
	query GetSurveys($input: FilterInput!) {
		surveys(input: $input) {
			`+surveyFields+`
		}
	}
`)


export const tryGetSurveys = async (filter: FilterType): Promise<{ status: statusType; surveys: SurveyType[] }> => {
	try {
		const res = await graphql.query(GET_SURVEYS, {
			input: filter
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


const CREATE_SURVEY = gql(`
	mutation CreateSurvey($input: SurveyInput!) {
		createSurvey(input: $input) {
			` + surveyFields + `
		}
	}
`)

export const tryCreateSurvey = async (survey: SurveyType, account: AccountType): Promise<{ status: statusType, survey: SurveyType|null}> => {
	console.log({
		title: survey.title,
		category: survey.category,
		description: survey.description,
		creatorId: account.walletId,
		image: survey.image,
		questions: survey.questions
	})
	console.log(CREATE_SURVEY)
	try {
		const res = await graphql.mutate(CREATE_SURVEY, {
			input: {
				title: survey.title,
				category: survey.category,
				description: survey.description,
				creatorId: account.walletId,
				image: survey.image,
				questions: survey.questions
			},
		})
		const data = res.data
		if (!data) {
			console.log(res.errors)
			return { status: 400, survey: null }
		}
		return {
			status: 200,
			survey: data.createSurvey
		}
	} catch (e) {
		console.log(e)
		return { status: 500, survey: null }
	}
}