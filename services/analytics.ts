import { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { submitToGoogleForm } from './form-submission';

interface AnalyticsData {
  participantId: string;
  clicks: number;
  startTime: Date;
  lastInteraction: Date;
  pageViews: { [key: string]: number };
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private data: AnalyticsData;
  private isInitialized = false;

  private constructor() {
    this.data = {
      participantId: '',
      clicks: 0,
      startTime: new Date(),
      lastInteraction: new Date(),
      pageViews: {},
    };
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public initialize(participantId: string) {
    if (!this.isInitialized) {
      this.data.participantId = participantId;
      this.data.startTime = new Date();
      this.isInitialized = true;
      this.setupAutoSubmit();
    }
  }

  public trackClick() {
    this.data.clicks++;
    this.data.lastInteraction = new Date();
  }

  public trackPageView(page: string) {
    this.data.pageViews[page] = (this.data.pageViews[page] || 0) + 1;
    this.data.lastInteraction = new Date();
  }

  private async submitData() {
    const duration = Math.floor((new Date().getTime() - this.data.startTime.getTime()) / 1000);
    
    await submitToGoogleForm({
      participantId: this.data.participantId,
      clicks: this.data.clicks,
      duration: duration,
      pageViews: JSON.stringify(this.data.pageViews),
    });
  }

  private setupAutoSubmit() {
    // Submit data elke 5 minuten
    setInterval(() => {
      this.submitData();
    }, 5 * 60 * 1000);

    // Submit data wanneer de gebruiker de app verlaat
    window.addEventListener('beforeunload', () => {
      this.submitData();
    });
  }
}

export const useAnalytics = () => {
  const pathname = usePathname();
  const { participantId } = useLocalSearchParams();
  const analytics = AnalyticsService.getInstance();

  useEffect(() => {
    if (participantId) {
      analytics.initialize(participantId as string);
    }
  }, [participantId]);

  useEffect(() => {
    analytics.trackPageView(pathname);
  }, [pathname]);

  return analytics;
};

export default AnalyticsService; 