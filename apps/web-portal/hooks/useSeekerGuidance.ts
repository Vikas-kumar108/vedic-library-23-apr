'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type SadhanaPlan = {
  morning_practice: string;
  study_focus: string;
  reflection: string;
  discipline: string;
  avoidance: string;
};

export type GrihasthaPlan = {
  spiritual_duty: string;
  family_duty: string;
  livelihood_focus: string;
  lifestyle_guidance: string;
  risk_flags: string[];
};

export type PurusharthaBalance = {
  dharma: number;
  artha: number;
  kama: number;
  moksha: number;
  balance_type: string;
  insight: string;
};

export type Guidance = {
  message: string;
  next_action: string;
  recommended_node_id: string | null;
  sadhana: SadhanaPlan;
  grihastha: GrihasthaPlan;
  purushartha: PurusharthaBalance;
};

/**
 * 🧘 useSeekerGuidance Hook
 * Responsibility: Provide the UI with real-time spiritual directives from the Intelligence layer.
 */
export function useSeekerGuidance() {
  const [data, setData] = useState<Guidance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuidance = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<Guidance>('/intelligence/guidance');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setData(result);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGuidance();
  }, [fetchGuidance]);

  return { 
    guidance: data,
    sadhana: data?.sadhana || null,
    grihastha: data?.grihastha || null,
    purushartha: data?.purushartha || null,
    loading, 
    error,
    refresh: fetchGuidance 
  };
}
