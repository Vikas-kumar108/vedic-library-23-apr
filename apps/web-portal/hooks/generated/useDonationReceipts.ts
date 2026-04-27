'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { DonationReceipt } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for donation_receipts
 */
export function useDonationReceipts() {
  const [data, setData] = useState<DonationReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<DonationReceipt[]>('/api/auto/donation_receipts');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useDonationReceipt(id?: string) {
  const [data, setData] = useState<DonationReceipt | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<DonationReceipt>( `/api/auto/donation_receipts/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useDonationReceiptActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<DonationReceipt>) => {
    setIsProcessing(true);
    const result = await apiFetch<DonationReceipt>('/api/auto/donation_receipts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<DonationReceipt>) => {
    setIsProcessing(true);
    const result = await apiFetch<DonationReceipt>( `/api/auto/donation_receipts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/donation_receipts/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
