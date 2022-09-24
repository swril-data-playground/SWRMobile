import { AvatarIcon } from "components/AvatarIcon"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

export const ProfileIcon = () => {
	const { setNav } = useContext(NavContext)
	const { auth } = useContext(AuthContext)
	return (
		<TouchableOpacity 
			style={styles.container}
			onPress={() => setNav('Profile')}
		>
			<AvatarIcon avatar={auth.account?.avatar}/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		height: 50,
		width: 50,
	}
})