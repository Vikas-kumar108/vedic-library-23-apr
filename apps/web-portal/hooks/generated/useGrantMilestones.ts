'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { GrantMilestone } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for grant_milestones
 */
export function useGrantMilestones() {
  const [data, setData] = useState<GrantMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<GrantMilestone[]>('/api/auto/grant_milestones');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useGrantMilestone(id?: string) {
  const [data, setData] = useState<GrantMilestone | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<GrantMilestone>( `/api/auto/grant_milestones/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useGrantMilestoneActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<GrantMilestone>) => {
    setIsProcessing(true);
    const result = await apiFetch<GrantMilestone>('/api/auto/grant_milestones', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<GrantMilestone>) => {
    setIsProcessing(true);
    const result = await apiFetch<GrantMilestone>( `/api/auto/grant_milestones/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/grant_milestones/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
