'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { NodeTag } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for node_tags
 */
export function useNodeTags() {
  const [data, setData] = useState<NodeTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<NodeTag[]>('/api/auto/node_tags');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useNodeTag(id?: string) {
  const [data, setData] = useState<NodeTag | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<NodeTag>( `/api/auto/node_tags/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useNodeTagActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<NodeTag>) => {
    setIsProcessing(true);
    const result = await apiFetch<NodeTag>('/api/auto/node_tags', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<NodeTag>) => {
    setIsProcessing(true);
    const result = await apiFetch<NodeTag>( `/api/auto/node_tags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/node_tags/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
