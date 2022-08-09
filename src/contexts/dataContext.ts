import { createContext } from 'react'
import { ProgramType, SurveyType } from '../types'

export type DataContextType = {
	programs: ProgramType[]
	surveys: SurveyType[]
}
export const defaultDataValue: DataContextType = {
	programs: [],
	surveys: []
}

export const DataContext = createContext<{ data: DataContextType; setData: (newData: DataContextType) => void }>({
	data: defaultDataValue,
	setData: (newData: DataContextType) => {},
})
