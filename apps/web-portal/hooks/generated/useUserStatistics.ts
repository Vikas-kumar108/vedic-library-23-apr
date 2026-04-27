'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { UserStatistic } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for user_statistics
 */
export function useUserStatistics() {
  const [data, setData] = useState<UserStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<UserStatistic[]>('/api/auto/user_statistics');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useUserStatistic(id?: string) {
  const [data, setData] = useState<UserStatistic | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<UserStatistic>( `/api/auto/user_statistics/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useUserStatisticActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<UserStatistic>) => {
    setIsProcessing(true);
    const result = await apiFetch<UserStatistic>('/api/auto/user_statistics', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<UserStatistic>) => {
    setIsProcessing(true);
    const result = await apiFetch<UserStatistic>( `/api/auto/user_statistics/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/user_statistics/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
