import { createContext } from 'react'

export type DisplayContextType = {
	keyboardHeight: number,
}
export const defaultDisplayValue: DisplayContextType = {
	keyboardHeight: 0,
}

export const DisplayContext = createContext<{ display: DisplayContextType }>({
	display: defaultDisplayValue,
})
