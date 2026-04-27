'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { FileAsset } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for file_assets
 */
export function useFileAssets() {
  const [data, setData] = useState<FileAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FileAsset[]>('/api/auto/file_assets');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useFileAsset(id?: string) {
  const [data, setData] = useState<FileAsset | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FileAsset>( `/api/auto/file_assets/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useFileAssetActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<FileAsset>) => {
    setIsProcessing(true);
    const result = await apiFetch<FileAsset>('/api/auto/file_assets', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<FileAsset>) => {
    setIsProcessing(true);
    const result = await apiFetch<FileAsset>( `/api/auto/file_assets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/file_assets/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
