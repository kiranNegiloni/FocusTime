import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChange }) => {
  return (
    <>
      <View style={styles.button}>
        <RoundedButton size={75} text="10" onPress={() => onChange(10)} />
      </View>
      <View style={styles.button}>
        <RoundedButton size={75} text="15" onPress={() => onChange(15)} />
      </View>
      <View style={styles.button}>
        <RoundedButton size={75} text="20" onPress={() => onChange(20)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center"
  }
})