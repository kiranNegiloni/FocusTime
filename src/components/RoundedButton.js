import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).button, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => StyleSheet.create({
  button: {
    borderColor: "#fff",
    borderWidth: 2,
    height: size,
    width: size,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    fontSize: size / 4
  }
});
