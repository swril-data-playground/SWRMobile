import { StyleSheet, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { FullAvatar } from 'components/FullAvatar'
import { useContext } from 'react'
import { AuthContext } from 'contexts/authContext'
import { SWRButton } from 'components/SWRButton'
import { NavContext } from 'contexts/navContext'

const UserProfile = () => {
	const { auth } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	if (!auth.account) return null
	if (auth.account.org) return null
	const userInfo = auth.account.userInfo
	return (
		<View style={styles.profileContainer}>
			<View style={styles.avatarContainer}>
				<FullAvatar avatar={userInfo.avatar} height={230}/>
			</View>
			<View style={styles.profileInfoContainer}>
				<SWRText font={'medium'} style={styles.name}>{userInfo.firstName}</SWRText>
				<SWRText font={'medium'} style={styles.name}>{userInfo.lastName}</SWRText>
				<SWRButton singleUse onPress={() => setNav('EditProfile')} style={styles.whiteSection}>
					<SWRText style={gs.h4}>Edit Profile</SWRText>
				</SWRButton>
				<SWRButton onPress={() => {}} style={styles.whiteSection}>
					<SWRText style={gs.h4}>Edit Avatar</SWRText>
				</SWRButton>
				<View style={[styles.whiteSection, {backgroundColor: 'white', padding: 15}]}>
					<SWRText font={'medium'}>Wallet ID</SWRText>
					<SWRText style={gs.h7}>{auth.account.walletId}</SWRText>
					<SWRText font={'medium'}>Key phrase</SWRText>
					<SWRText style={gs.h7}>{auth.account?.keyPhrase}</SWRText>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	profileContainer: {
		flexDirection: 'row'
	},
	avatarContainer: {
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		flex: 3,
		marginRight: 5,
		justifyContent: 'center'
	},
	profileInfoContainer: {
		flex: 6,
		marginLeft: 5
	},
	name: {
		fontSize: 25
	},
	whiteSection: {
		marginTop: 10,
		borderRadius: 10,
	},
})



export default UserProfile
