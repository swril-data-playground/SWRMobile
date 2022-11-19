import { View } from 'react-native'
import { gs } from 'styles/globals'
import UserProfile from './components/UserProfile'
import ProfileMembers from './components/ProfileMembers'
import ProfileLinks from './components/ProfileLinks'

const ProfileScreen = () => {
	return (
		<View style={gs.fullScreen}>
			<UserProfile/>
			<ProfileMembers/>
			<ProfileLinks/>
		</View>
	)
}

export default ProfileScreen
