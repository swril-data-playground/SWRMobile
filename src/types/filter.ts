export const dataCategories = ['All', 'Sports', 'Gardening', 'Volunteering', 'Learning'] as const 
export const municipalities = ['Kitchener', 'Cambridge', 'Waterloo', 'North Dumfries', 'Wellesley', 'Wilmot', 'Woolwich'] as const
export type CategoryType = typeof dataCategories[number]
export type MunicipalityType = typeof municipalities[number]

export interface FilterType {
	category: CategoryType
	municipalities: MunicipalityType[]
	recent: boolean
	lastOpened: boolean
}

export const defaultFilter: FilterType = {
	category: 'All',
	municipalities: ['Kitchener'],
	recent: false,
	lastOpened: false
}