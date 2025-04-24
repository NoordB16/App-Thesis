import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TrackPressable } from './TrackPressable';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <TrackPressable 
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>{title}</Text>
    </TrackPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 