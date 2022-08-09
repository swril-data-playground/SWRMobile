import { AuthContextType } from 'contexts/authContext'
import { exampleAccount } from './exampleData';

export const tryGetAuth = async (): Promise<{ status: 200 | 404 | 400; auth: AuthContextType }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return {
		status: 200,
		auth: {
			auth: '',
			account: exampleAccount
		}
	}
}