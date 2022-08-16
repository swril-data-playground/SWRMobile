import { images } from "assets/images"
import { useState } from "react"
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"
import { CheckBox } from "../CheckBox"
import { SWRText } from "../SWRText"
import { SWRInputLabel } from "./SWRInputLabel"

export interface SWRSelectInputProps {
	value: string | undefined,
	choices: string[] | readonly string[],
	onChange: (newValue: string) => void,
	withTitle?: boolean
	name?: string
	containerStyle?: StyleProp<ViewStyle>
	buttonStyle?: StyleProp<ViewStyle>
}

export const SWRSelectInput = (props: SWRSelectInputProps) => {
	const [open, setOpen] = useState(false)
	const modalStyle = { display: open? 'flex':'none'} as const
	const valueStyle = { backgroundColor: open? colors.lightGrey:'white' }
	const content = (
		<View style={styles.container}>
			<TouchableOpacity 
				style={[styles.option, styles.primaryButton,  valueStyle,  props.buttonStyle]} 
				onPress={() => setOpen(!open)}
			>
				<SWRText style={gs.h5}>
					{props.value ?? '-Select-' }
				</SWRText>
				<Image source={images.triangle} style={styles.triangleIcon}/>
			</TouchableOpacity>
			<View style={[styles.optionsModal, modalStyle]}>
				{props.choices.map((choice, i) => {
					const selected = props.value === choice
					const selectStyle = {
						backgroundColor: selected? colors.lightBlue : undefined
					}
					return (
						<TouchableOpacity key={i} style={[styles.option, selectStyle]} onPress={() => {
							props.onChange(choice)
						}}>
							<CheckBox checked={selected} size={20} style={{marginRight: 10}} color={colors.blue}/>
							<SWRText style={gs.h5}>{choice}</SWRText>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
	if (!props.withTitle) return content
	return (
		<SWRInputLabel style={props.containerStyle} name={props.name??''}>
			{content}
		</SWRInputLabel>
	)
}

const styles = StyleSheet.create({
	withTitleContainer: {
		alignItems: 'flex-start',
		width: '100%',
	},
	container: {
		overflow: 'visible',
		width: '100%',
		marginVertical: 4,
	},
	primaryButton: {
		borderRadius: 15,
		paddingLeft: 20,
		justifyContent: 'space-between'
	},
	optionsModal: {
		backgroundColor: 'white',
		borderRadius: 15,
		overflow: 'hidden'
	},
	option: {
		height: 50,
		padding: 10,
		fontSize: 18,
		textAlign: 'left',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row'
	},
	triangleIcon: {
		height: 15,
		width: 14,
		resizeMode: 'stretch',
		marginRight: 15
	}
})