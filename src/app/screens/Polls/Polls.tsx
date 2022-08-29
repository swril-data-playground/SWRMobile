import { ScrollView, StyleSheet, View } from 'react-native'
import { gs } from 'styles/globals'
import { BackButton } from 'components/BackButton'
import { SWRText } from 'components/SWRText'
import { PollsList } from './PollsList'
import { useContext } from 'react'
import { DataContext } from 'contexts/dataContext'
import { FilterButtonModal } from 'components/FilterButtonModal'

const PollsScreen = () => {
	const { data } = useContext(DataContext)
	const yourPolls = data.polls
	const discoverPolls = data.polls
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<View style={[styles.header, gs.screenPadding]}>
				<SWRText font={'medium'} style={gs.h1}>Play a Part</SWRText>
				<FilterButtonModal	/>
			</View>
			<ScrollView style={gs.screenPadding}>
				<PollsList polls={yourPolls} title={'Your Organizations'}/>
				<PollsList polls={discoverPolls} title={'Discover'}/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}
})

export default PollsScreen