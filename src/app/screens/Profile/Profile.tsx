import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { FullAvatar } from 'components/FullAvatar'
import { useContext } from 'react'
import { AuthContext } from 'contexts/authContext'
import { SWRButton } from 'components/SWRButton'
import { images } from 'assets/images'
import { NavContext } from 'contexts/navContext'
import { ToastContext } from 'contexts/toastContext'

const ProfileScreen = () => {
	const { auth, signOut } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	const { pushToast } = useContext(ToastContext)
	return (
		<View style={gs.fullScreen}>
			<View style={styles.profileContainer}>
				<View style={styles.avatarContainer}>
					<FullAvatar avatar={auth.account?.avatar} height={230}/>
				</View>
				<View style={styles.profileInfoContainer}>
					<SWRText font={'medium'} style={styles.name}>{auth.account?.firstName}</SWRText>
					<SWRText font={'medium'} style={styles.name}>{auth.account?.lastName}</SWRText>
					<SWRButton onPress={() => {
						pushToast({
							title: 'Coming Soon',
							details: 'This feature is not yet implemented',
							type: 'info'
						})
					}} style={styles.whiteSection}>
						<SWRText style={gs.h4}>Edit Profile</SWRText>
					</SWRButton>
					<SWRButton onPress={() => {}} style={styles.whiteSection}>
						<SWRText style={gs.h4}>Edit Avatar</SWRText>
					</SWRButton>
					<View style={[styles.whiteSection, {backgroundColor: 'white', padding: 15}]}>
						<SWRText font={'medium'}>Wallet ID</SWRText>
						<SWRText style={gs.h7}>{auth.account?.walletId}</SWRText>
						<SWRText font={'medium'}>Key phrase</SWRText>
						<SWRText style={gs.h7}>{auth.account?.keyPhrase}</SWRText>
					</View>
				</View>
			</View>
			<View style={styles.householdMembersContainer}>
				<SWRText font={'medium'} style={gs.h4}>Household Members</SWRText>
				<ScrollView horizontal>
					{auth.account?.householdMembers.map((member, i) => {
						return (
							<View key={i} style={styles.member}>
								<FullAvatar height={60} avatar={member.avatar}/>
								<SWRText>{member.firstName}</SWRText>
								<SWRText>{member.lastName}</SWRText>
							</View>
						)
					})}
					<TouchableOpacity style={styles.member} onPress={() => setNav('AddHouseholdMember')}>
						<Image source={images.add} style={styles.addImage}/>
						<SWRText style={[gs.h7, {textAlign: 'center'}]}>Add household member</SWRText>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<View style={styles.linksContainer}>
				<View style={styles.horizontal}>
					<SWRButton style={[styles.whiteSection, styles.linkButton, {width: '35%'}]} onPress={() => setNav('Help')}>
						<Image source={images.question_icon} style={styles.linkIcon}/>
						<SWRText style={gs.h4}>Help</SWRText>
					</SWRButton>
					<SWRButton style={[styles.whiteSection, styles.linkButton, {width: '60%'}]} onPress={() => setNav('LearnMore')}>
						<Image source={images.search_icon} style={styles.linkIcon}/>
						<SWRText style={gs.h4}>Learn more</SWRText>
					</SWRButton>
				</View>
				<SWRButton style={[styles.whiteSection, styles.linkButton, {width: '100%'}]} onPress={() => setNav('Privacy')}>
					<Image source={images.profile_sheild} style={styles.linkIcon}/>
					<SWRText style={gs.h4}>Privacy policy</SWRText>
				</SWRButton>
				<SWRButton style={[styles.whiteSection, styles.linkButton, {width: '100%'}]} onPress={signOut}>
					<SWRText style={[gs.h4, {textAlign: 'center', width: '100%'}]}>Sign out</SWRText>
				</SWRButton>
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
	member: {
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: 'white',
		width: 90,
		height: 100,
		marginRight: 10,
		alignItems: 'center'
	},
	householdMembersContainer: {
		marginTop: 15,
		width: '100%'
	},
	linksContainer: {
		marginTop: 10,
		alignItems: 'flex-start',
		width: '100%',
	},
	linkButton: {
		justifyContent: 'flex-start',
	},
	linkIcon: {
		height: 30,
		width: 30,
		marginRight: 10
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	},
	addImage: {
		margin: 8,
		height: 40,
		width: 40
	}
})



export default ProfileScreen
