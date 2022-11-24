import { gql } from '@apollo/client';
import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { FilterType } from 'types/filter';
import { ProgramType } from 'types/programs'
import { graphql } from './graphql';

export const programFields = `
	id
	title
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
`

const GET_PROGRAMS = gql(`
	query GetPrograms($input: FilterInput!) {
		programs(input: $input) {
			`+programFields+`
		}
	}
`)


export const tryGetPrograms = async (filter: FilterType): Promise<{ status: statusType; programs: ProgramType[] }> => {
	try {
		const res = await graphql.query(GET_PROGRAMS, {
			input: filter
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

const CREATE_PROGRAM = gql(`
	mutation CreateProgram($input: ProgramInput!) {
		createProgram(input: $input) {
			` + programFields + `
		}
	}
`)

export const tryCreateProgram = async (program: ProgramType, account: AccountType): Promise<{ status: statusType, program: ProgramType|null}> => {
	console.log('date', )
	console.log('time1', program.startTime, new Date(program.startTime).toLocaleTimeString())
	console.log('time2', program.endTime, new Date(program.endTime).toLocaleTimeString())
	try {
		const res = await graphql.mutate(CREATE_PROGRAM, {
			input: {
				title: program.title,
				creatorId: account.walletId,
				image: program.image,
				description: program.description,
				category: program.category,
				municipality: program.municipality,
				address: program.address,
				date: new Date(program.date).toISOString().split("T")[0],
				startTime: new Date(program.startTime).toLocaleTimeString(),
				endTime: new Date(program.endTime).toLocaleTimeString(),
				repeat: program.repeat,
				questions: program.questions
			},
		})
		const data = res.data
		if (!data) {
			console.log(res.errors)
			return { status: 400, program: null }
		}
		return {
			status: 200,
			program: data.createProgram
		}
	} catch (e) {
		console.error(e)
		return { status: 500, program: null }
	}
}

export const trySignUpForProgram = async (program: ProgramType, account: AccountType): Promise<{ status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	return {
		status: 200
	}
}