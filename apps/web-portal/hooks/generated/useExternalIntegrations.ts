'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { ExternalIntegration } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for external_integrations
 */
export function useExternalIntegrations() {
  const [data, setData] = useState<ExternalIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<ExternalIntegration[]>('/api/auto/external_integrations');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useExternalIntegration(id?: string) {
  const [data, setData] = useState<ExternalIntegration | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<ExternalIntegration>( `/api/auto/external_integrations/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useExternalIntegrationActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<ExternalIntegration>) => {
    setIsProcessing(true);
    const result = await apiFetch<ExternalIntegration>('/api/auto/external_integrations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<ExternalIntegration>) => {
    setIsProcessing(true);
    const result = await apiFetch<ExternalIntegration>( `/api/auto/external_integrations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/external_integrations/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
