import { images } from 'assets/images'
import { SWRButton } from 'components/SWRButton'
import { SWRText } from 'components/SWRText'
import { useState } from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { gs } from 'styles/globals'

export interface ProcessingProps {
	process: () => Promise<void>
	// cancel: () => Promise<void>
	done: () => void
}

export const Processing = (props: ProcessingProps) => {
	const [state, setState] = useState<'notStarted'|'inProgress'|'done'>('notStarted')
	const process = async () => {
		setState('inProgress')
		await props.process()
		setState('done')
	}

	if (state==='notStarted') process()
	return (
		<View style={styles.container}>
			{state==='inProgress' && <>
				<Image source={images.dog_walk} style={styles.dogWalkImage}/>
				<SWRText style={[gs.h2, styles.processingText]}>Processing</SWRText>
				<ActivityIndicator size="large" />
			</>}
			{state==='done' && <>
				<Image source={images.pretzel_dog} style={styles.dogPretzelImage}/>
				<SWRText style={[gs.h2, {textAlign: 'center'}]}>Completed</SWRText>
				<SWRButton onPress={props.done} style={styles.doneButton}>
					<SWRText style={gs.h5}>Done</SWRText>
				</SWRButton>
			</>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: '100%'
	},
	dogWalkImage: {
		marginLeft: 30,
		height: 240,
		width: 270
	},
	dogPretzelImage: {
		marginLeft: 60,
		height: 360,
		width: 220
	},
	processingText: {
		marginBottom: 10,
		textAlign: 'center'
	},
	doneButton: {
		width: '30%',
		borderRadius: 5,
		marginTop: 10
	}
})