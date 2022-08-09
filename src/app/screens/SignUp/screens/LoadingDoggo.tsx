import { SWRText } from "components/SWRText"
import { View } from "react-native"
import { gs } from "styles/globals"

export const LoadingDoggo = (props: {
}) => {
	return (
		<View style={gs.fullScreen} >
			<SWRText>Initializing...</SWRText>
		</View>
	)
}