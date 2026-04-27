'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type TensionType = 'parent_child' | 'spouse' | 'general' | 'spiritual_mismatch';
export type TensionSeverity = 'low' | 'medium' | 'high';

export type Tension = {
  type: TensionType;
  severity: TensionSeverity;
  members: string[];
  signal: string;
  suggestion: string;
};

export type HarmonyAnalysis = {
  tensions: Tension[];
  harmony_score: number;
  summary: string;
};

/**
 * 🧘 useHarmonyEngine Hook
 * Responsibility: Provide the UI with real-time relational harmony and alignment analytics.
 */
export function useHarmonyEngine(familyId: string | undefined) {
  const [analysis, setAnalysis] = useState<HarmonyAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHarmony = useCallback(async () => {
    if (!familyId) return;
    
    setLoading(true);
    const { data, error: fetchError } = await apiFetch<HarmonyAnalysis>(`/intelligence/alignment/${familyId}`);
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setAnalysis(data);
    }
    setLoading(false);
  }, [familyId]);

  useEffect(() => {
    fetchHarmony();
  }, [fetchHarmony]);

  return { 
    tensions: analysis?.tensions || [],
    harmonyScore: analysis?.harmony_score || 100,
    summary: analysis?.summary || '',
    loading, 
    error,
    refresh: fetchHarmony 
  };
}
