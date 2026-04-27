'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type AdaptiveWeights = {
  sadhana_weight: number;
  karma_weight: number;
  mentor_weight: number;
  jyotish_weight: number;
};

export type AdaptiveState = {
  adjustments: AdaptiveWeights;
  insights: string[];
};

/**
 * 🧬 useAdaptive Hook
 * Responsibility: Provide the UI with real-time transparency into the self-optimizing guidance engine.
 */
export function useAdaptive() {
  const [data, setData] = useState<AdaptiveState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdaptive = useCallback(async () => {
    setLoading(true);
    const { data: fetchResult, error: fetchError } = await apiFetch<AdaptiveState>('/intelligence/adaptive');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setData(fetchResult);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAdaptive();
  }, [fetchAdaptive]);

  return { 
    adjustments: data?.adjustments || { sadhana_weight: 1, karma_weight: 1, mentor_weight: 1, jyotish_weight: 1 },
    insights: data?.insights || [],
    loading, 
    error,
    refresh: fetchAdaptive 
  };
}
