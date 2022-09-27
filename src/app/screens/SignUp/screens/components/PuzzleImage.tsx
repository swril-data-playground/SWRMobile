import { images } from "assets/images"
import { Image } from "react-native"

export const PuzzleImage = () => {
	return (
		<Image 
			source={images.puzzle} 
			style={{
				width: 200,
				height: 120
			}}
		/>
	)
}