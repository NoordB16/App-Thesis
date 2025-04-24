import { trackClick } from '../services/tracking';

export const useTrackPress = (onPress?: () => void) => {
  const handlePress = () => {
    // Track de klik eerst
    trackClick();
    // Voer daarna de originele onPress uit als die er is
    if (onPress) {
      onPress();
    }
  };

  return handlePress;
}; 