import { SWRText } from "components/SWRText"
import { AuthContext } from "contexts/authContext"
import { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"


export const HomeHeader = () => {
	const { auth } = useContext(AuthContext)
	const name = auth.account?.org? auth.account.orgInfo.name : auth.account?.userInfo.firstName
	return (
		<View style={styles.container}>
			<SWRText font={'medium'} style={[gs.h2, styles.headerText]}>Hey, <SWRText font={'medium'} style={styles.blueText}>{name}</SWRText></SWRText>
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
		color: colors.navyBlue
	}
})