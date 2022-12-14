import DateTimePicker from "@react-native-community/datetimepicker"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"
import { gs } from "styles/globals"
import { SWRInputLabel } from "./SWRInputLabel"

export const SWRDateInput = (props: {
	name?: string,
	withTitle?: boolean,
	value: string,
	onChange: (newValue: string) => void,
	containerStyle?: StyleProp<ViewStyle>
}) => {
	let date = new Date(props.value)
	if (isNaN(date.getTime())) {
		date = new Date()
	}
	const content = (
		<DateTimePicker
			testID="dateTimePicker"
			value={date}
			mode={'date'}
			is24Hour={true}
			onChange={(event, selectedDate) => {
				props.onChange(selectedDate?.toUTCString() ?? '')
			}}
			style={{
				minWidth: 140,
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