import { min1Array } from 'types/array'

export interface NavItemType extends JSX.Element {
	props: {
		name: string
		component: JSX.Element
		persistent?: boolean
	}
}

export type min1NavItem = min1Array<NavItemType|null> | NavItemType|null

export const NavItem = (props: NavItemType['props']): NavItemType => {
	return <></>
}
