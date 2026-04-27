'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { CommunicationCampaign } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for communication_campaigns
 */
export function useCommunicationCampaigns() {
  const [data, setData] = useState<CommunicationCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<CommunicationCampaign[]>('/api/auto/communication_campaigns');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useCommunicationCampaign(id?: string) {
  const [data, setData] = useState<CommunicationCampaign | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<CommunicationCampaign>( `/api/auto/communication_campaigns/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useCommunicationCampaignActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<CommunicationCampaign>) => {
    setIsProcessing(true);
    const result = await apiFetch<CommunicationCampaign>('/api/auto/communication_campaigns', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<CommunicationCampaign>) => {
    setIsProcessing(true);
    const result = await apiFetch<CommunicationCampaign>( `/api/auto/communication_campaigns/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/communication_campaigns/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
