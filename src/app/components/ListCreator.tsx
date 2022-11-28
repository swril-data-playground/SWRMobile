import { images } from "assets/images"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { colors } from "styles/colors"
import { gs } from "styles/globals"
import { defaultQuestion, QuestionType, questionTypes, typeOfQuestion } from "types/questions"
import { SWRButton } from "./SWRButton"
import { SWRSelectInput } from "./inputs/SWRSelectInput"
import { SWRText } from "./SWRText"
import { SWRTextInput } from "./inputs/SWRTextInput"

export const ListCreator = (props: {
	list: string[]
	setList: (newList: string[]) => void
}) => {
	const addItem = () => {
		props.setList([...props.list, ''])
	}
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<SWRText style={[gs.h4, {marginRight: 20}]}>Choices: </SWRText>
				<SWRButton onPress={addItem} style={styles.addChoice}>
					<SWRText style={gs.h5}>Add a choice</SWRText>
					<Image source={images.add} style={styles.addIcon}/>
				</SWRButton>
			</View>
			<View>
				{props.list.map((choice, i) => {
					const setChoice = (newChoice: string) => {
						const newList = [...props.list]
						newList[i] = newChoice
						props.setList(newList)
					}
					return (
						<View key={i} style={styles.choice}>
							<SWRText style={[gs.h5, {width: "10%"}]}>{i+1}. </SWRText>
							<SWRTextInput 
								name={'Choice ' + (i+1)} 
								value={choice} 
								onChange={(text) => {setChoice(text)}}
								inputStyle={{
									backgroundColor: colors.lightGrey,
									paddingLeft: 20,
									width: "90%"
								}}
							/>
						</View>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	container: {
		marginVertical: 4,
		width: '100%',
	},
	addChoice: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: colors.lightGrey,
		width: "55%",
	},
	addIcon: {
		height: 25,
		width: 25
	},
	choice: {
		backgroundColor: 'white',
		marginTop: 5,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
})