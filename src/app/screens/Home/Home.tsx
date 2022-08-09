import {  ScrollView, View } from 'react-native'
import { gs } from 'styles/globals'
import { Tabs } from 'src/app/navigation'
import { TopMenu } from './components/TopMenu'
import { HomeHeader } from './components/HomeHeader'
import { SearchBar } from './components/SearchBar'
import { CategoryFilter } from './components/CategoryFilter'
import { HomePrograms } from './components/HomePrograms'
import { useContext, useState } from 'react'
import { ProgramType } from 'types/programs'
import { DataContext } from 'contexts/dataContext'
import { filterPrograms, filterSurveys } from 'utils/filter'
import { defaultFilter, FilterType } from 'types/filter'
import { HomeSurveys } from './components/HomeSurveys'
import { SurveyType } from 'types/surveys'

const HomeScreen = () => {
	const { data } = useContext(DataContext)
	const [filter, setFilter] = useState<FilterType>(defaultFilter)
	const [filteredPrograms, setFilteredPrograms] = useState<ProgramType[]|null>(null)
	const [filteredSurveys, setFilteredSurveys] = useState<SurveyType[]|null>(null)

	if (filteredPrograms===null && filteredSurveys===null) {
		setFilteredPrograms(filterPrograms(data.programs, filter))
		setFilteredSurveys(filterSurveys(data.surveys, filter))
	}
	const refilter = (newFilter: FilterType) => {
		setFilter(newFilter)
		setFilteredPrograms(filterPrograms(data.programs, newFilter))
		setFilteredSurveys(filterSurveys(data.surveys, newFilter))
	}
	return (
		<View style={gs.scrollParent}>
			<TopMenu/>
			<ScrollView contentContainerStyle={[gs.screenPadding]} >
				<HomeHeader/>
				<SearchBar/>
				<CategoryFilter filter={filter} setFilter={refilter}/>
				<HomePrograms programs={filteredPrograms??[]} />
				<HomeSurveys surveys={filteredSurveys??[]} />
			</ScrollView>
		</View>
	)
}



export default HomeScreen
