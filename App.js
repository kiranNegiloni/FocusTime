import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FocusInput } from "./src/features/CreateFocus/FocusInput";
import { FocusHistory } from "./src/features/CreateFocus/FocusHistory";
import { Timer } from "./src/features/CreateTimer/Timer";
import { colors } from "./src/utils/colors";

const STATUS = {
  completed: 1,
  cancelled: 2,
};

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const timerFeature = () => {
    return (
      <Timer
        focusSubject={focusSubject}
        onTimerEnd={() => {
          setFocusSubject(null);
          setFocusHistory([
            ...focusHistory,
            {
              key: String(focusHistory.length + 1),
              subject: focusSubject,
              status: STATUS.completed,
            },
          ]);
        }}
        onCancelSubject={() => {
          setFocusSubject(null);
          setFocusHistory([
            ...focusHistory,
            {
              key: focusHistory.length + 1,
              subject: focusSubject,
              status: STATUS.cancelled,
            },
          ]);
        }}
      />
    );
  };

  const focusFeature = () => {
    return (
      <View style={{ flex: 1 }}>
        <FocusInput addSubject={setFocusSubject} />
        <FocusHistory
          history={focusHistory}
          onClear={() => setFocusHistory([])}
        />
      </View>
    );
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.screen}>
      {focusSubject ? timerFeature() : focusFeature()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});

export default App;
