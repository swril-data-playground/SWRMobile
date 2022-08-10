import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { gs } from 'styles/globals'
import { BackButton } from 'components/BackButton'
import { SWRText } from 'components/SWRText'
import { images } from 'assets/images'
import { ProgramsList } from './ProgramsList'
import { useContext } from 'react'
import { DataContext } from 'contexts/dataContext'

const ProgramsScreen = () => {
	const { data } = useContext(DataContext)
	const nearYouPrograms = data.programs
	const discoverPrograms = data.programs
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<View style={[styles.header, gs.screenPadding]}>
				<SWRText font={'medium'} style={gs.h1}>Programs</SWRText>
				<TouchableOpacity>
					<Image source={images['tune']}/>
				</TouchableOpacity>
			</View>
			<ScrollView style={gs.screenPadding}>
				<ProgramsList programs={nearYouPrograms} title={'Near you'}/>
				<ProgramsList programs={discoverPrograms} title={'Discover'}/>
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

export default ProgramsScreen
