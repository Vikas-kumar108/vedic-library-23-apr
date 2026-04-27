'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type JyotishPhase = {
  current_phase: string;
  focus: string[];
  challenges: string[];
  opportunities: string[];
};

/**
 * 🌠 useJyotish Hook
 * Responsibility: Provide the UI with real-time temporal and life-phase analytics.
 */
export function useJyotish() {
  const [data, setData] = useState<JyotishPhase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJyotish = useCallback(async () => {
    setLoading(true);
    const { data: fetchResult, error: fetchError } = await apiFetch<JyotishPhase>('/intelligence/jyotish');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setData(fetchResult);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchJyotish();
  }, [fetchJyotish]);

  return { 
    phase: data?.current_phase || 'Determining...',
    focus: data?.focus || [],
    challenges: data?.challenges || [],
    opportunities: data?.opportunities || [],
    loading, 
    error,
    refresh: fetchJyotish 
  };
}
