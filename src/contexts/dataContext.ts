import { createContext } from 'react'
import { ProgramType, SurveyType } from '../types'

export type DataContextType = {
	programs: ProgramType[]
	programCache: Map<string, ProgramType[]>
	surveys: SurveyType[],
	surveyCache: Map<string, SurveyType[]>
}
export const defaultDataValue: DataContextType = {
	programs: [],
	programCache: new Map(),
	surveys: [],
	surveyCache: new Map(),
}

export const DataContext = createContext<{ data: DataContextType; setData: (newData: DataContextType) => void }>({
	data: defaultDataValue,
	setData: (newData: DataContextType) => {},
})
