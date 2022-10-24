import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { StyleSheet } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"

export const ThankYou = (props: {
	program: ProgramType
}) => {
	const { setNav } = useContext(NavContext)
	const program = props.program as ProgramType
	return (
		<>
			<SWRButton onPress={() => setNav('Home')} style={{backgroundColor: 'lightgrey', width: '70%'}}>
				<SWRText style={[gs.h3, {textAlign: 'center'}]}>Done</SWRText>
			</SWRButton>
		</>
	)
}	

const styles = StyleSheet.create({
})