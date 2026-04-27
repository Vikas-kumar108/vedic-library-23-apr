'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { TextVersion } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for text_versions
 */
export function useTextVersions() {
  const [data, setData] = useState<TextVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<TextVersion[]>('/api/auto/text_versions');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useTextVersion(id?: string) {
  const [data, setData] = useState<TextVersion | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<TextVersion>( `/api/auto/text_versions/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useTextVersionActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<TextVersion>) => {
    setIsProcessing(true);
    const result = await apiFetch<TextVersion>('/api/auto/text_versions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<TextVersion>) => {
    setIsProcessing(true);
    const result = await apiFetch<TextVersion>( `/api/auto/text_versions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/text_versions/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
