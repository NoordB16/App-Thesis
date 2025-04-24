import { useEffect } from 'react';
import { setParticipantId, submitData } from './services/tracking';

export default function App() {
  useEffect(() => {
    // Set participant ID from URL
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('participantId') || '';
    setParticipantId(pid);

    // Add event listener for when user leaves/closes the page
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Prevent the handler from being called twice
      event.preventDefault();
      submitData(pid);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // ... rest van je component ...
} 