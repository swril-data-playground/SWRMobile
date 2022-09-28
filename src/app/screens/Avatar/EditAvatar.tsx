import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { gs } from 'styles/globals'
import { SWRText } from 'components/SWRText'
import { FullAvatar } from 'components/FullAvatar'
import { useContext, useState } from 'react'
import { AuthContext } from 'contexts/authContext'
import { SWRButton } from 'components/SWRButton'
import { images } from 'assets/images'
import { NavContext } from 'contexts/navContext'
import { BackButton } from 'components/BackButton'
import { SWRTextInput } from 'components/inputs/SWRTextInput'
import { SWRSelectInput } from 'components/inputs/SWRSelectInput'
import { colors } from 'styles/colors'
import { AvatarM, AvatarF } from 'components/AvatarModel'
const { width: WIDTH } = Dimensions.get('window')
export const EditAvatar = () => {
	const { auth } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)

	const [isGenderMale, seIsGenderMale] = useState(true)
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding />
			<ScrollView style={gs.screenPadding}>
				<View style={styles.headerSectionStyle}>
					<SWRText style={gs.h3}>Edit your Avatar</SWRText>
				</View>
				<SWRText style={styles.headerSubTextDesign}> You can give your Avatar different glasses,heads, bodies and accessories.Mix it up!</SWRText>

				<View style={styles.avatarContainer}>
					<View
						style={{
							height: 300,
							width: WIDTH,
						}}
					>
						{isGenderMale ? <AvatarM /> : <AvatarF />}
					</View>
					{/* <FullAvatar avatar={auth.account?.avatar} height={210} /> */}
				</View>
				<View style={{ marginLeft: 'auto', marginTop: -40 }}>
					<SWRButton
						style={styles.randomizeIcon}
						onPress={() => {
							seIsGenderMale(!isGenderMale)
						}}
					>
						<Image source={images.randomize_icon} style={styles.randomizeIconStyle} />
					</SWRButton>
				</View>

				<View style={styles.glassMediumContainerDesign}>
					<SWRText style={gs.h6}> Glasses</SWRText>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	headerIcon: {
		height: 40,
		width: 40,
		marginRight: 10,
	},

	avatarContainer: {
		alignSelf: 'center',
		padding: 10,
		backgroundColor: 'transparent',
		borderRadius: 10,
		flex: 1,
		justifyContent: 'center',
	},

	containerStyle: {
		marginTop: 10,
		flex: 1,
		marginLeft: 6,
	},
	containerStyleGradeAndPostal: {
		marginTop: 10,
		flex: 1,
		flexDirection: 'row',
	},
	headerSectionStyle: {
		alignSelf: 'center',
		alignItems: 'center',
	},
	headerSubTextDesign: {
		textAlign: 'center',
		fontSize: 13,
	},

	randomizeIconStyle: {
		height: 50,
		width: 50,
	},

	randomizeIcon: {
		backgroundColor: 'transparent',
	},

	glassMediumContainerDesign: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})
