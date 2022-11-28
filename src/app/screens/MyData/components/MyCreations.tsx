import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { TextButton } from "components/TextButton"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"
import { mapCreationObjectToList } from "utils/creations"

export const MyCreations = () => {
	const { auth } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	const isOrg = auth.account?.org
	const creationList = auth.account?.org? mapCreationObjectToList(auth.account.orgInfo.creations): []
	if (!isOrg) return null
	return (
		<>
			<View style={[gs.screenPadding, styles.subHeader]}>
				<SWRText style={styles.subHeaderText} font={'medium'}>My creations</SWRText>
				<TextButton onPress={() => setNav('MyCreations')}>View all</TextButton>
			</View>

			<ScrollView showsHorizontalScrollIndicator={false} style={{overflow: 'visible'}} horizontal>
				{creationList.length === 0 && <View>
					<SWRText style={[gs.h4, {marginBottom: 10}]}>You have no creations yet</SWRText>
					<SWRButton singleUse onPress={() => setNav('Create')}>
						<SWRText style={gs.h5}>Create Some Here!</SWRText>
					</SWRButton>
				</View>}
				{creationList.map((creation, i) => {
					return (
						<TouchableOpacity style={styles.creation} key={i}
						onPress={() => setNav(creation.type, creation.data)}	>
							<SWRText style={gs.h4}>{creation.data.title}</SWRText>
							<SWRText style={[gs.h4, styles.creationTypeText]}>{creation.type}</SWRText>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	subHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		fontSize: 20,
		textAlign: 'left',
		alignItems: 'center',
	},
	subHeaderText: {
		marginVertical: 10,
		fontSize: 20,
		textAlign: 'left',
		width: '100%',
	},
	creation: {
		backgroundColor: 'white',
		borderRadius: 25,
		marginRight: 10,
		overflow: 'visible',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		height: 200,
		width: 160,
		padding: 20,
		paddingTop: 30
	},
	creationTypeText: {
		color: colors.grey,
		marginTop:5
	}
})