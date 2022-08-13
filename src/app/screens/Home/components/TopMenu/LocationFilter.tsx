import { images } from "assets/images"
import { SWRText } from "components/SWRText"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { municipalities } from "types/filter"

export const LocationFilter = () => {
	const location = municipalities[0]
	return (
		<View style={styles.container}>
			<Image 
				source={images['location_line']}
				style={styles.locationIcon}
			/>
			<SWRText style={{fontSize: 17}}>{location}</SWRText>
			<Image 
				source={images['expand']}
				style={styles.arrowIcon}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 20,
		marginRight: 20
	},
	locationIcon: {
		height: 30,
		width: 30
	},
	arrowIcon: {
		height: 20,
		width: 20
	}
})