'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { UtilizationCertificate } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for utilization_certificates
 */
export function useUtilizationCertificates() {
  const [data, setData] = useState<UtilizationCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<UtilizationCertificate[]>('/api/auto/utilization_certificates');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useUtilizationCertificate(id?: string) {
  const [data, setData] = useState<UtilizationCertificate | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<UtilizationCertificate>( `/api/auto/utilization_certificates/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useUtilizationCertificateActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<UtilizationCertificate>) => {
    setIsProcessing(true);
    const result = await apiFetch<UtilizationCertificate>('/api/auto/utilization_certificates', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<UtilizationCertificate>) => {
    setIsProcessing(true);
    const result = await apiFetch<UtilizationCertificate>( `/api/auto/utilization_certificates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/utilization_certificates/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
