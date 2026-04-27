'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type DharmaAction = {
  id: string;
  violation_id: string;
  action_type: 'warning' | 'guidance' | 'restriction' | 'escalation';
  message: string;
  created_at: string;
};

export type DharmaViolation = {
  id: string;
  user_id: string;
  rule_id: string;
  severity: number;
  resolved: boolean;
  created_at: string;
  dharma_rule: {
    title: string;
    description: string;
    category: string;
    severity: number;
  };
  actions: DharmaAction[];
};

export type GovernanceStatus = {
  status: 'aligned' | 'under_guidance' | 'at_risk';
  violations: DharmaViolation[];
  actions: DharmaAction[];
};

/**
 * ⚖️ useDharmaGovernance Hook
 * Responsibility: Provide the UI with real-time visibility into the seeker's ethical standing and restorative actions.
 */
export function useDharmaGovernance() {
  const [data, setData] = useState<GovernanceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGovernance = useCallback(async () => {
    setLoading(true);
    const { data: fetchResult, error: fetchError } = await apiFetch<GovernanceStatus>('/intelligence/governance');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setData(fetchResult);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGovernance();
  }, [fetchGovernance]);

  return { 
    status: data?.status || 'aligned',
    violations: data?.violations || [],
    actions: data?.actions || [],
    loading, 
    error,
    refresh: fetchGovernance 
  };
}
