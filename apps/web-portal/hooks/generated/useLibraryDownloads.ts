'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { LibraryDownload } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for library_downloads
 */
export function useLibraryDownloads() {
  const [data, setData] = useState<LibraryDownload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LibraryDownload[]>('/api/auto/library_downloads');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useLibraryDownload(id?: string) {
  const [data, setData] = useState<LibraryDownload | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LibraryDownload>( `/api/auto/library_downloads/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useLibraryDownloadActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<LibraryDownload>) => {
    setIsProcessing(true);
    const result = await apiFetch<LibraryDownload>('/api/auto/library_downloads', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<LibraryDownload>) => {
    setIsProcessing(true);
    const result = await apiFetch<LibraryDownload>( `/api/auto/library_downloads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/library_downloads/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
