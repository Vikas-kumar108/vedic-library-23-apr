'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type LineageMember = {
  id: string;
  name: string;
  relation?: string;
  role?: string;
};

export type LineageView = {
  family: {
    parents: LineageMember[];
    children: LineageMember[];
    spouse?: LineageMember;
  };
  mentorship: {
    current_mentor?: LineageMember;
    students: LineageMember[];
  };
  parampara_chain: { guru: string; level: number }[];
};

/**
 * 🌳 useLineage Hook
 * Responsibility: Provide the UI with real-time biological and spiritual succession analytics.
 */
export function useLineage() {
  const [view, setView] = useState<LineageView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLineage = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await apiFetch<LineageView>('/intelligence/lineage');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setView(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLineage();
  }, [fetchLineage]);

  return { 
    familyTree: view?.family || { parents: [], children: [], spouse: null },
    mentors: view?.mentorship.current_mentor ? [view.mentorship.current_mentor] : [],
    disciples: view?.mentorship.students || [],
    parampara: view?.parampara_chain || [],
    loading, 
    error,
    refresh: fetchLineage 
  };
}
