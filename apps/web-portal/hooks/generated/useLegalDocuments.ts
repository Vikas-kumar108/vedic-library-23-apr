'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { LegalDocument } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for legal_documents
 */
export function useLegalDocuments() {
  const [data, setData] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LegalDocument[]>('/api/auto/legal_documents');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useLegalDocument(id?: string) {
  const [data, setData] = useState<LegalDocument | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LegalDocument>( `/api/auto/legal_documents/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useLegalDocumentActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<LegalDocument>) => {
    setIsProcessing(true);
    const result = await apiFetch<LegalDocument>('/api/auto/legal_documents', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<LegalDocument>) => {
    setIsProcessing(true);
    const result = await apiFetch<LegalDocument>( `/api/auto/legal_documents/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/legal_documents/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
