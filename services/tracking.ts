import { GestureResponderEvent } from 'react-native';

// Initialize tracking state
const initializeTracking = () => {
  const now = Date.now();
  
  // Reset alles bij een nieuwe sessie
  localStorage.setItem('startTime', now.toString());
  localStorage.setItem('clickCount', '0');
  
  console.log('Starting new tracking session:', {
    startTime: new Date(now).toISOString(),
    clickCount: 0
  });
  
  return {
    clickCount: 0,
    startTime: now
  };
};

// Globale variabelen voor tracking
let { clickCount, startTime } = initializeTracking();

// <<< edit_1: globale participantId en setter toevoegen >>>
let participantIdGlobal = '';
export const setParticipantId = (id: string) => {
  participantIdGlobal = id;
  localStorage.setItem('participantId', id);
};
// <<< end edit_1 >>>

// Voeg een flag toe om bij te houden of er al activiteit is
let hasActivity = false;

// Functie om kliks bij te houden
export const trackClick = () => {
  hasActivity = true;  // Markeer dat er activiteit is
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem('startTime', startTime.toString());
  }

  clickCount += 1;
  localStorage.setItem('clickCount', clickCount.toString());

  const now = Date.now();
  const elapsedSeconds = Math.floor((now - startTime) / 1000);

  console.log('Click tracked!', {
    clickNumber: clickCount,
    elapsedTime: elapsedSeconds + ' seconds',
    startTime: new Date(startTime).toISOString(),
    currentTime: new Date(now).toISOString()
  });
};

// Functie om tracking te resetten
const resetTracking = () => {
  const now = Date.now();
  clickCount = 0;
  startTime = now;
  localStorage.setItem('clickCount', '0');
  localStorage.setItem('startTime', now.toString());
  
  console.log('Tracking reset for new session:', {
    startTime: new Date(now).toISOString(),
    clickCount: 0
  });
};

// Functie om de data te versturen
export const submitData = async (participantId: string) => {
  // Voeg een check toe
  if (!hasActivity) {
    console.log('No activity to submit');
    return; // Verstuur niks als er geen activiteit was
  }

  const now = Date.now();
  const duration = Math.max(0, Math.floor((now - startTime) / 1000));
  const currentClickCount = Math.max(0, clickCount);

  const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdii1wgVaa27rXzixAyfg1hahDOPd4fvASkxGVJFEArlIqYKA/formResponse';
  
  // Vervang deze IDs met de IDs uit je prefilled link
  const ENTRY_PARTICIPANT = 'entry.1993038594'; // Vervang dit nummer
  const ENTRY_CLICKS = 'entry.570226811';      // Vervang dit nummer
  const ENTRY_DURATION = 'entry.769159332';    // Vervang dit nummer

  const formData = new URLSearchParams();
  // Zorg dat de waarden in de juiste velden terechtkomen
  formData.append(ENTRY_PARTICIPANT, participantId);
  formData.append(ENTRY_CLICKS, currentClickCount.toString());
  formData.append(ENTRY_DURATION, duration.toString());

  console.log('Submitting data via FETCH:', {
    participantId,
    clickCount: currentClickCount,
    duration,
    formDataEntries: Array.from(formData.entries())
  });

  try {
    const response = await fetch(FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    console.log('Fetch submission request completed (no-cors). Status likely OK.');
  } catch (fetchError) {
    console.error('Fetch submission FAILED:', fetchError);
    throw fetchError;
  }
}; 