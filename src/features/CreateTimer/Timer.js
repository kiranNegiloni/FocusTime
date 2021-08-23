import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useKeepAwake } from 'expo-keep-awake';

import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_MIN = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, onCancelSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_MIN);
  const [progress, setProgress] = useState(1);

  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(Vibration.vibrate(), 1000);

      setTimeout(() => {
        clearInterval(interval);
      }, 10000);
    } else {
      Vibration.vibrate(10000);
    }
  }

  const onEnd = () => {
    //vibrate();
    setMinutes(DEFAULT_MIN);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min);
    setIsStarted(false);
    setProgress(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdownStyle}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgressUpdate={(progress) => setProgress(progress)}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.lg }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ padding: spacing.md }}>
        <ProgressBar
          progress={progress}
          color={colors.lightBlue}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChange={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton text="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton text="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={{paddingLeft: 20, paddingBottom: 20}}>
        <RoundedButton size={50} text="-" onPress={() => onCancelSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdownStyle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
