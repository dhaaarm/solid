import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import Card from "../Components/Card";
import NumberContainer from "../Components/NumberContainer";
import defaultStyles from "../constants/defaultStyles";

const genRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return genRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderList = (value, numOfRound) => (
  <Card key={value} style={styles.list}>
    <Text style={defaultStyles.bodyText}>#{numOfRound}</Text>
    <Text style={defaultStyles.bodyText}>{value}</Text>
  </Card>
);

const GameScreen = (props) => {
  const initialGuess = genRandomNumber(1, 100, props.userChoice);
  const [currentGuess, setcurrentGuess] = useState(initialGuess);
  const [pastGuesses, setpastGuesses] = useState([initialGuess]);

  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know its Worng!!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = genRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setcurrentGuess(nextNumber);
    setpastGuesses((curPassGuesses) => [nextNumber, ...curPassGuesses]);
  };

  if (deviceHeight < 400) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
        <View style={styles.protrait}>
          <Button
            color="red"
            title="  -  "
            onPress={nextGuessHandler.bind(this, "lower")}
          />
          <NumberContainer>{currentGuess}</NumberContainer>
          <Button
            color="green"
            title="  +  "
            onPress={nextGuessHandler.bind(this, "greater")}
          />
        </View>
        <View style={styles.listView}>
          <ScrollView>
            {pastGuesses.map((guess, index) =>
              renderList(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          color="red"
          title="  -  "
          onPress={nextGuessHandler.bind(this, "lower")}
        />
        <Button
          color="green"
          title="  +  "
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
      <View style={styles.listView}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderList(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  protrait: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,

    width: Dimensions.get("window").width / 1.3,
  },
  listView: {
    width: "90%",
    flex: 1,
  },
  list: {
    borderRadius: 18,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
export default GameScreen;
