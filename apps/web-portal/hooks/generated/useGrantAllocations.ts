'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { GrantAllocation } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for grant_allocations
 */
export function useGrantAllocations() {
  const [data, setData] = useState<GrantAllocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<GrantAllocation[]>('/api/auto/grant_allocations');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useGrantAllocation(id?: string) {
  const [data, setData] = useState<GrantAllocation | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<GrantAllocation>( `/api/auto/grant_allocations/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useGrantAllocationActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<GrantAllocation>) => {
    setIsProcessing(true);
    const result = await apiFetch<GrantAllocation>('/api/auto/grant_allocations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<GrantAllocation>) => {
    setIsProcessing(true);
    const result = await apiFetch<GrantAllocation>( `/api/auto/grant_allocations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/grant_allocations/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
