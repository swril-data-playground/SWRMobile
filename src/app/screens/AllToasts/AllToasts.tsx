import { BackButton } from 'components/BackButton'
import { SWRText } from 'components/SWRText'
import { ToastContext } from 'contexts/toastContext'
import { useContext } from 'react'
import { View, ScrollView } from 'react-native'
import { gs } from 'styles/globals'
import { ToastView } from './Toast'

export const AllToasts = () => {
	const { content } = useContext(ToastContext)
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding />
			<ScrollView style={gs.screenPadding} keyboardShouldPersistTaps='handled'>
				<SWRText font={'medium'} style={gs.h2}>All Notifications</SWRText>
				{content.toasts.map((toast, index) => {
					return (
						<ToastView key={index} toast={toast} />
					)
				})}
			</ScrollView>
		</View>
	)
}