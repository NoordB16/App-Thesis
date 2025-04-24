let participantIdGlobal = '';
export const setParticipantId = (id: string) => {
  participantIdGlobal = id;
  localStorage.setItem('participantId', id);
};

export const trackClick = () => {
  // ... existing increment en logica ...

  const CLICK_THRESHOLD = 5;
  if (clickCount >= CLICK_THRESHOLD && participantIdGlobal) {
    console.log(`Threshold ${CLICK_THRESHOLD} bereikt, verzenden…`);
    submitData(participantIdGlobal);
  }
};

// ... existing submitData en overige code ... 