'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { PartnerOrganization } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for partner_organizations
 */
export function usePartnerOrganizations() {
  const [data, setData] = useState<PartnerOrganization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PartnerOrganization[]>('/api/auto/partner_organizations');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function usePartnerOrganization(id?: string) {
  const [data, setData] = useState<PartnerOrganization | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<PartnerOrganization>( `/api/auto/partner_organizations/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function usePartnerOrganizationActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<PartnerOrganization>) => {
    setIsProcessing(true);
    const result = await apiFetch<PartnerOrganization>('/api/auto/partner_organizations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<PartnerOrganization>) => {
    setIsProcessing(true);
    const result = await apiFetch<PartnerOrganization>( `/api/auto/partner_organizations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/partner_organizations/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
