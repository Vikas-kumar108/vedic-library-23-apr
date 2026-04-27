'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { TextMetadata } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for text_metadata
 */
export function useTextMetadata() {
  const [data, setData] = useState<TextMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<TextMetadata[]>('/api/auto/text_metadata');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useTextMetadata(id?: string) {
  const [data, setData] = useState<TextMetadata | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<TextMetadata>( `/api/auto/text_metadata/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useTextMetadataActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<TextMetadata>) => {
    setIsProcessing(true);
    const result = await apiFetch<TextMetadata>('/api/auto/text_metadata', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<TextMetadata>) => {
    setIsProcessing(true);
    const result = await apiFetch<TextMetadata>( `/api/auto/text_metadata/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/text_metadata/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
