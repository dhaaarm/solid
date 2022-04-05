import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import Input from "../Components/Input";
import NumberContainer from "../Components/NumberContainer";
import Color from "../constants/colors";
import defaultStyles from "../constants/defaultStyles";
import Card from "../Components/Card";

const StartScreen = (props) => {
  const [enteredText, setenteredText] = useState("");
  const [confirmed, setconfirmed] = useState(false);
  const [selectedNumber, setselectedNumber] = useState("");
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const getText = (enteredData) => {
    setenteredText(enteredData.replace(/[^0-9]/g, ""));
  };

  const resetNumber = () => {
    setenteredText("");
    setconfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const confirmNumber = () => {
    const choosenNumber = parseInt(enteredText);

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert("Invalid Number", "Number has to be between 1 to 99", [
        { text: "Okay", style: "destructive", onPress: resetNumber },
      ]);
      return;
    }
    setconfirmed(true);
    setselectedNumber(choosenNumber);
    setenteredText("");
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.startContainer}>
        <Text style={defaultStyles.bodyText}> Your Selected Number: </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          onPress={() => props.onStartGame(selectedNumber)}
          color={Color.primary}
          title="start game"
        />
      </Card>
    );
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <Text style={styles.title}>Start Screen</Text>
          <Card style={styles.inputContainer}>
            <Text style={defaultStyles.bodyText}>Select Number</Text>
            <Input
              style={styles.input}
              blurOnSubmit
              value={enteredText}
              onChangeText={getText}
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title="reset"
                  onPress={resetNumber}
                  color={Color.secondary}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Confirm"
                  onPress={confirmNumber}
                  color={Color.primary}
                />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 30,
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignContent: "center",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
  },
  startContainer: {
    marginTop: 60,
    alignItems: "center",
    width: Dimensions.get("window").width - 80,
  },
  title: {
    fontSize: 35,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  button: {
    width: Dimensions.get("window").width / 4,
  },
  input: {
    width: 50,
  },
});

export default StartScreen;
