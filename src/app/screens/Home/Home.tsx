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
import { filterPrograms, filterSurveys, filterPolls } from 'utils/filter'
import { defaultFilter, FilterType } from 'types/filter'
import { HomeSurveys } from './components/HomeSurveys'
import { SurveyType } from 'types/surveys'
import { HomePolls } from './components/HomePolls'
import { PollType } from 'types/polls'

const HomeScreen = () => {
	const { data } = useContext(DataContext)
	const [filter, setFilter] = useState<FilterType>(defaultFilter)
	const [filteredPrograms, setFilteredPrograms] = useState<ProgramType[]|null>(null)
	const [filteredSurveys, setFilteredSurveys] = useState<SurveyType[]|null>(null)
	const [filteredPolls, setFilteredPolls] = useState<PollType[]|null>(null)

	if (filteredPrograms===null && filteredSurveys===null && filteredPolls===null) {
		setFilteredPrograms(filterPrograms(data.programs, filter))
		setFilteredSurveys(filterSurveys(data.surveys, filter))
		setFilteredPolls(filterPolls(data.polls, filter))
	}
	const refilter = (newFilter: FilterType) => {
		setFilter(newFilter)
		setFilteredPrograms(filterPrograms(data.programs, newFilter))
		setFilteredSurveys(filterSurveys(data.surveys, newFilter))
		setFilteredPolls(filterPolls(data.polls, filter))
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
				<HomePolls polls={filteredPolls??[]} />
			</ScrollView>
		</View>
	)
}



export default HomeScreen
