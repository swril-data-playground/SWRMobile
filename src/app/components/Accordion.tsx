import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { accordionItem, accordionItemImage } from "types/accordionItem";
import { SWRButton } from "./SWRButton";
import { SWRText } from "./SWRText";

const Accordion = ( props: accordionItem ) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.accordionItem}>
      <SWRButton onPress={() => setIsActive(!isActive)}>
        <SWRText style={styles.title}>{props.header}</SWRText>
      </SWRButton>
      {isActive && <SWRText style={styles.content}>{props.content}</SWRText>}
    </View>
  );
};

export const AccordionWithImage = ( props: accordionItemImage ) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.accordionItem}>
      <SWRButton onPress={() => setIsActive(!isActive)}>
        <SWRText style={styles.title}>{props.header}</SWRText>
      </SWRButton>
      {isActive && <SWRText style={styles.content}>{props.content.text}</SWRText>}
      {isActive && <Image source={props.content?.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  title:{
    fontSize: 15,
    fontWeight: "bold",
    borderColor: "gray",
  },
  content:{
    fontSize: 12,
    backgroundColor: "white",
    padding: 10,
  },
  accordionItem: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },


});


export default Accordion;