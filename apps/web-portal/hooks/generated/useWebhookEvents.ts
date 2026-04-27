'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { WebhookEvent } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for webhook_events
 */
export function useWebhookEvents() {
  const [data, setData] = useState<WebhookEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<WebhookEvent[]>('/api/auto/webhook_events');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useWebhookEvent(id?: string) {
  const [data, setData] = useState<WebhookEvent | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<WebhookEvent>( `/api/auto/webhook_events/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useWebhookEventActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<WebhookEvent>) => {
    setIsProcessing(true);
    const result = await apiFetch<WebhookEvent>('/api/auto/webhook_events', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<WebhookEvent>) => {
    setIsProcessing(true);
    const result = await apiFetch<WebhookEvent>( `/api/auto/webhook_events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/webhook_events/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
