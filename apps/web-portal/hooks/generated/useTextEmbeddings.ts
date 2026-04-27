'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { TextEmbedding } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for text_embeddings
 */
export function useTextEmbeddings() {
  const [data, setData] = useState<TextEmbedding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<TextEmbedding[]>('/api/auto/text_embeddings');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useTextEmbedding(id?: string) {
  const [data, setData] = useState<TextEmbedding | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<TextEmbedding>( `/api/auto/text_embeddings/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useTextEmbeddingActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<TextEmbedding>) => {
    setIsProcessing(true);
    const result = await apiFetch<TextEmbedding>('/api/auto/text_embeddings', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<TextEmbedding>) => {
    setIsProcessing(true);
    const result = await apiFetch<TextEmbedding>( `/api/auto/text_embeddings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/text_embeddings/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
