import { BackButton } from 'components/BackButton'
import { SWRText } from 'components/SWRText'
import { ToastItem } from 'components/toasts'
import { ToastContext } from 'contexts/toastContext'
import { useContext } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { gs } from 'styles/globals'

export const AllToasts = () => {
	const { content } = useContext(ToastContext)
	return (
		<View style={gs.scrollParent}>
			<BackButton leftAlign screenPadding />
			<ScrollView style={gs.screenPadding} contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
				<SWRText font={'medium'} style={gs.h2}>All Notifications</SWRText>
				{content.toasts.map((toast, index) => {
					return (
						<ToastItem key={index} toast={toast} />
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
	}
})