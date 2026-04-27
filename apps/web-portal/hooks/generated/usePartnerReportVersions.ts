'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { PartnerReportVersion } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for partner_report_versions
 */
export function usePartnerReportVersions() {
  const [data, setData] = useState<PartnerReportVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PartnerReportVersion[]>('/api/auto/partner_report_versions');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function usePartnerReportVersion(id?: string) {
  const [data, setData] = useState<PartnerReportVersion | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PartnerReportVersion>( `/api/auto/partner_report_versions/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function usePartnerReportVersionActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<PartnerReportVersion>) => {
    setIsProcessing(true);
    const result = await apiFetch<PartnerReportVersion>('/api/auto/partner_report_versions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<PartnerReportVersion>) => {
    setIsProcessing(true);
    const result = await apiFetch<PartnerReportVersion>( `/api/auto/partner_report_versions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/partner_report_versions/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
