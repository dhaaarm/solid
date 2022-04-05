import React from "react";
import { TextInput, StyleSheet } from "react-native";
const Input = (props) => {
  return (
    <TextInput {...props} style={{ ...styles.inputText, ...props.style }} />
  );
};
const styles = StyleSheet.create({
  inputText: {
    //height: 20,
    //backgroundColor:"pink",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize:25,
    marginVertical: 10,
  },
});
export default Input;
