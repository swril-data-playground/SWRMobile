import { SWRText } from 'components/SWRText'
import { ToastContext } from 'contexts/toastContext'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { ToastItem } from './Toast'

export const Toasts = (props: {
	tabs: boolean
}) => {
	const { content } = useContext(ToastContext)
	return (
		<View style={[styles.container, {marginBottom: props.tabs?80:0}]}>
			{content.activeToasts.map((toast, index) => {
				return <ToastItem toast={content.activeToasts[index]} key={index}/>
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 0,
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
})