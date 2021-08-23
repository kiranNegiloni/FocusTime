import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (minutes) => minutes * 60 * 1000;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({
  minutes = 0.1,
  isPaused = true,
  onProgressUpdate,
  onEnd,
}) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef();

  const mins = Math.floor(millis / 1000 / 60) % 60;
  const secs = Math.floor(millis / 1000) % 60;

  const coundown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    onProgressUpdate(millis / minutesToMillis(minutes));
    if(millis === 0){
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(coundown, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(mins)}:{formatTime(secs)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    backgroundColor: 'rgba(96, 132, 236, 0.3)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
