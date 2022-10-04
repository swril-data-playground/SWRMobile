import { images } from "assets/images"
import { GenericScroller } from "components/GenericScroller"
import { SWRText } from "components/SWRText"
import { useCallback, useEffect, useRef, useState } from "react"
import { View, StyleSheet, Image, ScrollView, Dimensions, Text } from "react-native"
import { DoggoScrollerData } from "./DoggoScrollerData"

export const DoggoScroller = (props: {
	textOnTop: boolean
}) => {
	return (
		<View>
			<GenericScroller imageSet={DoggoScrollerData} textOnTop={props.textOnTop}/>
		</View>
	)
}