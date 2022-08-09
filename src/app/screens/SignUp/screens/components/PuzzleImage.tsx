import { images } from "assets/images"
import { Image } from "react-native"

export const PuzzleImage = () => {
	return (
		<Image 
			source={images.puzzle} 
			style={{
				width: 240,
				height: 120
			}}
		/>
	)
}