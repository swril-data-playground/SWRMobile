import React, { useState } from "react";
import { View, Image } from "react-native";
import { accordionItem, accordionItemImage } from "types/accordionItem";
import { SWRButton } from "./SWRButton";
import { SWRText } from "./SWRText";

const Accordion = ( props: accordionItem ) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View>
      <SWRButton onPress={() => setIsActive(!isActive)}>
        <SWRText>{props.header}</SWRText>
      </SWRButton>
      {isActive && <SWRText>{props.content}</SWRText>}
    </View>
  );
};

export const AccordionWithImage = ( props: accordionItemImage ) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View>
      <SWRButton onPress={() => setIsActive(!isActive)}>
        <SWRText>{props.header}</SWRText>
      </SWRButton>
      {isActive && <SWRText>{props.content.text}</SWRText>}
      {isActive && props.content?.image != null && <Image source={props.content.image} />}
    </View>
  );
};

export default Accordion;