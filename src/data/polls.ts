import { gql } from '@apollo/client';
import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { FilterType } from 'types/filter';
import { PollType } from 'types/polls';
import { examplePolls } from './exampleData';
import { client } from './graphql';

const GET_POLLS = gql`
	query GetPolls($input: FilterInput!) {
		polls(input: $input) {
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


export const tryGetPolls = async (filter: FilterType): Promise<{ status: statusType; polls: PollType[] }> => {
	try {
		const res = await client.query({
			query: GET_POLLS,
			variables: {
				input: filter
			},
		})
		const data = res.data
		if (!data) {
			console.log(res.errors)
			return { status: 400, polls: [] }
		}
		return {
			status: 200,
			polls: data.polls
		}
	} catch (e) {
		console.log(e)
		return { status: 500, polls: [] }
	}
}

export const tryCreatePoll = async (poll: PollType, account: AccountType): Promise<{ status: statusType, poll: PollType}> => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	return {
		status: 200,
		poll: {
			...poll,
			creator: account.walletId,
			id: Math.round(Math.random() * 100000).toString()
		}
	}
}