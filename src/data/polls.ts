import { AccountType } from 'types/account';
import { statusType } from 'types/data'
import { PollType } from 'types/polls';
import { examplePolls } from './exampleData';

export const tryGetPolls = async (): Promise<{ status: statusType; polls: PollType[] }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return {
		status: 200,
		polls: examplePolls
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