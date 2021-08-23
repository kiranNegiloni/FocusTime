import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const historyItem = ({ item, index }) => {
  return (
    <Text
      style={{
        color: item.status > 1 ? colors.incomplete : colors.complete,
      }}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({ history, onClear }) => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      {history.length > 0 && (
        <>
          <Text style={styles.title}>Things you've focused on</Text>
          <FlatList data={history} renderItem={historyItem} />
          <View style={{ marginBottom: spacing.md }}>
            <RoundedButton size={75} text="Clear" onPress={onClear} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
});
