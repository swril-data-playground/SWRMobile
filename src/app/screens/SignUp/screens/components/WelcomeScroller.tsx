import { images } from "assets/images"
import { SWRText } from "components/SWRText"
import { useCallback, useEffect, useRef, useState } from "react"
import { View, StyleSheet, Image, ScrollView, Dimensions, Text } from "react-native"

export const WelcomeScroller = () => {

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
		const newIndex = selectedIndex === imageSet.length - 1 ? 0 : selectedIndex + 1;
		setSelectedIndex(newIndex)
		scrollRef.current?.scrollTo({x: newIndex * dimension.width, animated: true})
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

	const imageSet = [
		{
			image: images.guitar_girl,
			text: "Your information is yours and you choose who has access to it."
		},
		{
			image: images.man_at_desk,
			text: "Data playground is based on the idea that no central authority should" +
			" own your information. We use a decentralized network to protect the" + 
			" security of your information"
		},
		{
			image: images.man_cooking,
			text: "By using data playground you will be able to register for community programs" +
			" with just one click. This way you can spend more time taking cooking classes and less" +
			" time signing up for it."
		}
	]

	const setIndex = (event: any) => {
		const contentOffset = event.nativeEvent.contentOffset
		const viewSize = event.nativeEvent.layoutMeasurement
		const newIndex = Math.floor(contentOffset.x / (viewSize.width))
		setSelectedIndex(newIndex)
	}

	return (
		<View style={styles.container}>
			
			<ScrollView 
			  horizontal
			  ref={scrollRef}
			  pagingEnabled
			  showsHorizontalScrollIndicator={false}
			  onMomentumScrollEnd={setIndex}
			  onTouchStart={onTouchStart}
			  onTouchEnd={onTouchEnd}>
				{
					imageSet.map((item, index) => (
					<View key={index} style={{ marginRight: 40, width: dimension.width-40}}>
						<SWRText style={styles.captionText}>{item.text}</SWRText> 
						<Image key = {index} source = {item.image} style={{ width: dimension.width, height: 256, resizeMode: 'contain', display: 'flex'}}/>
					</View>
					))
				}
			</ScrollView>
			<View style={styles.dotsContainer}>
			{imageSet.map((item, index) => (
          		<SWRText
           		  key={index}
				style={[styles.dots, { color: index === selectedIndex ? 'black' : 'white' }]}>
            		⬤
          		</SWRText>
        	))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		marginTop: 40
	},
	captionText: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
	
	},
	guitarGirlImage: {
		marginTop: 10,
		height: 280,
		width: 230
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
})