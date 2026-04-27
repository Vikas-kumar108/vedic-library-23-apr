'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { PaymentRecord } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for payment_records
 */
export function usePaymentRecords() {
  const [data, setData] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PaymentRecord[]>('/api/auto/payment_records');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function usePaymentRecord(id?: string) {
  const [data, setData] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PaymentRecord>( `/api/auto/payment_records/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function usePaymentRecordActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<PaymentRecord>) => {
    setIsProcessing(true);
    const result = await apiFetch<PaymentRecord>('/api/auto/payment_records', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<PaymentRecord>) => {
    setIsProcessing(true);
    const result = await apiFetch<PaymentRecord>( `/api/auto/payment_records/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/payment_records/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
