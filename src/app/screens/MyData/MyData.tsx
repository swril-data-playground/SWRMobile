import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { images } from 'assets/images'
import { useContext } from 'react'
import { NavContext } from 'contexts/navContext'
import { MyCreations } from './components/MyCreations'
import { SWRButton } from 'components/SWRButton'

const MyDataScreen = () => {
	const { setNav } = useContext(NavContext)
	const accessPanels: {name: string, page: string, color: string}[] = [
		{name: 'Surveys', page: 'SurveyData', color: '#45C3DF'},
		{name: 'Polls', page: 'PollData', color: '#F49714'},
		{name: 'Programs', page: 'ProgramData', color: '#F75B86'},
	]

	return (
		<View style={gs.scrollParent}>
			<ScrollView contentContainerStyle={[gs.screenPadding, {alignItems: 'center'}]}>
				<Image source={images.puzzle} style={styles.puzzleImage}/>
				<SWRText style={gs.h2} font={'medium'}>My data</SWRText>
				<SWRText style={styles.subHeaderText} font={'medium'}>Who has access to my data?</SWRText>
				<ScrollView style={{overflow: 'visible'}} horizontal showsHorizontalScrollIndicator={false}	>
					{accessPanels.map((panel, i) => {
						const arrowColor = {backgroundColor: panel.color}
						return (
							<TouchableOpacity style={styles.accessPanel} key={i}
								onPress={() => setNav(panel.page)}	
							>
								<SWRText style={gs.h4}>{panel.name}</SWRText>
								<View style={[styles.arrowSection, arrowColor]}>
									<Image source={images['long_arrow_right']}/>
								</View>
							</TouchableOpacity>
						)
					})}
				</ScrollView>
				<MyCreations/>
				<SWRText style={styles.subHeaderText} font={'medium'}>My cloud</SWRText>
				<SWRButton singleUse onPress={() => setNav('UploadScreen')} style={styles.uploadButton}>
					<SWRText style={gs.h5}>Upload</SWRText>
					<Image source={images.upload} style={styles.uploadIcon}/>
				</SWRButton>
				<SWRText style={styles.subHeaderText} font={'medium'}>My Folders</SWRText>
			</ScrollView>
		</View>
	)
}
const styles = StyleSheet.create({
	puzzleImage: {
		width: 160,
		height: 100
	},
	subHeaderText: {
		marginVertical: 10,
		fontSize: 20,
		textAlign: 'left',
		width: '100%',
	},
	accessPanel: {
		backgroundColor: 'white',
		borderRadius: 25,
		marginRight: 10,
		overflow: 'visible',
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
		width: 160,
		paddingBottom: 20
	},
	arrowSection: {
		height: 40,
		width: 60,
		borderTopEndRadius: 20,
		position: 'absolute',
		paddingTop: 5,
		paddingRight: 5,
		bottom: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	uploadButton: {
		width: '100%',
		borderRadius: 10,
		alignItems: 'center'
	},
	uploadIcon: {
		height: 25,
		width: 25
	}
})


export default MyDataScreen


