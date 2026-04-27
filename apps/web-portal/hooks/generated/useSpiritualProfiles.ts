'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { SpiritualProfile } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for spiritual_profiles
 */
export function useSpiritualProfiles() {
  const [data, setData] = useState<SpiritualProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SpiritualProfile[]>('/api/auto/spiritual_profiles');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useSpiritualProfile(id?: string) {
  const [data, setData] = useState<SpiritualProfile | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SpiritualProfile>( `/api/auto/spiritual_profiles/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useSpiritualProfileActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<SpiritualProfile>) => {
    setIsProcessing(true);
    const result = await apiFetch<SpiritualProfile>('/api/auto/spiritual_profiles', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<SpiritualProfile>) => {
    setIsProcessing(true);
    const result = await apiFetch<SpiritualProfile>( `/api/auto/spiritual_profiles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/spiritual_profiles/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
