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
import { tryAddHouseholdMember, tryEditProfileInfo } from "data/account"
import { SWRSelectInput } from "components/inputs/SWRSelectInput"
import { SWRDateInput } from "components/inputs/SWRDateInput"
import { SWRInputLabel } from "components/inputs/SWRInputLabel"
import { SWRMCInput } from "components/inputs/SWRMCInput"
import { AccountType, defaultAccount } from "types/account"

export const EditProfile = () => {
	const { auth } = useContext(AuthContext)
    if(!auth.account || !auth.account.personalInfo) {
        console.error('No account found')
        return null
    }
    const [profileData, setProfileData] = useState<AccountType>(auth.account)
	 const handleTryEditProfileInfo = async () => {
	 	if (!auth.account) return
	 	const {status} = await tryEditProfileInfo(profileData, auth.account)
	 	if (status === 200) {
	 		setProfileData(defaultAccount)
	 	}
	 	else throw Error('Failed to create survey')
	 }
	const doneEnabled = (
        (['DOB', 'gender', 'race', 'religion', 'postalCode'] as const).every(key =>  profileData.personalInfo[key] !== '') 
        && (['grade', 'height', 'weight'] as const).every(key =>  profileData.personalInfo[key] !== 0)
	)

    return (
        <View style={gs.scrollParent}>
            <BackButton leftAlign screenPadding/>
			<ScrollView style={gs.screenPadding} keyboardShouldPersistTaps='handled'>
				<SWRText font={'medium'} style={styles.headerText}>Edit Profile</SWRText>
                <SWRText style={gs.h5}>Date Of Birth</SWRText>
                <View style={styles.heightWeightInput}> 
                <SWRDateInput 
                    onChange={(DOB) => setProfileData({...profileData, 
                        personalInfo: {...profileData.personalInfo, DOB}})} 
					value={profileData.personalInfo.DOB}
                />
                </View>
                <SWRText style={gs.h5}>Gender</SWRText>
                <SWRSelectInput
                    name={'Gender'}
                    onChange={(gender) => setProfileData({...profileData, 
                        personalInfo: {...profileData.personalInfo, gender}})} 
                    value={profileData.personalInfo.gender}
                    choices={['Male', 'Female', 'Other']}
                    buttonStyle={{marginBottom: 10}}
                />
                <SWRText style={gs.h5}>Height (cm)        Weight (lbs) </SWRText>
                <View style={styles.heightWeightontainer}>
                    <SWRTextInput
                        name={'165'}
                        onChange={(height) => setProfileData({...profileData, 
                            personalInfo: {...profileData.personalInfo, height: parseInt(height)}})} 
                        value={profileData.personalInfo.height.toString()}
                        inputStyle={styles.heightWeightInput}
                    /> 
                    <SWRTextInput
                        name={'160'}
                        onChange={(weight) => setProfileData({...profileData, 
                            personalInfo: {...profileData.personalInfo, weight: parseInt(weight)}})} 
                        value={profileData.personalInfo.weight.toString()}
                        inputStyle={styles.heightWeightInput}
                    /> 
                </View>
                <SWRText style={gs.h5}>Religion</SWRText>
                <SWRSelectInput
                    name={'Gender'}
                    onChange={(religion) => setProfileData({...profileData, 
                        personalInfo: {...profileData.personalInfo, religion}})} 
                    value={profileData.personalInfo.religion}
                    choices={['Penis', 'Zac Waite', 'Pastafarianism']}
                    buttonStyle={{marginBottom: 10}}
                />
                <SWRText style={gs.h5}>Race</SWRText>
                <SWRSelectInput
                    name={'Gender'}
                    onChange={(race) => setProfileData({...profileData, 
                        personalInfo: {...profileData.personalInfo, race}})} 
                    value={profileData.personalInfo.race}
                    choices={['White', 'Black', 'Rainbow']}
                    buttonStyle={{marginBottom: 10}}
                />
                <SWRText style={gs.h5}>Grade                 Postal Code </SWRText>
                <View style={styles.heightWeightontainer}>
                    <SWRTextInput
                        name={'7'}
                        onChange={(grade) => setProfileData({...profileData, 
                            personalInfo: {...profileData.personalInfo, grade: parseInt(grade)}})} 
                        value={profileData.personalInfo.grade.toString()}
                        inputStyle={styles.heightWeightInput}
                    /> 
                    <SWRTextInput
                        name={'M5A'}
                    onChange={(postalCode) => setProfileData({...profileData, 
                        personalInfo: {...profileData.personalInfo, postalCode}})} 
                    value={profileData.personalInfo.postalCode}
                        inputStyle={styles.heightWeightInput}
                    /> 

                </View>
				<SWRButton style={styles.doneButton} onPress={handleTryEditProfileInfo} disabled={!doneEnabled}>
					<SWRText style={gs.h5} font={'medium'}>Done</SWRText>
				</SWRButton>
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
    heightWeightontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: 500,
        marginBottom: 10
    },
    heightWeightInput: {
        width: '25%',
        textAlign: 'center',
        marginRight: 40,
        marginBottom: 10
    }
})