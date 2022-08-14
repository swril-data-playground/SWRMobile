import { NavContext } from "contexts/navContext"
import { useContext } from "react"
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { images } from "assets/images"

export const BackButton = (props: {
	onPressPrefix?: () => void
	onPressOverride?: () => void,
	leftAlign?: boolean,
	screenPadding?: boolean,
	style?: StyleProp<ViewStyle>
}) => {
	const { nav, setNav } = useContext(NavContext)
	const paddingStyle = props.screenPadding ? {paddingHorizontal: 20} : {}
	const content = (
		<TouchableOpacity 
			style={[styles.container, props.style]}
			onPress={props.onPressOverride ? props.onPressOverride : () => {
				if (props.onPressPrefix) props.onPressPrefix()
				if (nav.stack.length < 2) throw Error('Back button used with no nav stack')
				setNav(nav.stack[nav.stack.length - 2])
			}}
		>
			<Image
				source={images.back}
				style={styles.image}
			/>
		</TouchableOpacity>
	)
	if (props.leftAlign) return (
		<View style={[styles.aligner, paddingStyle]}>
			{content}
		</View>
	)
	return content
}

const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		borderRadius: 40,
		backgroundColor: 'white',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		height: '80%',
		width: '80%',
	},
	aligner: {
		alignItems: 'flex-start',
		width:'100%'
	}
})