export const dataCategories = ['All', 'Sports', 'Gardening', 'Volunteering', 'Learning'] as const 
export const dataLocations = ['Kitchener', 'Cambridge', 'Waterloo', 'North Dumfries', 'Wellesley', 'Wilmot', 'Woolwich'] as const
export type CategoryType = typeof dataCategories[number]
export type LocationType = typeof dataLocations[number]

export interface FilterType {
	category: CategoryType
	locations: LocationType[]
	recent: boolean
	lastOpened: boolean
}

export const defaultFilter: FilterType = {
	category: 'All',
	locations: ['Kitchener'],
	recent: false,
	lastOpened: false
}