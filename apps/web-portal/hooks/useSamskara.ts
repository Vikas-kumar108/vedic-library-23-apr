'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type SamskaraItem = {
  type: string;
  recommended_age: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
};

export type SamskaraTimeline = {
  upcoming: SamskaraItem[];
  overdue: SamskaraItem[];
  completed: string[];
};

/**
 * 🕉️ useSamskara Hook
 * Responsibility: Provide the UI with real-time life-stage milestone analytics.
 */
export function useSamskara() {
  const [timeline, setTimeline] = useState<SamskaraTimeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSamskaras = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await apiFetch<SamskaraTimeline>('/intelligence/samskara');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setTimeline(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSamskaras();
  }, [fetchSamskaras]);

  return { 
    upcoming: timeline?.upcoming || [],
    overdue: timeline?.overdue || [],
    completed: timeline?.completed || [],
    loading, 
    error,
    refresh: fetchSamskaras 
  };
}
