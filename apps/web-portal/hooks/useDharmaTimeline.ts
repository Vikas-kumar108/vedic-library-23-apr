'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type DharmaEvent = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  event_date: string;
  impact: number;
};

export type DharmaTimelineData = {
  past: {
    events: DharmaEvent[];
    patterns: string[];
  };
  present: {
    state: string;
    purushartha: any;
    karma_summary: string;
    grihastha_plan: any;
  };
  future: {
    trajectory: string;
    risks: string[];
    opportunities: string[];
  };
};

/**
 * ⏳ useDharmaTimeline Hook
 * Responsibility: Provide the UI with real-time, longitudinal seeker evolution data.
 */
export function useDharmaTimeline() {
  const [data, setData] = useState<DharmaTimelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTimeline = useCallback(async () => {
    setLoading(true);
    const { data: fetchResult, error: fetchError } = await apiFetch<DharmaTimelineData>('/intelligence/timeline');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setData(fetchResult);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  return { 
    past: data?.past || { events: [], patterns: [] },
    present: data?.present || null,
    future: data?.future || { trajectory: 'Auspicious Growth', risks: [], opportunities: [] },
    loading, 
    error,
    refresh: fetchTimeline 
  };
}
