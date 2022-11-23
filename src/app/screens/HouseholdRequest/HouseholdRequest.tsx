import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { FullAvatar } from "components/FullAvatar"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"
import { tryRespondToHouseholdRequest } from "data/account"
import { useContext } from "react"
import { View, StyleSheet } from "react-native"
import { gs } from "styles/globals"
import { HouseholdRequestType } from "types/householdRequest"

export const HouseholdRequest = (props: {content: any}) => {
	const content = props.content as HouseholdRequestType
	const { setNav } = useContext(NavContext)

	const handleTryRespondToHouseholdRequest = async (approve: boolean) => {
		const {status} = await tryRespondToHouseholdRequest(content, approve)
		if (status === 200) {
			setNav('Profile')
		}
		else throw Error('Failed to create survey')
	}

	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding />
			<View style={[gs.screenPadding, styles.container]} >
				<SWRText font={'medium'} style={styles.headerText}>Household Request</SWRText>
				<FullAvatar avatar={content.fromAccount.userInfo.avatar} height={300}/>
				<SWRText font={'medium'} style={styles.questionText}>{content.fromAccount.userInfo.firstName} is asking if you want to join their household!</SWRText>
				<SWRText style={styles.consentText}>If you consent, you will be able added to their household. This means that they will be able to sign you up for programs.</SWRText>
				<View style={styles.questionSection}>
					<SWRText style={styles.consentQuestionText}>Do you consent to joining {content.fromAccount.userInfo.firstName}'s household?</SWRText>
				</View>
				<View style={styles.buttons}>
					<SWRButton onPress={() => handleTryRespondToHouseholdRequest(true)} singleUse style={[styles.button, {marginRight: 10}]}>
						<SWRText font={'medium'} style={gs.h4}>Yes</SWRText>
					</SWRButton>
					<SWRButton onPress={() => handleTryRespondToHouseholdRequest(false)} singleUse style={[styles.button, {marginLeft: 10}]}>
						<SWRText font={'medium'} style={gs.h4}>No</SWRText>
					</SWRButton>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	headerText: {
		textAlign: 'center',
		fontSize: 30,
		marginBottom: 10
	},
	doneButton: {
		marginTop: 20,
		borderRadius: 15,
	},
	container: {
		alignItems: 'center'
	},
	questionText: {
		textAlign: 'center',
		fontSize: 24,
		marginTop: 15
	},
	consentText: {
		fontSize: 16,
		marginTop: 10,
		marginHorizontal:20
	},
	questionSection: {
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		marginVertical: 20,
		padding: 18,
		borderRadius: 20,
		width: '100%'
	},
	consentQuestionText: {
		fontSize: 17
	},
	buttons: {
		flexDirection: 'row'
	},
	button: {
		width: '100%',
		flex: 1
	}
})