import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../constants/colors";
import Colors from "../constants/colors";

import defaultStyles from "../constants/defaultStyles";

const GameOver = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={defaultStyles.title}>Game Over</Text>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={1500}
            resizeMode="cover"
            style={styles.image}
            source={require("../assets/success.png")}
            // source={{
            //   uri: "https://media.istockphoto.com/photos/colored-powder-explosion-abstract-closeup-dust-on-backdrop-colorful-picture-id1072093690?k=20&m=1072093690&s=612x612&w=0&h=Ns3WeEm1VrIHhZOmhiGY_fYKvIlbJrVADLqfxyPQVPM=",
            // }}
          />
        </View>
        <View>
          <Text style={defaultStyles.bodyText}>
            Your Phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </Text>
        </View>

        <View style={{ padding: 20 }}>
          <Button
            color={Colors.primary}
            title="Start New Game"
            onPress={props.onRestart}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 150,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePortrait: {
    width: 100,
    height: 100,
  },
  highlight: {
    color: colors.secondary,
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});

export default GameOver;
