import React, { useEffect } from 'react';
import { View } from 'react-native';
import { trackClick } from '../services/tracking';

interface TouchTrackerProps {
  children: React.ReactNode;
}

export const TouchTracker: React.FC<TouchTrackerProps> = ({ children }) => {
  useEffect(() => {
    // Voeg een globale event listener toe in de capturing fase
    const handleInteraction = (event: Event) => {
      // Voorkom dubbele events van touchstart + click
      if (event.type === 'click') {
        trackClick();
      }
    };

    // Alleen click events gebruiken om dubbele registratie te voorkomen
    document.addEventListener('click', handleInteraction, true);

    return () => {
      // Cleanup
      document.removeEventListener('click', handleInteraction, true);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
}; 