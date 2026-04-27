'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type FamilyMember = {
  id: string;
  name: string;
  role: string;
  life_stage: string;
  inner_state: string;
  risk_flags: string[];
};

export type FamilyDashboard = {
  members: FamilyMember[];
  family_dharma_score: number;
  family_moksha_score: number;
  alerts: string[];
  recommendation: string;
};

/**
 * 👪 useFamilyDashboard Hook
 * Responsibility: Provide the UI with collective intelligence for a family unit.
 */
export function useFamilyDashboard(familyId: string | undefined) {
  const [family, setFamily] = useState<FamilyDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!familyId) return;
    
    setLoading(true);
    const { data, error: fetchError } = await apiFetch<FamilyDashboard>(`/intelligence/family/${familyId}`);
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setFamily(data);
    }
    setLoading(false);
  }, [familyId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { 
    family, 
    loading, 
    error, 
    refresh: fetchDashboard 
  };
}
