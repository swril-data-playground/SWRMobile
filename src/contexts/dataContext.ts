import { createContext } from 'react'
import { ProgramType, SurveyType, PollType } from '../types'

export type DataContextType = {
	programs: ProgramType[]
	programCache: Map<string, ProgramType[]>
	surveys: SurveyType[]
	surveyCache: Map<string, SurveyType[]>
	polls: PollType[]
	pollCache: Map<string, PollType[]>
}
export const defaultDataValue: DataContextType = {
	programs: [],
	programCache: new Map(),
	surveys: [],
	surveyCache: new Map(),
	polls: [],
	pollCache: new Map(),
}

export const DataContext = createContext<{ data: DataContextType; setData: (newData: DataContextType) => void, reloadData: () => Promise<void> }>({
	data: defaultDataValue,
	setData: (newData: DataContextType) => {},
	reloadData: async () => {},
})
