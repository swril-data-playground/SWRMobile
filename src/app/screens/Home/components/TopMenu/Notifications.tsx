import { images } from "assets/images"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"

const notifications = [

]

export const Notifications = () => {

	const notificationIcon = notifications.length ? 'notification_active' : 'notification'
	return (
		<View style={styles.container}>
			<Image 
				source={images[notificationIcon]}
				style={gs.fillImage}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: 'white',
		padding: 5,
		overflow: 'hidden'
	}
})