import { Image, StyleSheet, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { images } from 'assets/images'
import { SWRButton } from 'components/SWRButton'

const CreateScreen = () => {
	return (
		<View style={gs.fullScreen}>
			<Image source={images.puzzle} style={styles.puzzleImage}/>
			<View style={styles.header}>
				<SWRText font={'medium'} style={gs.titleText}>Create</SWRText>
				<SWRText style={gs.mediumText}>Let's make something</SWRText>
			</View>
			<SWRButton onPress={() => {}} style={styles.button}>
				<SWRText style={styles.buttonText}>Survey</SWRText>
			</SWRButton>
			<SWRButton onPress={() => {}} style={styles.button}>
				<SWRText style={styles.buttonText}>Poll</SWRText>
			</SWRButton>
			<SWRButton onPress={() => {}} style={styles.button}>
				<SWRText style={styles.buttonText}>Program</SWRText>
			</SWRButton>
			<Image source={images.skateboard_girl} style={styles.skaterGirlImage}/>
		</View>
	)
}

const styles = StyleSheet.create({
	puzzleImage: {
		width: 200,
		height: 100
	},
	header: {
		marginBottom: 20,
		alignItems: 'center'
	},
	button: {
		height: 50,
		width: '90%',
		margin: 10
	},
	buttonText: {
		fontSize: 25
	},
	skaterGirlImage: {
		marginTop: 10,
		height: 240,
		width: 100
	}
})

export default CreateScreen
