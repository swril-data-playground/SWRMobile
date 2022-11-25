import { createContext } from 'react'



export type NavContextType = {
	nav: string,
	stack: string[]
} | null
export const defaultNavValue: NavContextType = {
	nav: 'Home',
	stack: ['Home']
}

export const NavContext = createContext<{
	nav: NavContextType; 
	setNav: (newNav: string, newNavContent?: any) => void 
	setStack: (newStack: string[], newNavContent: any) => void
}>({
	nav: defaultNavValue,
	setNav: (newNav: string, newNavContent: any = null) => {},
	setStack: (newStack: string[], newNavContent: any = null) => {},
})