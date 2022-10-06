import { SWRText } from 'components/SWRText'
import { ToastContext } from 'contexts/toastContext'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

export const Toasts = (props: {
	tabs: boolean
}) => {
	const { content } = useContext(ToastContext)
	return (
		<View style={[styles.container, {marginBottom: props.tabs?80:0}]}>
				{content.activeToasts.length > 0 && 
				<SWRText style={styles.toast}>
						{content.activeToasts[0].title}
				</SWRText>
				}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: '20%',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	toast: {
		width: '90%',
		height: '30%',
		margin: 10,
		borderRadius: 10,
		display: 'flex',
		borderWidth: 1,
		borderColor: 'grey',
		backgroundColor: 'white',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		textAlign: 'center',
		textAlignVertical: 'center',

	}
})