import { ActivityIndicator, Image, Text, View } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import { images } from "assets/images"
import { gs } from '../../styles/globals'
import { MovingBackground } from './MovingBackground'

export const LoadingScreen = () => {
	return (
		<>
			<MovingBackground/>
			<View style={[gs.fullScreen, {marginTop: 50}]}>
				<Text style={{ fontSize: 40 }}>SWR Mobile</Text>
				<Image
					source={images['logo']}
					style={{
						width: 240,
						height: 57,
						marginVertical: 50,
					}}
				/>
				<Text style={gs.h2}>Loading...</Text>
				<ActivityIndicator size="large" />
			</View>
		</>
	)
}
