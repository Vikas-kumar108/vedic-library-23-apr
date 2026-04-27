'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { DonationCause } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for donation_causes
 */
export function useDonationCauses() {
  const [data, setData] = useState<DonationCause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<DonationCause[]>('/api/auto/donation_causes');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useDonationCause(id?: string) {
  const [data, setData] = useState<DonationCause | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<DonationCause>( `/api/auto/donation_causes/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useDonationCauseActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<DonationCause>) => {
    setIsProcessing(true);
    const result = await apiFetch<DonationCause>('/api/auto/donation_causes', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<DonationCause>) => {
    setIsProcessing(true);
    const result = await apiFetch<DonationCause>( `/api/auto/donation_causes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/donation_causes/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
