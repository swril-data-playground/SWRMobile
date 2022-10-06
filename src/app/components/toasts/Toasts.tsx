import { SWRText } from 'components/SWRText'
import { ToastContext } from 'contexts/toastContext'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

export const Toasts = (props: {
	tabs: boolean
}) => {
	const { content } = useContext(ToastContext)
	console.log(content)
	return (
		<View style={[styles.container, {marginBottom: props.tabs?80:0}]}>
			<SWRText>
				Hello World
			</SWRText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0
	}
})