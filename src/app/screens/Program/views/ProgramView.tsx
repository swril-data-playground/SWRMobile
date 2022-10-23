import { AvatarIcon } from "components/AvatarIcon"
import { BackButton } from "components/BackButton"
import BackgroundImage from "components/BackgroundImage"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { ToastContext } from "contexts/toastContext"
import { useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"

export const ProgramView = (props: {
	program: ProgramType
	signUp: () => Promise<void> | void
}) => {
	const program = props.program as ProgramType
	const over3Attendees = program.attendees.length > 3
	const avatarAttendeesList = over3Attendees ? program.attendees.slice(0, 3) : program.attendees
	return (
		<>
			<View style={styles.imageContainer}>
				<BackgroundImage image={{uri: program.image}} style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
				<BackButton style={{margin: 10}} />
			</View>

			<View style={styles.infoContainer}>
				<SWRText style={gs.h3} font={'medium'}>{program.title}</SWRText>
				<SWRText style={styles.description}>{program.description}</SWRText>
			</View>
			<View style={styles.signUpContainer}>
				<View style={styles.avatarsContainer}>
					{avatarAttendeesList.map((attendee, i) => {
						return (
							<AvatarIcon key={i} avatar={attendee.avatar} style={styles.avatarIcon}/>
						)
					})}
					{over3Attendees && <SWRText style={[{marginLeft: 20}, gs.h4]}>+{program.attendees.length - 3}</SWRText>}
				</View>
				<SWRButton onPress={props.signUp} style={{backgroundColor: 'lightgrey', width: '70%'}}>
					<SWRText style={[gs.h3, {textAlign: 'center'}]}>Sign Up</SWRText>
				</SWRButton>
			</View>
		</>
	)
}	

const styles = StyleSheet.create({
	imageContainer: {
		flex: 3
	},
	infoContainer: {
		flex: 5,
		padding: 8,
		paddingHorizontal: 15
	},
	signUpContainer: {
		flex: 2,
		paddingHorizontal: 15
	},	
	avatarsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10
	},
	avatarIcon: {
		marginRight: -15
	},
	description: {
		fontSize: 16
	}
})