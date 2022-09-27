export const dataCategories = ['All', 'Sports', 'Gardening', 'Volunteering', 'Learning'] as const 
export const municipalities = ['Kitchener', 'Cambridge', 'Waterloo', 'North Dumfries', 'Wellesley', 'Wilmot', 'Woolwich'] as const
export const genderDataCategories =['-Select-','Male','Female','Other'] as const
export const religionDataCategories =['-Select-','Christian','Sikhs','Hindus','Jains'] as const

export type CategoryType = typeof dataCategories[number]
export type MunicipalityType = typeof municipalities[number]
export type CategoryTypeGender =typeof genderDataCategories[number]
export type CategoryTypeReligion=typeof religionDataCategories[number]

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