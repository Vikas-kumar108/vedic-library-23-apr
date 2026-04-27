'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { SpiritualVow } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for spiritual_vows
 */
export function useSpiritualVows() {
  const [data, setData] = useState<SpiritualVow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SpiritualVow[]>('/api/auto/spiritual_vows');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useSpiritualVow(id?: string) {
  const [data, setData] = useState<SpiritualVow | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SpiritualVow>( `/api/auto/spiritual_vows/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useSpiritualVowActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<SpiritualVow>) => {
    setIsProcessing(true);
    const result = await apiFetch<SpiritualVow>('/api/auto/spiritual_vows', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<SpiritualVow>) => {
    setIsProcessing(true);
    const result = await apiFetch<SpiritualVow>( `/api/auto/spiritual_vows/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/spiritual_vows/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
