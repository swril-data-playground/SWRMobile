import { images } from "assets/images"
import BackgroundImage from "components/BackgroundImage"
import { SWRText } from "components/SWRText"
import { TextButton } from "components/TextButton"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { ProgramType } from "types/programs"

export const HomePrograms = (props: {
	programs: ProgramType[]	
}) => {
	const { setNav } = useContext(NavContext)
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<SWRText style={{fontSize: 18}} font={'bold'}>Explore Nearby Programs</SWRText>
				<TextButton onPress={() => setNav('Programs')}>View all</TextButton>
			</View>
			<ScrollView style={styles.scroller} horizontal={true} showsHorizontalScrollIndicator={false}>
				{props.programs.map((program, i) => {
					return (
						<TouchableOpacity style={styles.program} onPress={() => setNav('Program', program)} key={i}>
							<BackgroundImage image={{uri: program.image}} style={styles.programImage}/>
							<SWRText font={'bold'} style={styles.programName}>{program.name}</SWRText>
							<SWRText style={styles.programCaption}>{program.caption}</SWRText>
							<View style={styles.arrowSection}>
								<Image source={images['long_arrow_right']}/>
							</View>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 15
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	scroller: {
		overflow: 'visible'
	},
	program: {
		height: 170,
		width: 250,
		marginVertical: 5,
		marginRight: 10,
		borderRadius: 30,
		backgroundColor: 'lightgrey'
	},
	programImage: {
		borderRadius: 30,
	},
	programName: {
		color: 'white',
		fontSize: 20,
		marginTop: 30,
		marginHorizontal: 20,
		textShadowColor: 'black',
		textShadowRadius: 2
	},
	programCaption: {
		color: 'white',
		fontSize: 15,
		marginHorizontal: 20,
		textShadowColor: 'black',
		textShadowRadius: 1
	},
	arrowSection: {
		height: 60,
		width: 100,
		backgroundColor: 'white',
		borderTopEndRadius: 30,
		position: 'absolute',
		paddingTop: 5,
		paddingRight: 5,
		bottom: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'center'
	}
})