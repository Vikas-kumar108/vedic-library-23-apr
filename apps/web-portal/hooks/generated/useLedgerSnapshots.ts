'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { LedgerSnapshot } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for ledger_snapshots
 */
export function useLedgerSnapshots() {
  const [data, setData] = useState<LedgerSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LedgerSnapshot[]>('/api/auto/ledger_snapshots');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useLedgerSnapshot(id?: string) {
  const [data, setData] = useState<LedgerSnapshot | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LedgerSnapshot>( `/api/auto/ledger_snapshots/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useLedgerSnapshotActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<LedgerSnapshot>) => {
    setIsProcessing(true);
    const result = await apiFetch<LedgerSnapshot>('/api/auto/ledger_snapshots', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<LedgerSnapshot>) => {
    setIsProcessing(true);
    const result = await apiFetch<LedgerSnapshot>( `/api/auto/ledger_snapshots/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/ledger_snapshots/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
