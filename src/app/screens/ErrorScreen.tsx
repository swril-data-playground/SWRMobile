import { useContext, useState } from 'react'
import { Image, View, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native'
import { ErrorContext } from 'contexts/errorContext'
import { gs } from 'styles/globals'
import { Line } from 'components/Line'
import { images } from "assets/images"
import { SWRText } from 'components/SWRText'

// Immediately reload the React Native Bundle
export const ErrorScreen = () => {
	const [stackView, setStackView] = useState(false)
	const { error } = useContext(ErrorContext)
	return (
		<View style={[gs.fullScreen, {marginTop: 50}]}>
			<SWRText style={{fontSize: 40, marginVertical: 50 }}>SWRMobile</SWRText>
			<Image
				source={images['logo']}
				style={{
					height: 57,
					width: 240,
					marginBottom: 20,
				}}
			/>
			<SWRText style={gs.text}>Something went wrong, we are sorry.</SWRText>
			<ScrollView style={errorStyles.errorContainer}>
				<SWRText style={errorStyles.errorTitle}>{error?.name}</SWRText>
				<Line style={{ margin: 5 }} />
				<SWRText style={errorStyles.errorMessage}>Message: </SWRText>
				<SWRText style={errorStyles.errorMessage}>{error?.message}</SWRText>
				<Line style={{ margin: 5 }} />
				<Button title={`${stackView ? '▲' : '▼'} Stack trace...`} onPress={() => setStackView(!stackView)} />
				{stackView && <SWRText style={errorStyles.errorText}>{error?.stack?.replace('\n', '\n\n')}</SWRText>}
			</ScrollView>

			<TouchableOpacity
				style={errorStyles.restartButton}
			>
				<SWRText style={gs.largeText}>Restart</SWRText>
			</TouchableOpacity>
		</View>
	)
}

const errorStyles = StyleSheet.create({
	errorText: {
		fontSize: 15,
		color: 'red',
	},
	errorTitle: {
		fontSize: 30,
		textAlign: 'center',
		color: 'red',
		marginBottom: 10,
	},
	errorMessage: {
		fontSize: 20,
		textAlign: 'center',
		color: 'black',
	},
	errorContainer: {
		backgroundColor: 'white',
		width: '80%',
		padding: 10,
		borderRadius: 10,
		margin: 10,
		marginTop: 20,
	},
	restartButton: {
		backgroundColor: 'red',
		width: '70%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
		borderRadius: 20,
	},
})
