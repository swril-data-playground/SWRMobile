import { BackButton } from "components/BackButton"
import { FilterButtonModal } from "components/FilterButtonModal"
import { SWRText } from "components/SWRText"
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
	const creationList = auth.account? mapCreationObjectToList(auth.account.creations): []
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding />
			<ScrollView style={gs.screenPadding} >
				<View style={styles.header}>
					<SWRText style={gs.h2} font={'medium'}>My Creations</SWRText>
					<FilterButtonModal/>
				</View>
				<View style={styles.list}>
					{creationList.map((creation, i) => {
						return (
							<TouchableOpacity style={styles.creation} key={i}
							onPress={() => setNav(creation.type, creation.data)}	>
								<SWRText style={gs.h5}>{creation.data.title}</SWRText>
								<SWRText style={[gs.h5, styles.creationTypeText]}>{creation.type}</SWRText>
							</TouchableOpacity>
						)
					})}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},
	list: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	creation: {
		backgroundColor: 'white',
		borderRadius: 25,
		marginVertical: 10,
		overflow: 'visible',
		justifyContent: 'center',
		alignItems: 'flex-start',
		height: 200,
		width: '47%',
		padding: 20,
		paddingBottom: 30
	},
	creationTypeText: {
		color: colors.grey,
		marginTop:5
	}
})