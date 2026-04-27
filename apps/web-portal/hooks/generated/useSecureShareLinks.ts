'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { SecureShareLink } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for secure_share_links
 */
export function useSecureShareLinks() {
  const [data, setData] = useState<SecureShareLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SecureShareLink[]>('/api/auto/secure_share_links');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useSecureShareLink(id?: string) {
  const [data, setData] = useState<SecureShareLink | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<SecureShareLink>( `/api/auto/secure_share_links/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useSecureShareLinkActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<SecureShareLink>) => {
    setIsProcessing(true);
    const result = await apiFetch<SecureShareLink>('/api/auto/secure_share_links', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<SecureShareLink>) => {
    setIsProcessing(true);
    const result = await apiFetch<SecureShareLink>( `/api/auto/secure_share_links/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/secure_share_links/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
