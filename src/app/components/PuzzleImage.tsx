import { images } from "assets/images"
import { Image } from "react-native"

export const PuzzleImage = (props: {
	width: number	
}) => {
	return (
		<Image 
			source={images.puzzle} 
			style={{
				width: props.width,
				height: props.width * 0.6
			}}
		/>
	)
}