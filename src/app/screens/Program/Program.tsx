import { AvatarIcon } from "components/AvatarIcon"
import { BackButton } from "components/BackButton"
import BackgroundImage from "components/BackgroundImage"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"

export const Program = (props: {content: any}) => {
	const content = props.content as ProgramType
	const over3Attendees = content.attendees.length > 3
	const avatarAttendeesList = over3Attendees ? content.attendees.slice(0, 3) : content.attendees
	const trySignUp = () => {}
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<BackgroundImage image={{uri: content.image}} style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}} />
				<BackButton style={{margin: 10}} />
			</View>
			<View style={styles.infoContainer}>
				<SWRText style={gs.h3} font={'medium'}>{content.title}</SWRText>
				<SWRText style={styles.description}>{content.description}</SWRText>
			</View>
			<View style={styles.signUpContainer}>
				<View style={styles.avatarsContainer}>
					{avatarAttendeesList.map((attendee, i) => {
						return (
							<AvatarIcon key={i} avatar={attendee.avatar} style={styles.avatarIcon}/>
						)
					})}
					{over3Attendees && <SWRText style={[{marginLeft: 20}, gs.h4]}>+{content.attendees.length - 3}</SWRText>}
				</View>
				<SWRButton onPress={trySignUp} style={{backgroundColor: 'lightgrey', width: '70%'}}>
					<SWRText style={[gs.h3, {textAlign: 'center'}]}>Sign Up</SWRText>
				</SWRButton>
			</View>
		</View>
	)
}	

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		height: '97%',
	},
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