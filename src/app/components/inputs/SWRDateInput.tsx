import { SWRText } from "components/SWRText"
import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { colors } from "styles/colors"
import { SWRTextInput } from "./SWRTextInput"

export const SWRDateInput = (props: {
	value: string,
	onChange: (newValue: string) => void
}) => {
		//2022-03-23 
	const date = new Date(props.value)
	const validDate = date.toString() !== 'Invalid Date'
	const [state, setState] = useState<{day?:number, month?:number, year?:number}>({})
	const setDay = (newDay: string) => {
		setState({...state, day: parseInt(newDay)})
	}
	const setMonth = (newMonth: string) => {
		setState({...state, month: parseInt(newMonth)})
	}
	const setYear = (newYear: string) => {
		setState({...state, year: parseInt(newYear)})
	}
	return (
		<View style={styles.container}>
			<TextInput 
				keyboardType={'number-pad'} 
				value={state.day?.toString()} 
				style={styles.textInput} 
				placeholder={'DD'} 
				onChangeText={setDay}
			/>
			<SWRText style={styles.slash}>/</SWRText>
			<TextInput 
				keyboardType={'number-pad'} 
				value={state.month?.toString()} 
				style={styles.textInput} 
				placeholder={'MM'} 
				onChangeText={setMonth}
			/>
			<SWRText style={styles.slash}>/</SWRText>
			<TextInput 
				keyboardType={'number-pad'} 
				value={state.year?.toString()} 
				style={styles.textInput} 
				placeholder={'YY'} 
				onChangeText={setYear}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	textInput: {
		height: 50,
		padding: 10,
		marginVertical: 4,
		borderRadius: 10,
		fontSize: 18,
		textAlign: 'center',
		width: 60,
		backgroundColor: colors.lightGrey
	},
	slash: {
		fontSize: 25,
		margin: 8
	}
})