'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { UserCurveProgress } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for user_curve_progress
 */
export function useUserCurveProgress() {
  const [data, setData] = useState<UserCurveProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<UserCurveProgress[]>('/api/auto/user_curve_progress');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useUserCurveProgress(id?: string) {
  const [data, setData] = useState<UserCurveProgress | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<UserCurveProgress>( `/api/auto/user_curve_progress/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useUserCurveProgressActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<UserCurveProgress>) => {
    setIsProcessing(true);
    const result = await apiFetch<UserCurveProgress>('/api/auto/user_curve_progress', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<UserCurveProgress>) => {
    setIsProcessing(true);
    const result = await apiFetch<UserCurveProgress>( `/api/auto/user_curve_progress/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/user_curve_progress/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
