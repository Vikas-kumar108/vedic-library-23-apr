'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { PayrollRecord } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for payroll_records
 */
export function usePayrollRecords() {
  const [data, setData] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PayrollRecord[]>('/api/auto/payroll_records');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function usePayrollRecord(id?: string) {
  const [data, setData] = useState<PayrollRecord | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PayrollRecord>( `/api/auto/payroll_records/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function usePayrollRecordActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<PayrollRecord>) => {
    setIsProcessing(true);
    const result = await apiFetch<PayrollRecord>('/api/auto/payroll_records', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<PayrollRecord>) => {
    setIsProcessing(true);
    const result = await apiFetch<PayrollRecord>( `/api/auto/payroll_records/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/payroll_records/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
