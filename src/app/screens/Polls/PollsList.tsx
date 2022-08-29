import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { PollType } from "types/polls"

export const PollsList = (props: {
	title: string,
	polls: PollType[]	
}) => {
	const { setNav } = useContext(NavContext)
	return (
		<View>
			<SWRText style={gs.h3}>{props.title}</SWRText>
			<View style={styles.list}>
				{props.polls.map((poll, i) => {
					return (
						<TouchableOpacity key={i} style={styles.survey} onPress={() => setNav('Poll', poll)}>
							<SWRText style={gs.h5}>{poll.title}</SWRText>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	},
	list: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	survey: {
		padding: 15,
		paddingTop: 20,
		marginVertical: 10,
		borderRadius: 20,
		width: '45%',
		backgroundColor: 'white'
	},
})