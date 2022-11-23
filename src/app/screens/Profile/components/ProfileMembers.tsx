import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { FullAvatar } from 'components/FullAvatar'
import { useContext } from 'react'
import { AuthContext } from 'contexts/authContext'
import { images } from 'assets/images'
import { NavContext } from 'contexts/navContext'
import { ToastContext } from 'contexts/toastContext'

const ProfileMembers = () => {
	const { auth } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	const { pushToast } = useContext(ToastContext)
	if (!auth.account) return null
	if (auth.account.org) return null
	const userInfo = auth.account.userInfo
	return (
		<View style={styles.householdMembersContainer}>
			<SWRText font={'medium'} style={gs.h4}>Household Members</SWRText>
			<ScrollView horizontal>
				{userInfo.householdMembers.map((member, i) => {
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
	)
}

const styles = StyleSheet.create({
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
	addImage: {
		margin: 8,
		height: 40,
		width: 40
	}
})



export default ProfileMembers
