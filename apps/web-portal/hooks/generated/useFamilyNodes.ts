'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { FamilyNode } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for family_nodes
 */
export function useFamilyNodes() {
  const [data, setData] = useState<FamilyNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FamilyNode[]>('/api/auto/family_nodes');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useFamilyNode(id?: string) {
  const [data, setData] = useState<FamilyNode | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<FamilyNode>( `/api/auto/family_nodes/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useFamilyNodeActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<FamilyNode>) => {
    setIsProcessing(true);
    const result = await apiFetch<FamilyNode>('/api/auto/family_nodes', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<FamilyNode>) => {
    setIsProcessing(true);
    const result = await apiFetch<FamilyNode>( `/api/auto/family_nodes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/family_nodes/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
