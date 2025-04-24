import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { submitData } from '../services/tracking';
import { TouchTracker } from '../components/TouchTracker';

export default function RootLayout() {
  useFrameworkReady();
  const [participantId, setParticipantId] = useState<string | null>(null);

  // Haal participantId op uit URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('participantId');
    console.log('URL Search params:', window.location.search);
    console.log('Found participantId in URL:', id);
    setParticipantId(id);
  }, []);

  // Start tracking wanneer de app wordt geopend
  useEffect(() => {
    // Debug logging voor params
    console.log('Current participantId state:', participantId);
    
    if (!participantId) {
      console.warn('No participantId found in URL. Please use ?participantId=YOUR_ID in the URL');
      return;
    }

    console.log('Starting tracking for participant:', participantId);
    
    // Stuur direct data bij het openen
    try {
      console.log('Attempting to send initial data...');
      submitData(participantId);
    } catch (error) {
      console.error('Error sending initial data:', error);
    }
    
    // Stuur data elke 5 minuten
    const interval = setInterval(() => {
      try {
        console.log('Attempting to send periodic data update...');
        submitData(participantId);
      } catch (error) {
        console.error('Error sending periodic data:', error);
      }
    }, 5 * 60 * 1000);

    // Stuur data wanneer de app wordt gesloten
    const handleBeforeUnload = () => {
      try {
        console.log('App closing, attempting to send final data...');
        submitData(participantId);
      } catch (error) {
        console.error('Error sending final data:', error);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      console.log('Cleaning up tracking...');
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [participantId]);

  return (
    <TouchTracker>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="task/[id]"
          options={{
            title: 'Taak details',
          }}
        />
        <Stack.Screen
          name="task/new"
          options={{
            title: 'Nieuwe taak',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </TouchTracker>
  );
}
