import React from "react";
import { View, StyleSheet } from "react-native";
const Card = (props) => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    elevation: 15,
    padding: 15,
    borderRadius: 18,
    fontSize: 20,
    textAlign: "center",
  },
});
export default Card;