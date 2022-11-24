import DateTimePicker from "@react-native-community/datetimepicker"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"
import { gs } from "styles/globals"
import { SWRInputLabel } from "./SWRInputLabel"

export const SWRTimeInput = (props: {
	name?: string,
	withTitle?: boolean,
	value: string,
	onChange: (newValue: string) => void,
	containerStyle?: StyleProp<ViewStyle>
}) => {
	console.log(props.value)
	let time = new Date(props.value)
	console.log(time)
	if (isNaN(time.getTime())) {
		time = new Date()
	}
	const content = (
		<DateTimePicker
			testID="dateTimePicker"
			value={time}
			mode={'time'}
			is24Hour={true}
			onChange={(event, selectedTime) => {
				console.log(selectedTime?.toString())
				props.onChange(selectedTime?.toString() ?? '')
			}}
			style={{
				minWidth: 80,
				minHeight: 50,
				alignSelf: 'flex-start'
			}}
        />
	);
	if (!props.withTitle) return content
	return (
		<SWRInputLabel style={props.containerStyle} name={props.name??''}>
			{content}
		</SWRInputLabel>
	)
}

const styles = StyleSheet.create({
})