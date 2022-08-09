import { View, ViewStyle } from 'react-native'

export const Line = (props: { style?: ViewStyle }) => {
	return (
		<View
			style={{
				borderBottomColor: 'black',
				borderBottomWidth: 2,
				...props.style,
			}}
		/>
	)
}
