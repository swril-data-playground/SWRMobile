import { StyleSheet } from 'react-native'

export const gs = StyleSheet.create({
	fullScreen: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 20
	} as const,
	scrollParent: {
		height: '100%',
	} as const,
	screenPadding: {
		paddingHorizontal: 20
	} as const,
	h7: {
		fontSize: 12
	} as const,
	h6: {
		fontSize: 15
	} as const,
	h5: {
		fontSize: 18
	} as const,
	h4: {
		fontSize: 20,
	} as const,
	h3: {
		fontSize: 30
	} as const,
	h2: {
		fontSize: 40,
	} as const,
	h1: {
		fontSize: 50,
	} as const,
	fillImage: {
		width: '100%',
		height: '100%',
	} as const
})
