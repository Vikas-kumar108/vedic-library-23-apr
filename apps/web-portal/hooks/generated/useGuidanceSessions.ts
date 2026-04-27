'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { GuidanceSession } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for guidance_sessions
 */
export function useGuidanceSessions() {
  const [data, setData] = useState<GuidanceSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<GuidanceSession[]>('/api/auto/guidance_sessions');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useGuidanceSession(id?: string) {
  const [data, setData] = useState<GuidanceSession | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<GuidanceSession>( `/api/auto/guidance_sessions/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useGuidanceSessionActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<GuidanceSession>) => {
    setIsProcessing(true);
    const result = await apiFetch<GuidanceSession>('/api/auto/guidance_sessions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<GuidanceSession>) => {
    setIsProcessing(true);
    const result = await apiFetch<GuidanceSession>( `/api/auto/guidance_sessions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/guidance_sessions/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
