import { SWRText } from "components/SWRText"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { dataCategories, FilterType } from "types/filter"


export const CategoryFilter = (props: {filter: FilterType, setFilter: (newFilter: FilterType) => void }) => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
				{dataCategories.map((category, i) => {
					const selected = (category === props.filter.category)
					const backgroundColor = selected ? 'lightgrey': 'white'
					return (
						<TouchableOpacity 
							style={[styles.category, {backgroundColor}]} 
							onPress={() => props.setFilter({...props.filter, category})}
							key={i}
						>
							<SWRText font={selected?'bold':'main'} style={styles.categoryText}>{category}</SWRText>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		</View>
	)	
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		height: 50
	},
	scroll: {
		overflow: 'visible',
	},
	category: {
		borderRadius: 20,
		paddingVertical: 15,
		paddingHorizontal: 25,
		height: 50,
		marginRight: 10
	},
	categoryText: {
		height: 20,
		fontSize: 15
	}
})