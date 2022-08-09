import { statusType } from 'types/data'
import { ProgramType } from 'types/programs'
import { examplePrograms } from './exampleData';

export const tryGetPrograms = async (): Promise<{ status: statusType; programs: ProgramType[] }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return {
		status: 200,
		programs: examplePrograms
	}
}
