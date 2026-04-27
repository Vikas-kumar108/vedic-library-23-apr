'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { SubscriptionTier } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for subscription_tiers
 */
export function useSubscriptionTiers() {
  const [data, setData] = useState<SubscriptionTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SubscriptionTier[]>('/api/auto/subscription_tiers');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useSubscriptionTier(id?: string) {
  const [data, setData] = useState<SubscriptionTier | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SubscriptionTier>( `/api/auto/subscription_tiers/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useSubscriptionTierActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<SubscriptionTier>) => {
    setIsProcessing(true);
    const result = await apiFetch<SubscriptionTier>('/api/auto/subscription_tiers', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<SubscriptionTier>) => {
    setIsProcessing(true);
    const result = await apiFetch<SubscriptionTier>( `/api/auto/subscription_tiers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/subscription_tiers/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
