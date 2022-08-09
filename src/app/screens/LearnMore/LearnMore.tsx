import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRText } from "components/SWRText"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { gs } from "styles/globals"

export const LearnMore = () => {
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign={true} screenPadding={true}/>
			<ScrollView style={gs.screenPadding}>
				<View style={styles.header}>
					<Image
						source={images.search_icon}
						style={styles.headerIcon}
					/>
					<SWRText style={gs.h2}>Learn More</SWRText>
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