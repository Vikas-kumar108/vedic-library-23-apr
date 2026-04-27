'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { CirclePost } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for circle_posts
 */
export function useCirclePosts() {
  const [data, setData] = useState<CirclePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<CirclePost[]>('/api/auto/circle_posts');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useCirclePost(id?: string) {
  const [data, setData] = useState<CirclePost | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<CirclePost>( `/api/auto/circle_posts/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useCirclePostActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<CirclePost>) => {
    setIsProcessing(true);
    const result = await apiFetch<CirclePost>('/api/auto/circle_posts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<CirclePost>) => {
    setIsProcessing(true);
    const result = await apiFetch<CirclePost>( `/api/auto/circle_posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/circle_posts/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
