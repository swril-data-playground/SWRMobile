import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { useContext, useState } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { images } from "assets/images"
import { tryAddHouseholdMember } from "data/account"

export const AddHouseholdMember = () => {

	const [householdData, setHouseholdData] = useState<string>('')
	const { auth } = useContext(AuthContext)
	const { setNav } = useContext(NavContext)
	const handleTryAddHouseholdMember = async () => {
		if (!auth.account) return
		const {status, householdMember} = await tryAddHouseholdMember(householdData, auth.account)
		if (status === 200) {
			setHouseholdData('')
			setNav('Profile')
		}
		else throw Error('Failed to add household member')
	}
	const doneEnabled = (
		householdData.length > 0
	)

    return (
        <View style={gs.scrollParent}>
            <BackButton leftAlign screenPadding/>
			<ScrollView style={gs.screenPadding} keyboardShouldPersistTaps='handled'>
				<SWRText font={'medium'} style={styles.headerText}>Add Household Member</SWRText>
                <SWRTextInput 
					name={'Wallet ID'} 
					onChange={(walletID) => setHouseholdData(walletID)} 
					value={householdData}
					withTitle
				/>
                <SWRButton style={styles.doneButton} onPress={handleTryAddHouseholdMember} disabled={!doneEnabled}>
					<SWRText style={gs.h5} font={'medium'}>Send add request</SWRText>
				</SWRButton>
                <Image source={images.piggyback} style={styles.piggybackImage}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
	headerText: {
		textAlign: 'center',
		fontSize: 40,
		marginBottom: 10
	},
	doneButton: {
		marginTop: 20,
		borderRadius: 15,
	},
    piggybackImage: {
		width: 137,
		height: 420,
		marginLeft: 130,
        marginTop: 40
	},
})