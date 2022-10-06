import { Toast } from '../../../types/toast'
import { StyleSheet, View, Image } from 'react-native'
import { SWRText } from 'components/SWRText'
import { images } from "assets/images"

const toastMap = {
    'error': images.toast_error_icon,
    'success': images.toast_success_icon,
    'warning': images.toast_warning_icon,
    'info': images.toast_info_icon,
}

export const ToastItem = (props: {
	toast: Toast,
}) => {
    return (
        <View>
            <Image source={toastMap[props.toast.type]} style={styles.image}/>
            <SWRText style={styles.toast}>
                {props.toast.title}
            </SWRText>
        </View>
    )
}

const styles = StyleSheet.create({
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
	},
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%', 
        resizeMode: 'contain',
    }
})