'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { FinancialAccount } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for financial_accounts
 */
export function useFinancialAccounts() {
  const [data, setData] = useState<FinancialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FinancialAccount[]>('/api/auto/financial_accounts');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useFinancialAccount(id?: string) {
  const [data, setData] = useState<FinancialAccount | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FinancialAccount>( `/api/auto/financial_accounts/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useFinancialAccountActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<FinancialAccount>) => {
    setIsProcessing(true);
    const result = await apiFetch<FinancialAccount>('/api/auto/financial_accounts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<FinancialAccount>) => {
    setIsProcessing(true);
    const result = await apiFetch<FinancialAccount>( `/api/auto/financial_accounts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/financial_accounts/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
