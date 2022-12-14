import { Image, StyleSheet, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { images } from 'assets/images'
import { SWRButton } from 'components/SWRButton'
import { useContext } from 'react'
import { NavContext } from 'contexts/navContext'
import { AuthContext } from 'contexts/authContext'

const CreateScreen = () => {
	const { setNav } = useContext(NavContext)
	const { auth } = useContext(AuthContext)
	const isOrg = auth.account?.org
	return (
		<View style={gs.fullScreen}>
			<Image source={images.puzzle} style={styles.puzzleImage}/>
			<View style={styles.header}>
				<SWRText font={'medium'} style={gs.h1}>Create</SWRText>
				<SWRText style={gs.h3}>Let's make something</SWRText>
			</View>
			{isOrg && <View style={styles.buttonContainer}>
				<SWRButton singleUse onPress={() => setNav('CreateSurvey')} style={styles.button}>
					<SWRText style={styles.buttonText}>Survey</SWRText>
				</SWRButton>
				<SWRButton singleUse onPress={() => {}} style={styles.button}>
					<SWRText style={styles.buttonText}>Poll</SWRText>
				</SWRButton>
				<SWRButton singleUse onPress={() => setNav('CreateProgram')} style={styles.button}>
					<SWRText style={styles.buttonText}>Program</SWRText>
				</SWRButton>
			</View>}
			{!isOrg && <View>
				<SWRText style={gs.h2}>Join an org to create content</SWRText>
			</View>}
			<Image source={images.skateboard_girl} style={styles.skaterGirlImage}/>
		</View>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: "center",
        justifyContent: "flex-start"
	},
	puzzleImage: {
		width: 160,
		height: 100
	},
	header: {
		marginBottom: 20,
		alignItems: 'center'
	},
	button: {
		height: 50,
		width: '90%',
		margin: 10,

	},
	buttonText: {
		fontSize: 25,
		width: "100%",
		textAlign: 'center'
	},
	skaterGirlImage: {
		marginTop: 10,
		marginLeft: 40,
		height: 240,
		width: 140
	}
})

export default CreateScreen
