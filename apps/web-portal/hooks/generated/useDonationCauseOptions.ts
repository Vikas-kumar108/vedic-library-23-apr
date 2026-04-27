'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { DonationCauseOption } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for donation_cause_options
 */
export function useDonationCauseOptions() {
  const [data, setData] = useState<DonationCauseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<DonationCauseOption[]>('/api/auto/donation_cause_options');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useDonationCauseOption(id?: string) {
  const [data, setData] = useState<DonationCauseOption | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<DonationCauseOption>( `/api/auto/donation_cause_options/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useDonationCauseOptionActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<DonationCauseOption>) => {
    setIsProcessing(true);
    const result = await apiFetch<DonationCauseOption>('/api/auto/donation_cause_options', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<DonationCauseOption>) => {
    setIsProcessing(true);
    const result = await apiFetch<DonationCauseOption>( `/api/auto/donation_cause_options/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/donation_cause_options/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
