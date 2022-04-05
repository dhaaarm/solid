import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Color from "../constants/colors";
import defaultStyles from "../constants/defaultStyles";
const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={defaultStyles.title}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 35,
    paddingBottom: 8,
    backgroundColor: Color.primary,
    alignItems: "center",
  },
});

export default Header;
