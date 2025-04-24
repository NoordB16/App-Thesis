import React from 'react';
import { Pressable, PressableProps, GestureResponderEvent } from 'react-native';
import { useTrackPress } from '../hooks/useTrackPress';

interface TrackPressableProps extends PressableProps {
  children: React.ReactNode;
}

export const TrackPressable: React.FC<TrackPressableProps> = ({ 
  onPress, 
  children,
  ...props 
}) => {
  const handlePress = useTrackPress(
    onPress ? () => onPress({} as GestureResponderEvent) : undefined
  );

  return (
    <Pressable {...props} onPress={handlePress}>
      {children}
    </Pressable>
  );
}; 