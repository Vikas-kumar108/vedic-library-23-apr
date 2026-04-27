'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type CommunityHealth = {
  population: number;
  dharma_score: number;
  moksha_score: number;
  harmony_score: number;
  risk_flags: string[];
  insights: string[];
  recommendations: string[];
};

/**
 * 🏘️ useCommunity Hook
 * Responsibility: Provide the UI with real-time collective Dharmic health analytics.
 */
export function useCommunity(communityId?: string) {
  const [community, setCommunity] = useState<CommunityHealth | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityHealth = useCallback(async () => {
    if (!communityId) return;
    
    setLoading(true);
    const { data, error: fetchError } = await apiFetch<CommunityHealth>(`/intelligence/community/${communityId}`);
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setCommunity(data);
    }
    setLoading(false);
  }, [communityId]);

  useEffect(() => {
    fetchCommunityHealth();
  }, [fetchCommunityHealth]);

  return { 
    community,
    loading, 
    error,
    refresh: fetchCommunityHealth 
  };
}
