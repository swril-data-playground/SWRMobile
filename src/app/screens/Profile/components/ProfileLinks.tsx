import { Image, StyleSheet, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { useContext } from 'react'
import { AuthContext } from 'contexts/authContext'
import { SWRButton } from 'components/SWRButton'
import { images } from 'assets/images'
import { NavContext } from 'contexts/navContext'

const ProfileLinks = () => {
	const { signOut } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	return (
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
	)
}

const styles = StyleSheet.create({
	whiteSection: {
		marginTop: 10,
		borderRadius: 10,
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
})



export default ProfileLinks
