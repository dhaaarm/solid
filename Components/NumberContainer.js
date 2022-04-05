import React from "react";

import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginVertical: 10,
  },
  number: {
    color: Colors.secondary,
    fontSize: 30,
  },
});
export default NumberContainer;
