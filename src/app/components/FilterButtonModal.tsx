import { images } from "assets/images"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { gs } from "styles/globals"

export const FilterButtonModal = () => {
	return (
		<TouchableOpacity style={styles.button}>
			<Image style={gs.fillImage} source={images['tune']}/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		height: 40,
		width: 40
	}
})	