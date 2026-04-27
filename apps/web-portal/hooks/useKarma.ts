'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type KarmaPattern = {
  type: string;
  frequency: number;
  insight: string;
  suggestion: string;
};

export type KarmaAnalysis = {
  patterns: KarmaPattern[];
  dominant_pattern: string;
  growth_direction: string;
};

/**
 * 🌀 useKarma Hook
 * Responsibility: Provide the UI with real-time behavioral pattern analysis.
 */
export function useKarma() {
  const [data, setData] = useState<KarmaAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKarma = useCallback(async () => {
    setLoading(true);
    const { data: fetchResult, error: fetchError } = await apiFetch<KarmaAnalysis>('/intelligence/karma');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setData(fetchResult);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchKarma();
  }, [fetchKarma]);

  return { 
    patterns: data?.patterns || [],
    dominantPattern: data?.dominant_pattern || 'Steady Practice',
    growthDirection: data?.growth_direction || 'Internalization',
    loading, 
    error,
    refresh: fetchKarma 
  };
}
