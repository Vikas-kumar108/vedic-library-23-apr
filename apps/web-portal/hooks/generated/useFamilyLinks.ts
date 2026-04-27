'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { FamilyLink } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for family_links
 */
export function useFamilyLinks() {
  const [data, setData] = useState<FamilyLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FamilyLink[]>('/api/auto/family_links');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useFamilyLink(id?: string) {
  const [data, setData] = useState<FamilyLink | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FamilyLink>( `/api/auto/family_links/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useFamilyLinkActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<FamilyLink>) => {
    setIsProcessing(true);
    const result = await apiFetch<FamilyLink>('/api/auto/family_links', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<FamilyLink>) => {
    setIsProcessing(true);
    const result = await apiFetch<FamilyLink>( `/api/auto/family_links/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/family_links/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
