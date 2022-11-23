import { GenericScroller } from "components/GenericScroller"
import { View } from "react-native"
import { DoggoScrollerData } from "./DoggoScrollerData"

export const DoggoScroller = (props: {
	textOnTop: boolean
}) => {
	return (
		<View>
			<GenericScroller imageSet={DoggoScrollerData} textOnTop={props.textOnTop}/>
		</View>
	)
}