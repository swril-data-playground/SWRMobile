import { AvatarIcon } from "components/AvatarIcon"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

export const ProfileIcon = () => {
	const { setNav } = useContext(NavContext)
	const { auth } = useContext(AuthContext)
	if (!auth.account) return null
	const isOrg = auth.account.org
	const icon = isOrg ? null : <AvatarIcon avatar={auth.account?.userInfo.avatar}/>
	return (
		<TouchableOpacity 
			style={styles.container}
			onPress={() => setNav('Profile')}
		>
			{icon}
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