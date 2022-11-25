import { useContext } from 'react'
import { View } from 'react-native'
import { NavContext } from 'contexts/navContext'
import { min1NavItem } from './NavItem'
import { min1Array } from 'types/array'
import { listIncludes } from 'utils/typelessIncludes'
import { tabNames } from './tabs'
import { DisplayContext } from 'contexts/displayContext'

export interface NavContainerType extends JSX.Element {
	props: {
		children: min1NavItem
	}
}

export type min1NavContainer = min1Array<NavContainerType> | NavContainerType

export const NavContainer = (props: NavContainerType['props']): JSX.Element => {
	const { nav } = useContext(NavContext)
	const { display: screenDisplay } = useContext(DisplayContext)
	const navItems = !Array.isArray(props.children) ? [props.children] : props.children
	const navNames: string[] = []
	let navFound = nav === undefined
	navItems.forEach((item, i) => {
		if (!item) return;
		const name = item.props.name
		if (name == undefined) throw Error('NavContainer children must have name')
		if (navNames.includes(name)) throw Error('NavContainer children must have a unique name')
		navNames.push(name)
		if (nav == null || nav.nav === name) navFound = true
	})
	if (!navFound) throw Error('Page ' + nav?.nav + ' not found')
	return (
		<>
			{navItems.map((item, i) => {
				if (!item) return;
				const displayed =  item.props.name === nav?.nav || (nav === undefined && i === 0)
				const display = displayed ? 'flex' : 'none'
				if (item.props.component.props.content !== undefined && !displayed) return
				if (!item.props.persistent && !displayed) return
				const paddingBottom = listIncludes(tabNames, item.props.name) && screenDisplay.keyboardHeight==0 ? 80 : 0
				return (
					<View
						key={i}
						style={{
							paddingTop: 50,
							display: display,
							paddingBottom,
							marginBottom: screenDisplay.keyboardHeight
						}}
					>
						{item.props.component}
					</View>
				)
			})}
		</>
	)
}