import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRText } from "components/SWRText"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { gs } from "styles/globals"

export const Privacy = () => {
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding/>
			<ScrollView style={gs.screenPadding}>
				<View style={styles.header}>
					<Image
						source={images.profile_sheild}
						style={styles.headerIcon}
					/>
					<SWRText style={gs.h2}>Privacy policy</SWRText>
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