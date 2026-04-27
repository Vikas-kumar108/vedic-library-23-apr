'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { CommunicationCampaignToLibraryItem } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for CommunicationCampaignToLibraryItem
 */
export function useCommunicationCampaignToLibraryItem() {
  const [data, setData] = useState<CommunicationCampaignToLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<CommunicationCampaignToLibraryItem[]>('/api/auto/communicationcampaigntolibraryitem');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useCommunicationCampaignToLibraryItem(id?: string) {
  const [data, setData] = useState<CommunicationCampaignToLibraryItem | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<CommunicationCampaignToLibraryItem>( `/api/auto/communicationcampaigntolibraryitem/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useCommunicationCampaignToLibraryItemActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<CommunicationCampaignToLibraryItem>) => {
    setIsProcessing(true);
    const result = await apiFetch<CommunicationCampaignToLibraryItem>('/api/auto/communicationcampaigntolibraryitem', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<CommunicationCampaignToLibraryItem>) => {
    setIsProcessing(true);
    const result = await apiFetch<CommunicationCampaignToLibraryItem>( `/api/auto/communicationcampaigntolibraryitem/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/communicationcampaigntolibraryitem/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
