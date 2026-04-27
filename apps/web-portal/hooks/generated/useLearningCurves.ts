'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { LearningCurve } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for learning_curves
 */
export function useLearningCurves() {
  const [data, setData] = useState<LearningCurve[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LearningCurve[]>('/api/auto/learning_curves');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useLearningCurve(id?: string) {
  const [data, setData] = useState<LearningCurve | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LearningCurve>( `/api/auto/learning_curves/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useLearningCurveActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<LearningCurve>) => {
    setIsProcessing(true);
    const result = await apiFetch<LearningCurve>('/api/auto/learning_curves', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<LearningCurve>) => {
    setIsProcessing(true);
    const result = await apiFetch<LearningCurve>( `/api/auto/learning_curves/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/learning_curves/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
