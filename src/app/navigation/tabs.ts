import { imageName } from "assets/images"
export const tabNames = ['Home','Create','Data','Profile'] as const
export type tabName = typeof tabNames[number]

export const tabItems: {icon: imageName, selectedIcon: imageName, nav: tabName}[] = [
	{icon: 'home', selectedIcon: 'home_selected', nav: 'Home'},
	{icon: 'create', selectedIcon: 'create_selected', nav: 'Create'},
	{icon: 'data', selectedIcon: 'data_selected', nav: 'Data'},
	{icon: 'profile', selectedIcon: 'profile_selected', nav: 'Profile'},
]