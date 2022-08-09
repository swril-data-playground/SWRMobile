import { SWRText } from 'components/SWRText'
import { View } from 'react-native'
import { gs } from 'styles/globals'

const SettingsScreen = () => {
	return (
		<>
			<View style={gs.fullScreen}>
				<SWRText style={gs.titleText}>Settings</SWRText>
			</View>
		</>
	)
}

export default SettingsScreen
