import { images } from "assets/images"
import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"

export const ProgramsList = (props: {
	title: string,
	programs: ProgramType[]	
}) => {
	const { setNav } = useContext(NavContext)
	return (
		<View>
			<SWRText style={gs.h3}>{props.title}</SWRText>
			<View style={styles.list}>
				{props.programs.map((program, i) => {
					return (
						<TouchableOpacity key={i} style={styles.program} onPress={() => setNav('Program', program)}>
							<View style={styles.programImageContainer}>
								<Image style={gs.fillImage} source={{uri: program.image}}/>
								<SWRText style={styles.categoryPill}>{program.category}</SWRText>
							</View>
							<View style={styles.programFooter}>
								<SWRText style={gs.h6}>{program.title}</SWRText>
								<View style={styles.locationContainer}>
									<Image source={images['location']} style={styles.locationIcon}/>
									<SWRText style={gs.h7}>{program.municipality}, ON</SWRText>
								</View>
							</View>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	},
	list: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	program: {
		padding: 5,
		marginVertical: 10,
		borderRadius: 20,
		width: '45%',
		backgroundColor: 'white'
	},
	programImageContainer: {
		borderRadius: 20,
		height: 140,
		overflow: 'hidden',
		flex: 3
	},
	programFooter: {
		flex: 1,
		marginTop: 5,
		padding: 5
	},
	locationIcon: {
		height: 15,
		width: 15
	},
	locationContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 5
	},
	categoryPill: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		backgroundColor: 'blue',
		color: 'white',
		fontSize: 14,
		padding: 5,
		borderRadius: 10,
		overflow: 'hidden'
	}
})