import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { AuthContext } from "contexts/authContext"
import { NavContext } from "contexts/navContext"
import { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { tryEditProfileInfo } from "data/account"
import { SWRSelectInput } from "components/inputs/SWRSelectInput"
import { SWRDateInput } from "components/inputs/SWRDateInput"
import { UserPersonalInfo } from "types/account"
import { SWRSmallIntInput } from "components/inputs/SWRSmallIntInput"
import { ToastContext } from "contexts/toastContext"
import { genderOptions, religionOptions, raceOptions } from "./Options"


export const EditProfile = () => {
	const { auth } = useContext(AuthContext)
    const { pushToast } = useContext(ToastContext)
    const { setNav } = useContext(NavContext)
    if (!auth.account) return null
    const isOrg = auth.account.org
    if (isOrg) return null
    const userInfo = auth.account.userInfo



    const [profileData, setProfileData] = useState<UserPersonalInfo>(userInfo.personalInfo)
	const handleTryEditProfileInfo = async () => {
	 	if (!auth.account) return
	 	const {status} = await tryEditProfileInfo(profileData)
	 	if (status !== 200) throw Error('Failed to save Profile')
	}
	const doneEnabled = (
        (['DOB', 'gender', 'race', 'religion', 'postalCode'] as const).every(key =>  profileData[key] !== '') 
        && (['grade', 'height', 'weight'] as const).every(key =>  profileData[key] !== 0)
	)

    return (
        <View style={gs.scrollParent}>
            <BackButton leftAlign screenPadding/>
			<ScrollView style={gs.screenPadding} keyboardShouldPersistTaps='handled'>
				<SWRText font={'medium'} style={styles.headerText}>Edit Profile</SWRText>
                <SWRText style={gs.h5}>Date Of Birth</SWRText>
                <View style={styles.heightWeightInput}> 
                <SWRDateInput 
                    onChange={(DOB) => setProfileData({...profileData, DOB})} 
					value={profileData.DOB??''}
                />
                </View>
                <SWRText style={gs.h5}>Gender</SWRText>
                <SWRSelectInput
                    name={'Gender'}
                    onChange={(gender) => setProfileData({...profileData, gender})} 
                    value={profileData.gender}
                    choices={genderOptions}
                    buttonStyle={{marginBottom: 10}}
                />
                <View style={styles.heightWeightontainer}>
                    <View>
                        <SWRText style={gs.h5}>Height (cm)</SWRText>
                        <SWRSmallIntInput
                        name={'165'}
                        onChange={(height) => setProfileData({...profileData, height: parseInt(height)})} 
                        value={profileData.height?.toString()??''}
                        inputStyle={styles.heightWeightInput}
                    /> 
                    </View>
                    <View style={{marginLeft: 40}}>
                        <SWRText style={gs.h5}>Weight (lbs) </SWRText>
                        <SWRSmallIntInput
                        name={'160'}
                        onChange={(weight) => setProfileData({...profileData, weight: parseInt(weight) || 0})} 
                        value={profileData.weight?.toString()??''}
                        inputStyle={styles.heightWeightInput}
                    /> 
                    </View>
                </View>
                <SWRText style={gs.h5}>Religion</SWRText>
                <SWRSelectInput
                    name={'Religion'}
                    onChange={(religion) => setProfileData({...profileData, religion})} 
                    value={profileData.religion}
                    choices={religionOptions}   
                    buttonStyle={{marginBottom: 10}}
                />
                <SWRText style={gs.h5}>Race</SWRText>
                <SWRSelectInput
                    name={'Race'}
                    onChange={(race) => setProfileData({...profileData, race})} 
                    value={profileData.race}
                    choices={raceOptions}
                    buttonStyle={{marginBottom: 10}}
                />
                <View style={styles.heightWeightontainer}>
                    <View>
                        <SWRText style={gs.h5}>Grade</SWRText> 
                        <SWRSmallIntInput
                            name={'7'}
                            onChange={(grade) => setProfileData({...profileData, grade: parseInt(grade)})} 
                            value={profileData.grade?.toString()??''}
                            inputStyle={styles.heightWeightInput}
                        /> 
                    </View>
                    <View style={{marginLeft: 40}}>
                        <SWRText style={gs.h5}>Postal Code</SWRText>
                        <SWRTextInput
                            name={'M5A 6B7'}
                            onChange={(postalCode) => setProfileData({...profileData, postalCode})} 
                            value={profileData.postalCode??''}
                            inputStyle={styles.heightWeightInput}
                        /> 
                    </View>
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
        width: '100%',
        textAlign: 'center',
        marginRight: 40,
        marginBottom: 10
    }
})