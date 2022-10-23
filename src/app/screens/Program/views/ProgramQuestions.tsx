import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { StyleSheet } from "react-native"
import { gs } from "styles/globals"
import { ProgramType } from "types/programs"

export const ProgramQuestions = (props: {
	program: ProgramType
	next: () => Promise<void>
	back: () => void
}) => {
	const program = props.program as ProgramType
	return (
		<>
			<BackButton style={{margin: 10}} onPressOverride={props.back} />

			<SWRButton onPress={props.next} style={{backgroundColor: 'lightgrey', width: '70%'}}>
				<SWRText style={[gs.h3, {textAlign: 'center'}]}>Continue</SWRText>
			</SWRButton>
		</>
	)
}	

const styles = StyleSheet.create({
})