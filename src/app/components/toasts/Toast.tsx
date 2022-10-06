import { Toast } from '../../../types/toast'
import { StyleSheet, View, Image } from 'react-native'
import { SWRText } from 'components/SWRText'
import { images } from "assets/images"
import { gs } from 'styles/globals'

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
        <View style={styles.container}>
            <Image source={toastMap[props.toast.type]} style={styles.image}/>
            <View style={styles.data}>
                <SWRText style={gs.h4}>{props.toast.title}</SWRText>
                {props.toast.details && <SWRText style={gs.h7}>{props.toast.details}</SWRText>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 15,
        padding: 10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 2,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
	data: {
	},
})