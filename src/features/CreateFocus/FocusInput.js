import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const FocusInput = ({ addSubject }) => {
  const [input, setInput] = useState('');
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onSubmitEditing={({ nativeEvent }) => setInput(nativeEvent.text)}
          style={styles.input}
        />
        <RoundedButton size={50} text="+" onPress={() => addSubject(input)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    color: colors.white,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
  },
});
