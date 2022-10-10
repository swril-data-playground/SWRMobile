import { Toast } from '../../../types/toast'
import { StyleSheet, View, Image, ScrollView, Dimensions, Button } from 'react-native'
import { SWRText } from 'components/SWRText'
import { images } from "assets/images"
import { gs } from 'styles/globals'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SWRButton } from 'components/SWRButton'
 // import Swipeable from 'react-native-gesture-handler/Swipeable'

const toastMap = {
    'error': images.toast_error_icon,
    'success': images.toast_success_icon,
    'warning': images.toast_warning_icon,
    'info': images.toast_info_icon,
}

// const exit = () => {

// }

const {width, height} = Dimensions.get('screen')


export const ToastItem = (props: {
	toast: Toast,
}) => {

const [dimension, setDimension] = useState(Dimensions.get('window'))
	const [selectedIndex, setSelectedIndex] = useState(0)
	const scrollRef = useRef<ScrollView>(null)
	const intervalId = useRef<NodeJS.Timeout>()
    const [showToast, setShowToast] = useState(true)

	const onChange = () => {
		setDimension(Dimensions.get('window'))
	}

	useEffect(() => {
		const listener = Dimensions.addEventListener('change', onChange)
		return () => {
			listener.remove()
		};
	});

	
	// useEffect(() => {
		
	// }, [showToast]);


    return (

            showToast && <View style={styles.container}>
                <Image source={toastMap[props.toast.type]} style={styles.image}/>
                <View style={styles.data}>
                    <SWRText style={gs.h4}>{props.toast.title}</SWRText>
                    {props.toast.details && <SWRText style={gs.h7}>{props.toast.details}</SWRText>}
                </View>
                <SWRButton onPress={() => setShowToast(false)} style={{marginLeft: 'auto'}}>
                    <Image source={images.x} style={styles.xicon}/>
                </SWRButton>
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
    xicon: {
        width: 20,
        height: 20,
    },
})