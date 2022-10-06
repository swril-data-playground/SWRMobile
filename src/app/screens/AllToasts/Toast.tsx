import { SWRText } from "components/SWRText"
import { View } from "react-native"
import { Toast } from "types/toast"

export const ToastView = ({toast}: {
	toast: Toast
}) => {
	return (
		<View>
			<SWRText>{toast.title} {toast.details} {toast.type}</SWRText>
		</View>
	)
}	