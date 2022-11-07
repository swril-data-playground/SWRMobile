import { images } from "assets/images"
import Accordion, { AccordionWithImage } from "components/Accordion"
import { BackButton } from "components/BackButton"
import { SWRText } from "components/SWRText"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { accordionItemImage } from "types/accordionItem"
import { HelpData } from "./HelpData"

export const Help = () => {

	const accordionFunc = (data: accordionItemImage[]) => {
		return (
			data.map(( props: accordionItemImage ) => (
				<AccordionWithImage {...props} />      					
			))
		)
	}

	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<ScrollView style={gs.screenPadding}>
				<View style={styles.header}>
					<Image
						source={images.question_icon}
						style={styles.headerIcon}
					/>
					<SWRText style={gs.h2}>Help</SWRText>
				</View>
				<View style={gs.fullScreen}>
					{HelpData.map((props) => (
						<View>
							<SWRText style={gs.h6}>{props.title}</SWRText>
							{accordionFunc(props.data)}
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerIcon: {
		height: 40,
		width: 40,
		marginRight: 10
	}
})