import { StyleSheet, View } from "react-native"
import { LocationFilter } from "./LocationFilter"
import { Notifications } from "./Notifications"
import { ProfileIcon } from "./ProfileIcon"

export const TopMenu = () => {
	return (
		<View style={styles.container} >
			<LocationFilter/>	
			<View style={styles.rightSection}>
				<Notifications/>
				<ProfileIcon/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 10,
		paddingHorizontal: 20,
		zIndex: 1,
	},
	rightSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
})