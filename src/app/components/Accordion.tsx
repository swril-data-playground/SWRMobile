import React, { useState } from "react";
import { View } from "react-native";
import { SWRButton } from "./SWRButton";
import { SWRText } from "./SWRText";

const Accordion = ( props: {header: string, content:string} ) => {
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

export default Accordion;