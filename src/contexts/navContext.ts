import { createContext } from 'react'



export type NavContextType = {
	nav: string,
	stack: string[]
}
export const defaultNavValue: NavContextType = {
	nav: 'Home',
	stack: ['Home']
}

export const NavContext = createContext<{nav: NavContextType; setNav: (newNav: string, newNavContent?: any) => void }>({
	nav: defaultNavValue,
	setNav: (newNav: string, newNavContent: any = null) => {},
})