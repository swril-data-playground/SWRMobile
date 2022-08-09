import { View } from 'react-native'
import { gs } from 'styles/globals'
import { useContext } from 'react'
import { NavContext } from 'contexts/navContext'
import { BackButton } from 'components/BackButton'
import { SWRText } from 'components/SWRText'

const SurveysScreen = () => {
	const { setNav } = useContext(NavContext)
	return (
		<View style={gs.fullScreen}>
			<BackButton/>
			<SWRText style={gs.titleText}>Surveys</SWRText>
		</View>
	)
}

export default SurveysScreen
