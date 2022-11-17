import { gql } from '@apollo/client';
import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { FilterType } from 'types/filter';
import { ProgramType } from 'types/programs'
import { examplePrograms } from './exampleData';
import { client } from './graphql';

const GET_PROGRAMS = gql`
	query GetPrograms($input: FilterInput!) {
		programs(input: $input) {
			id
			title
			caption
			image
			description
			category
			municipality
			address
			date
			startTime
			endTime
			repeat
			attendees {
				firstName
				lastName
				avatar {
					male	
				}
			}
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


export const tryGetPrograms = async (filter: FilterType): Promise<{ status: statusType; programs: ProgramType[] }> => {
	try {
		const res = await client.query({
			query: GET_PROGRAMS,
			variables: {
				input: filter
			},
		})
		const data = res.data
		if (!data) {
			console.log(res.errors)
			return { status: 400, programs: [] }
		}
		return {
			status: 200,
			programs: data.programs
		}
	} catch (e) {
		console.log(e)
		return { status: 500, programs: [] }
	}
}

export const tryCreateProgram = async (program: ProgramType, account: AccountType): Promise<{ status: statusType, program: ProgramType}> => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	return {
		status: 200,
		program: {
			...program,
			creator: account.walletId,
			id: Math.round(Math.random() * 100000).toString()
		}
	}
}

export const trySignUpForProgram = async (program: ProgramType, account: AccountType): Promise<{ status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	return {
		status: 200
	}
}