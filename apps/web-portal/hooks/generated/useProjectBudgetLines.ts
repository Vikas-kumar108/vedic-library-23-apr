'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { ProjectBudgetLine } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for project_budget_lines
 */
export function useProjectBudgetLines() {
  const [data, setData] = useState<ProjectBudgetLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<ProjectBudgetLine[]>('/api/auto/project_budget_lines');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useProjectBudgetLine(id?: string) {
  const [data, setData] = useState<ProjectBudgetLine | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<ProjectBudgetLine>( `/api/auto/project_budget_lines/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useProjectBudgetLineActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<ProjectBudgetLine>) => {
    setIsProcessing(true);
    const result = await apiFetch<ProjectBudgetLine>('/api/auto/project_budget_lines', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<ProjectBudgetLine>) => {
    setIsProcessing(true);
    const result = await apiFetch<ProjectBudgetLine>( `/api/auto/project_budget_lines/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/project_budget_lines/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
