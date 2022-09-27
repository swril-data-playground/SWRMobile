import { images } from "assets/images"
import { GenericScroller } from "components/GenericScroller"
import { SWRText } from "components/SWRText"
import { useCallback, useEffect, useRef, useState } from "react"
import { View, StyleSheet, Image, ScrollView, Dimensions, Text } from "react-native"
import { WelcomeScrollerData } from "./WelcomeScrollerData"

export const WelcomeScroller = () => {
	return (
		<View>
			<GenericScroller imageSet={WelcomeScrollerData}/>
		</View>
	)
}