import { images } from "assets/images"
import Accordion from "components/Accordion"
import { accordionData, accordionTitle } from "screens/LearnMore/AccordionData"
import { BackButton } from "components/BackButton"
import { SWRText } from "components/SWRText"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { accordionItem } from "types/accordionItem"

export const LearnMore = () => {

	const accordionFunc = (data: accordionItem[]) => {
		return (
			data.map(( props: accordionItem ) => (
				<Accordion {...props} />      					
			))
		)
	}

	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<ScrollView style={gs.screenPadding}>
				<View style={styles.header}>
					<View style={{flexDirection: 'row'}}>
						<Image
							source={images.search_icon}
							style={styles.headerIcon}
						/>
						<SWRText style={gs.h2}>Learn More</SWRText>
					</View>
					<View style={gs.fullScreen}>
						<SWRText style={gs.h5}>{accordionTitle}</SWRText>
							{accordionData.map((props) => (
								<View>
									<SWRText style={gs.h6}>{props.title}</SWRText>
									{accordionFunc(props.data)}
								</View>
							))}
    				</View>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerIcon: {
		height: 40,
		width: 40,
		marginRight: 10
	}
})