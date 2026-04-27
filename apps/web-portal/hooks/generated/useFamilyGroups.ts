'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { FamilyGroup } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for family_groups
 */
export function useFamilyGroups() {
  const [data, setData] = useState<FamilyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FamilyGroup[]>('/api/auto/family_groups');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useFamilyGroup(id?: string) {
  const [data, setData] = useState<FamilyGroup | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FamilyGroup>( `/api/auto/family_groups/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useFamilyGroupActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<FamilyGroup>) => {
    setIsProcessing(true);
    const result = await apiFetch<FamilyGroup>('/api/auto/family_groups', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<FamilyGroup>) => {
    setIsProcessing(true);
    const result = await apiFetch<FamilyGroup>( `/api/auto/family_groups/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/family_groups/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
