import { View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'

const MyDataScreen = () => {
	return (
		<View style={gs.fullScreen}>
			<SWRText style={gs.titleText}>My data</SWRText>
		</View>
	)
}

export default MyDataScreen
