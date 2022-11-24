import { PuzzleImage } from "components/PuzzleImage"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { View, Image } from "react-native"
import { gs } from "styles/globals"
import {  StyleSheet } from "react-native"
import { DoggoScroller } from "./components/DoggoScroller"
import { images } from "assets/images"

export const LoadingDoggo = (props: {
	next: () => void,
	loaded: boolean
}) => {
	return (
		<View style={gs.fullScreen} >
			<PuzzleImage width={200}/>
			{ !props.loaded ? <>
				<SWRText font={'medium'} style={styles.header}>Initializing...</SWRText>
				<DoggoScroller textOnTop={false}/>
			</> : <>
				<SWRText font={'medium'} style={styles.header}>Ready!</SWRText>
				<Image source = {images.forward_dog} style={{ width: 256, height: 256, resizeMode: 'contain', display: 'flex', paddingBottom: 10}}/>
				<SWRText style={styles.captionText}>Your unique 16 word phrase is...</SWRText>
				<View style={styles.roundedTextBox}>
					<SWRText style={styles.roundedText}>{
						'One two three four \n' +
						'five six seven eight \n' +
						'nine ten eleven twelve \n' +
						'thirteen fourteen fifteen sixteen'
					}</SWRText>
				</View>
				<SWRButton singleUse onPress={props.next} style={styles.loadedButton}>
					<SWRText font={'medium'} style={gs.h4}>Next</SWRText>
				</SWRButton>
			</>
			}
		</View>
	)

}

const styles = StyleSheet.create({
	loadedButton: {
		width: '80%',
		margin: 10
	},
	header: {
		paddingTop: 30,
		fontSize: 40,
		paddingBottom: 30,
	},
	captionText: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
		paddingTop: 30,
	},
	roundedTextBox: {
		width: '90%',
		margin: 10,
		borderRadius: 10,
		display: 'flex',
		borderWidth: 1,
		backgroundColor: 'white',
		opacity: 0.5,
		padding: 10,
		paddingBottom: 0
	},
	roundedText: {
		textAlign: 'center',
		fontSize: 17,
		marginBottom: 20,
	}
})