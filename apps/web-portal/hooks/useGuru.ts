'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type GuruGuidance = {
  message: string;
  next_action: string;
  priorities: string[];
  warnings: string[];
  guidance_layers: {
    sadhana: any;
    grihastha: any;
    purushartha: any;
    karma: any;
    jyotish: any;
    samskara: any;
    mentor: any;
  };
};

/**
 * 🕉️ useGuru Hook
 * Responsibility: Provide the UI with real-time, unified institutional guidance.
 */
export function useGuru() {
  const [data, setData] = useState<GuruGuidance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuidance = useCallback(async () => {
    setLoading(true);
    const { data: fetchResult, error: fetchError } = await apiFetch<GuruGuidance>('/intelligence/guru');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setData(fetchResult);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGuidance();
  }, [fetchGuidance]);

  return { 
    message: data?.message || 'Receiving institutional guidance...',
    nextAction: data?.next_action || 'Maintaining steady practice.',
    priorities: data?.priorities || [],
    warnings: data?.warnings || [],
    layers: data?.guidance_layers || null,
    loading, 
    error,
    refresh: fetchGuidance 
  };
}
