import { BackButton } from "components/BackButton"
import { SWRText } from "components/SWRText"
import { ScrollView, View } from "react-native"
import { gs } from "styles/globals"

export const PollData = () => {
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<SWRText style={[gs.h1, {textAlign: 'center'}]}>Poll Data</SWRText>
			<ScrollView style={gs.screenPadding}>
				
			</ScrollView>
		</View>
	)
}