import { createContext } from 'react'
import { AccountType } from '../types'

export type AuthContextType = {
	auth: string
	account: AccountType | null
}
export const defaultAuthValue: AuthContextType = {
	auth: '',
	account: null,
}

export const AuthContext = createContext<{ auth: AuthContextType; setAuth: (newAuth: AuthContextType) => void }>({
	auth: defaultAuthValue,
	setAuth: (newAuth: AuthContextType) => {},
})
