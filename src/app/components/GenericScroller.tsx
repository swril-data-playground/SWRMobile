import { SWRText } from "components/SWRText"
import { useCallback, useEffect, useRef, useState } from "react"
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native"

export const GenericScroller = (props: {
	imageSet: {image: any,text: string}[],
	textOnTop: boolean,
}) => {

	const [dimension, setDimension] = useState(Dimensions.get('window'))
	const [selectedIndex, setSelectedIndex] = useState(0)
	const scrollRef = useRef<ScrollView>(null)
	const intervalId = useRef<NodeJS.Timeout>()

	const onChange = () => {
		setDimension(Dimensions.get('window'))
	}

	useEffect(() => {
		const listener = Dimensions.addEventListener('change', onChange)
		return () => {
			listener.remove()
		};
	});

	const onScroll = useCallback(() => {
		const newIndex = selectedIndex === props.imageSet.length - 1 ? 0 : selectedIndex + 1;
		setSelectedIndex(newIndex)
		scrollRef.current?.scrollTo({x: (newIndex * dimension.width)-40, animated: true})
	}, [selectedIndex])

	const startInterval = useCallback(() => {
		intervalId.current = setInterval(onScroll, 5000);
	}, [onScroll])

	useEffect(() => {
		startInterval()
		return () => {
			clearInterval(intervalId.current)
		}
	}, [startInterval]);

	const onTouchStart = () => {
		clearInterval(intervalId.current)
	}

	const onTouchEnd = () => {
		startInterval()
	}

	const setIndex = (event: any) => {
		const contentOffset = event.nativeEvent.contentOffset
		const viewSize = event.nativeEvent.layoutMeasurement
		const newIndex = Math.floor(contentOffset.x / (viewSize.width))
		setSelectedIndex(newIndex)
	}

	return (
		<View style={styles().container}>
			<ScrollView 
			  horizontal
			  ref={scrollRef}
			  pagingEnabled
			  showsHorizontalScrollIndicator={false}
			  onMomentumScrollEnd={setIndex}
			  onTouchStart={onTouchStart}
			  onTouchEnd={onTouchEnd}>
				{
					props.imageSet.map((item, index) => (
					<View key={index} style={styles(props, dimension).imageTextContainer}>
						<SWRText style={styles(props).captionText}>{item.text}</SWRText> 
						<Image key = {index} source = {item.image} style={styles(props, dimension).image}/>
					</View>
					))
				}
			</ScrollView>
			<View style={styles().dotsContainer}>
			{props.imageSet.map((item, index) => (
				<SWRText
           		  key={index}
				style={[styles().dots, { color: index === selectedIndex ? 'black' : 'white' }]}>
            		⬤
          		</SWRText>	
        	))}
			</View>
		</View>
	)
}

const styles = (props?: any, dimension?: any)  => StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		marginTop: 10
	},
	captionText: {
		textAlign: 'center',
		fontSize: 20,
		marginTop: props?.textOnTop ? 0 : 10 , 
		marginBottom: props?.textOnTop ? 20 : 0
	},
	image: {
		width: dimension?.width-80, 
		height: 256, resizeMode: 
		'contain',
		display: 'flex'
	},
	dotsContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	dots: {
		marginLeft: 5,
		marginRight: 5,
		fontSize: 10,
	},
	imageTextContainer: {
		marginHorizontal: 20,
		width: dimension?.width-80,
		flexDirection: props?.textOnTop ? "column" : "column-reverse",
		display: "flex", 
		justifyContent: props?.textOnTop ? "flex-start" : "flex-end"
	},
})