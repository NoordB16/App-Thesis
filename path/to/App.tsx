import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { setParticipantId, trackClick /*, submitData */ } from './services/tracking';

export default function App() {
  useEffect(() => {
    const pid = new URLSearchParams(window.location.search).get('participantId') || '';
    setParticipantId(pid);

    // <<< edit: verwijder de initiele submitData–aanroep >>>
    // submitData(pid);
    // <<< einde edit >>>
  }, []);

  return (
    <>
      {/* … je kalender-componenten … */}

      {/* De plus-knop: bij elke press trackClick aanroepen */}
      <Pressable onPress={() => trackClick()}>
        <Text>＋</Text>
      </Pressable>
    </>
  );
} 