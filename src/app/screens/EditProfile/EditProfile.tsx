import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { gs } from "styles/globals";
import { SWRText } from "components/SWRText";
import { FullAvatar } from "components/FullAvatar";
import { useContext, useState } from "react";
import { AuthContext } from "contexts/authContext";
import { SWRButton } from "components/SWRButton";
import { images } from "assets/images";
import { NavContext } from "contexts/navContext";
import { BackButton } from "components/BackButton";
import { SWRTextInput } from "components/inputs/SWRTextInput";
import { SWRSelectInput } from "components/inputs/SWRSelectInput";
import { colors } from "styles/colors";
import { defaultProgram, ProgramType } from "types/programs";
import { CategoryType } from "types/filter";
import { genderTypes, questionTypes, religionTypes } from "types/questions";

export const EditProfile = () => {
  const { auth } = useContext(AuthContext);
  const { setNav } = useContext(NavContext);
  const [programData, setProgramData] = useState<ProgramType>(defaultProgram);

  const [DD, setDD] = useState("");
  const [Month, setMonth] = useState("");
  const [Year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  return (
    <View style={gs.scrollParent}>
      <BackButton leftAlign screenPadding />
      <ScrollView style={gs.screenPadding}>
        <View style={styles.header}>
          <SWRText style={gs.h3}>Edit Profile</SWRText>
        </View>

        <View style={styles.containerStyle}>
          <SWRText font={"medium"} style={styles.editprofileTextDesign}>
            Date Of Birth
          </SWRText>
          <View style={[styles.dobContainerStyle]}>
            <SWRTextInput
              inputStyle={styles.inputTextDesign}
              containerStyle={styles.dobInputStyle}
              keyboardType={"numeric"}
              name={"DD"}
              onChange={(data) => {
                setDD(data);
              }}
              // onChange={(prompt) => {setQuestion({...question, prompt})}}
              value={DD}
              withTitle
            />
            <SWRText style={[gs.h4, styles.dobInputSlashStyle]}>/</SWRText>
            <SWRTextInput
              inputStyle={styles.inputTextDesign}
              containerStyle={styles.dobInputStyle}
              keyboardType={"numeric"}
              name={"MM"}
              onChange={(data) => setMonth(data)}
              value={Month}
              withTitle
            />
            <SWRText style={[gs.h4, styles.dobInputSlashStyle]}>/</SWRText>

            <SWRTextInput
              name={"YY"}
              keyboardType={"numeric"}
              containerStyle={styles.dobInputStyle}
              inputStyle={styles.inputTextDesign}
              onChange={(data) => setYear(data)}
              value={Year}
              withTitle
            />
          </View>

          <View style={{}}>
            <SWRText font={"medium"} style={styles.editprofileTextDesign}>
              Gender
            </SWRText>
            <SWRSelectInput
              value={programData.genderCategory}
              choices={genderTypes}
              onChange={(value) =>
                setProgramData({
                  ...programData,
                  category: value as CategoryType,
                })
              }
              // name={""}
              // withTitle
            />
          </View>

          <View
            style={[styles.dobContainerStyle, styles.editprofileTextDesign]}
          >
            <View>
              <SWRText font={"medium"}>Height</SWRText>
              <View style={{ flexDirection: "row" }}>
                <SWRTextInput
                  name={""}
                  containerStyle={styles.heightWidthDesign}
                  inputStyle={styles.heightInputDesign}
                  keyboardType={"numeric"}
                  // name={height}
                  onChange={(data) => setHeight(data)}
                  value={height}
                  withTitle
                />
                <View
                  style={{
                    height: 50,
                    width: 1.5,
                    backgroundColor: "lightgrey",
                    marginVertical: 4,
                  }}
                ></View>
                <View style={styles.heightViewDesign}>
                  <SWRText font={"medium"}>cm</SWRText>
                </View>
              </View>
            </View>
            <View style={{ marginLeft: 20 }}>
              <SWRText font={"medium"}>Weight</SWRText>
              <View style={{ flexDirection: "row" }}>
                <SWRTextInput
                  containerStyle={styles.heightWidthDesign}
                  inputStyle={styles.heightInputDesign}
                  keyboardType={"numeric"}
                  name={""}
                  onChange={(data) => setWeight(data)}
                  value={weight}
                  withTitle
                />
                <View
                  style={{
                    height: 50,
                    width: 1.5,
                    backgroundColor: "lightgrey",
                    marginVertical: 4,
                  }}
                ></View>
                <View style={styles.heightViewDesign}>
                  <SWRText font={"medium"}>lbs</SWRText>
                </View>
              </View>
            </View>
          </View>

          <SWRText font={"medium"} style={styles.editprofileTextDesign}>
            Religion
          </SWRText>
          <SWRSelectInput
            value={programData.religionCategory}
            choices={religionTypes}
            onChange={(value) =>
              setProgramData({
                ...programData,
                category: value as CategoryType,
              })
            }
            // name={""}
            // withTitle
          />
          <SWRText font={"medium"} style={styles.editprofileTextDesign}>
            Race
          </SWRText>

          <SWRSelectInput
            value={programData.category}
            choices={questionTypes}
            onChange={(value) =>
              setProgramData({
                ...programData,
                category: value as CategoryType,
              })
            }
            // name={""}
            // withTitle
          />

          <View style={styles.containerStyleGradeAndPostal}>
            <View>
              <SWRText font={"medium"}>Grade</SWRText>
              <SWRTextInput
                containerStyle={styles.heightWidthDesign}
                inputStyle={styles.inputTextDesign}
                name={"Grade"}
                onChange={(data) => setGrade(data)}
                value={grade}
                withTitle
              />
            </View>

            <View style={styles.weightWidthDesign}>
              <SWRText font={"medium"}>Postal Code</SWRText>
              <SWRTextInput
                containerStyle={styles.heightWidthDesign}
                inputStyle={styles.inputTextDesign}
                name={"MSL"}
                onChange={(data) => setPostalCode(data)}
                value={postalCode}
                withTitle
              />
            </View>
          </View>

          <SWRButton
            style={[styles.whiteSection, styles.linkButton]}
            onPress={() => {}}
          >
            <SWRText style={[gs.h4, styles.buttonTextDesign]}>Done</SWRText>
          </SWRButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  headerIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
  },

  containerStyle: {
    marginTop: 10,
    flex: 1,
    marginLeft: 6,
  },

  containerStyleGradeAndPostal: {
    marginTop: 10,
    flex: 1,
    // marginLeft: 6,
    flexDirection: "row",
  },

  dobContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    marginBottom: 0,
    // alignSelf: "center",
  },

  buttonTextDesign: {
    // fontWeight:'bold',
    fontWeight: "600",
  },

  buttonDesign: {
    shadowColor: "gray",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 3,
    shadowOffset: {
      width: 3,
      height: 2,
    },
  },

  whiteSection: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "gray",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 3,
    shadowOffset: {
      width: 3,
      height: 1,
    },
  },
  linkButton: {
    justifyContent: "center",
  },

  dobInputStyle: {
    width: 55,
    // alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },

  dobInputSlashStyle: {
    marginLeft: 5,
    marginRight: 5,
  },
  heightWidthDesign: {
    width: 70,
    // backgroundColor: "yellow",
  },
  weightWidthDesign: {
    marginLeft: 20,
  },
  editprofileTextDesign: {
    marginTop: 20,
    // marginBottom: 30,
    // position: "absolute",
    // marginBottom: -25,
  },
  inputTextDesign: {
    marginTop: -33,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    // backgroundColor: "red",
  },
  heightInputDesign: {
    marginTop: -23,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  heightViewDesign: {
    height: 50,
    padding: 10,
    marginVertical: 4,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    width: 70,
    backgroundColor: "white",
    alignItems: "center",
  },
});

// export default EditProfile;
