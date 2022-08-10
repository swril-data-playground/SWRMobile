import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { gs } from "styles/globals"
import { SWRText } from "./SWRText"

export interface SWRSelectInputProps {
	value: string | undefined,
	choices: string[] | readonly string[],
	onChange: (newValue: string) => void,
	withTitle?: boolean
	name?: string
}

export const SWRSelectInput = (props: SWRSelectInputProps) => {
	const [open, setOpen] = useState(false)
	const modalStyle = { display: open? 'flex':'none'}
	const content = (
		<View style={styles.container}>
			<TouchableOpacity 
				style={styles.primaryButton} 
				onPress={() => setOpen(!open)}
			>
				<SWRText>
					{props.value ?? '-Select-' }
				</SWRText>
			</TouchableOpacity>
			<View style={[styles.optionsModal, modalStyle]}>
				{props.choices.map((choice, i) => {
					return (
						<TouchableOpacity key={i}>
							<SWRText>{choice}</SWRText>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
	if (!props.withTitle) return content
	return (
		<View style={[styles.withTitleContainer]}>
			<SWRText style={gs.h4}>{props.name}</SWRText>
			{content}
		</View>
	)
}

const styles = StyleSheet.create({
	withTitleContainer: {
		alignItems: 'flex-start',
		width: '100%',
	},
	container: {
		overflow: 'visible',
	},
	primaryButton: {

	},
	optionsModal: {

	},
	textInput: {
		height: 50,
		padding: 10,
		marginVertical: 4,
		borderRadius: 15,
		fontSize: 18,
		textAlign: 'left',
		width: '100%',
		backgroundColor: 'white'
	},
})