export const dataCategories = ['All', 'Sports', 'Gardening', 'Volunteering', 'Learning'] as const 
export const municipalities = ['Kitchener', 'Cambridge', 'Waterloo', 'North Dumfries', 'Wellesley', 'Wilmot', 'Woolwich'] as const
export type CategoryType = typeof dataCategories[number]
export type MunicipalityType = typeof municipalities[number]

export interface FilterType {
	category: CategoryType
	municipality: MunicipalityType
	sort: {
		recent: boolean
		// lastOpened: boolean - not implemented
		nameAZ: boolean
		nameZA: boolean
	}
}

export const defaultFilter: FilterType = {
	category: 'All',
	municipality: 'Kitchener',
	sort: {
		recent: false,
		nameAZ: false,
		nameZA: false,
	}
}