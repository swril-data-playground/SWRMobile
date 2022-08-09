import { createContext } from 'react'

export type ErrorContextType = Error | null
export const defaultErrorValue = null

export const ErrorContext = createContext<{ error: ErrorContextType; setError: (newError: ErrorContextType) => void }>({
	error: defaultErrorValue,
	setError: (newError: ErrorContextType) => {},
})
