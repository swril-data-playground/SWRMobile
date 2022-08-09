import { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { NavContext } from 'contexts/navContext'
import { imageName, images } from "assets/images"
import { tabItems, tabName } from 'src/app/navigation/tabs'
export const Tabs = (props: { tab: tabName}) => {
	const { setNav } = useContext(NavContext)
	return (
		<View style={styles.navbar}>
			{tabItems.map((item, i) => {
				const iconSource: imageName = props.tab === item.nav ? item.selectedIcon : item.icon
				return (
					<TouchableOpacity style={styles.navItem} key={i} onPress={() => setNav(item.nav)}>
						<View style={styles.navItem}>
							<Image style={styles.navIcon} source={images[iconSource]} />
						</View>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	navbar: {
		position: 'absolute',
		width: '100%',
		height: 80,
		bottom: 0,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		backgroundColor: 'white'
	},
	navItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '100%',
		marginBottom: 20,
	},
	navItemText: {
		textAlign: 'center',
		fontSize: 13,
		color: 'black',
	},
	selectedNavItemText: {
		textAlign: 'center',
		fontSize: 13,
		color: 'blue',
	},
	navIcon: {
		height: 40,
		width: 40,
		marginTop: 5,
	},
})
