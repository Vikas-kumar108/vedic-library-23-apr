'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { NodeRelation } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for node_relations
 */
export function useNodeRelations() {
  const [data, setData] = useState<NodeRelation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<NodeRelation[]>('/api/auto/node_relations');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useNodeRelation(id?: string) {
  const [data, setData] = useState<NodeRelation | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<NodeRelation>( `/api/auto/node_relations/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useNodeRelationActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<NodeRelation>) => {
    setIsProcessing(true);
    const result = await apiFetch<NodeRelation>('/api/auto/node_relations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<NodeRelation>) => {
    setIsProcessing(true);
    const result = await apiFetch<NodeRelation>( `/api/auto/node_relations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/node_relations/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
