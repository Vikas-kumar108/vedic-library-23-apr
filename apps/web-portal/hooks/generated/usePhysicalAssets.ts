'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { PhysicalAsset } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for physical_assets
 */
export function usePhysicalAssets() {
  const [data, setData] = useState<PhysicalAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PhysicalAsset[]>('/api/auto/physical_assets');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function usePhysicalAsset(id?: string) {
  const [data, setData] = useState<PhysicalAsset | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PhysicalAsset>( `/api/auto/physical_assets/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function usePhysicalAssetActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<PhysicalAsset>) => {
    setIsProcessing(true);
    const result = await apiFetch<PhysicalAsset>('/api/auto/physical_assets', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<PhysicalAsset>) => {
    setIsProcessing(true);
    const result = await apiFetch<PhysicalAsset>( `/api/auto/physical_assets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/physical_assets/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
