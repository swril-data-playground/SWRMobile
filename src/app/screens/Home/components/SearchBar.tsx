import { images } from "assets/images"
import { useState } from "react"
import { Image, StyleSheet, TextInput, View } from "react-native"

export const SearchBar = () => {
	const [input, setInput] = useState('')
	return (
		<View style={styles.container}>
			<Image source={images['search']} style={styles.icon} />
			<TextInput style={styles.textInput} placeholder="Search Community Program, Survey, etc" onChangeText={setInput}/>
			<Image source={images['mic']} style={styles.icon} />
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		marginVertical: 15
	}, 
	textInput: {
		height: 50,
		fontSize: 12,
		textAlign: 'left',
		width: '80%'
	},
	icon: {
		marginVertical: 20,
		height: 25,
		width: 25
	}
})