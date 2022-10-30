import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet, Image } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"
import { TextButton } from "components/TextButton"
import { View } from "react-native"
import { PuzzleImage } from "../../../components/PuzzleImage"
import { images } from "assets/images"

export const ThankYou = (props: {
	program: ProgramType
}) => {
	const { setNav } = useContext(NavContext)
	const program = props.program as ProgramType
	return (
		<View style={[gs.fullScreen, styles.container]} >
			<View>
				<PuzzleImage width={200}/>
				<SWRText font={'medium'} style={gs.h1}>Thank you</SWRText>
				<SWRText font={'medium'} style={gs.h3}>For signing up to</SWRText>
				<SWRText font={'medium'} style={[gs.h3, {color: '#234F68', textAlign:'center'} ]}>{program.title}</SWRText>
			</View>
			
			<Image source={images.umbrella_cat} style={styles.image}/>
			<SWRButton onPress={() => setNav('Home')} style={{backgroundColor: 'lightgrey', width: '70%'}}>
				<SWRText style={[gs.h3, {textAlign: 'center'}]}>Done</SWRText>
		 	</SWRButton>
		</View>
	)
}	

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		maxHeight: '90%',
	},
	image: {
		width: '70%',
		height: 256, 
		display: 'flex'
	},
})