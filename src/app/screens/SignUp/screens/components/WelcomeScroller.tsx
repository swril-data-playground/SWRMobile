import { GenericScroller } from "components/GenericScroller"
import { View} from "react-native"
import { WelcomeScrollerData } from "./WelcomeScrollerData"

export const WelcomeScroller = ({textOnTop=true}) => {
	return (
		<View>
			<GenericScroller imageSet={WelcomeScrollerData} textOnTop={textOnTop}/>
		</View>
	)
}