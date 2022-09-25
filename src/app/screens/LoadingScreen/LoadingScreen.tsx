import { ActivityIndicator, Image, Text, View } from 'react-native'
import BackgroundImage from '../../components/BackgroundImage'
import { images } from "assets/images"
import { gs } from '../../styles/globals'
import { MovingBackground } from './MovingBackground'
import { PuzzleImage } from 'components/PuzzleImage'

export const LoadingScreen = () => {
	return (
		<>
			<MovingBackground/>
			<View style={[gs.fullScreen, {paddingTop: 260 }]}>
				<PuzzleImage width={100}/>
				<Image
					source={images.data_playground_text}
					style={{
						width: 240,
						height: 27,
						marginVertical: 20,
					}}
				/>
			</View>
		</>
	)
}
