'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { EventRegistration } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for event_registrations
 */
export function useEventRegistrations() {
  const [data, setData] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<EventRegistration[]>('/api/auto/event_registrations');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useEventRegistration(id?: string) {
  const [data, setData] = useState<EventRegistration | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<EventRegistration>( `/api/auto/event_registrations/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useEventRegistrationActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<EventRegistration>) => {
    setIsProcessing(true);
    const result = await apiFetch<EventRegistration>('/api/auto/event_registrations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<EventRegistration>) => {
    setIsProcessing(true);
    const result = await apiFetch<EventRegistration>( `/api/auto/event_registrations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/event_registrations/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
