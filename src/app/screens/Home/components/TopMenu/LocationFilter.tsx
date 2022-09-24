import { images } from "assets/images"
import { SWRText } from "components/SWRText"
import { useState } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { municipalities } from "types/filter"

export const LocationFilter = () => {
	const location = municipalities[0]
	const [dropDownOpen, setDropDownState] = useState(false)
	const dropDownDisplay = dropDownOpen? 'flex':'none'
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={() => setDropDownState(!dropDownOpen)}>
				<Image 
					source={images['location_line']}
					style={styles.locationIcon}
				/>
				<SWRText style={{fontSize: 17}}>{location}</SWRText>
				<Image 
					source={images['expand']}
					style={styles.arrowIcon}
				/>
			</TouchableOpacity>
			<View style={[styles.dropdown, {display: dropDownDisplay}]}>
				{municipalities.map((municipality, i) => {
					return (
						<View style={styles.dropDownItem}>
							<SWRText>{municipality}</SWRText>
						</View>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		height: 50,
		padding: 10,
		borderRadius: 20,
		marginRight: 20,
	},
	locationIcon: {
		height: 30,
		width: 30
	},
	arrowIcon: {
		height: 20,
		width: 20
	},
	dropdown: {
		position: 'absolute',
		top: 50,
	},
	dropDownItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		height: 50,
		padding: 10,
		borderRadius: 20,
		marginRight: 20,
	}
})