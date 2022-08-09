import { SWRText } from "components/SWRText"
import { AuthContext } from "contexts/authContext"
import { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { gs } from "styles/globals"


export const HomeHeader = () => {
	const { auth } = useContext(AuthContext)
	return (
		<View style={styles.container}>
			<SWRText font={'medium'} style={[gs.h2, styles.headerText]}>Hey, <SWRText font={'medium'} style={styles.blueText}>{auth.account?.firstName}</SWRText></SWRText>
			<SWRText font={'medium'} style={[gs.h2, styles.headerText]}>Let's start exploring</SWRText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 5
	},
	headerText: {
		textAlign: 'left'
	},
	blueText: {
		color: 'blue'
	}
})