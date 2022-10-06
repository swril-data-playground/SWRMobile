import { images } from "assets/images"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"

const notifications = [

]

export const Notifications = () => {
	const notificationIcon = notifications.length ? 'notification_active' : 'notification'
	const { setNav } = useContext(NavContext)
	return (
		<TouchableOpacity style={styles.container} onPress={() => setNav('AllToasts')}>
			<Image 
				source={images[notificationIcon]}
				style={gs.fillImage}
			/>
		</TouchableOpacity>
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