import { SWRText } from 'components/SWRText'
import { ToastContext } from 'contexts/toastContext'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { ToastItem } from './Toast'

export const Toasts = (props: {
	tabs: boolean
}) => {
	const { content } = useContext(ToastContext)
	console.log(content)
	return (
		<View style={[styles.container, {marginBottom: props.tabs?80:0}]}>
				{content.activeToasts.length > 0 && content.activeToasts.map((toast, index) => {
					return(
						// <SWRText style={styles.toast}>
						// 	{content.activeToasts[index].title}
						// </SWRText>
						<ToastItem toast={content.activeToasts[index]} key={index}/>
					)}
				)}
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
		position: 'relative',
		width: '90%',
		height: '30%',
		margin: 3,
		borderRadius: 15,
		display: 'flex',
		borderWidth: 1,
		borderColor: 'grey',
		backgroundColor: 'white',
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		textAlign: 'center',
		textAlignVertical: 'center',

	}
})