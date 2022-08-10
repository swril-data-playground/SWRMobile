import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { View } from "react-native"
import { gs } from "styles/globals"

export const LoadingDoggo = (props: {
	next: () => void,
	loaded: boolean
}) => {
	return (
		<View style={gs.fullScreen} >
			<SWRText>Initializing...</SWRText>
			{props.loaded && <>
				<SWRText>Loaded</SWRText>
				<SWRButton onPress={props.next}><SWRText>Next</SWRText></SWRButton>
			</>}
		</View>
	)
}