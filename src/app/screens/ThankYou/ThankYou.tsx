import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet, Image } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"
import { View } from "react-native"
import { PuzzleImage } from "components/PuzzleImage"
import { images } from "assets/images"



export const ThankYou = (props: {content: any}) => {
	const element = props.content as JSX.Element
	const { setNav } = useContext(NavContext)
	return (
		<View style={[gs.fullScreen, styles.container]} >
			<View style={{alignItems: 'center'}}>
				<PuzzleImage width={200}/>
				<SWRText font={'medium'} style={gs.h1}>Thank you</SWRText>
				<View>
					{element}
				</View>
			</View>
			 
			<Image source={images.umbrella_cat} style={styles.image}/>
			<SWRButton singleUse onPress={() => setNav('Home')} style={{width: '70%'}}>
				<SWRText style={[gs.h3, {textAlign: 'center'}]}>Done</SWRText>
		 	</SWRButton>
		</View>
	)
}	

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		maxHeight: '90%',
	},
	image: {
		width: 230,
		height: 256, 
		display: 'flex',
		marginVertical: 20
	},
})