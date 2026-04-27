'use client'

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { LearningCurveStep } from '@dharma/contracts';

/**
 * 🧘 Type-safe Hooks for learning_curve_steps
 */
export function useLearningCurveSteps() {
  const [data, setData] = useState<LearningCurveStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LearningCurveStep[]>('/api/auto/learning_curve_steps');
    if (fetchError) setError(fetchError);
    else setData(result || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

export function useLearningCurveStep(id?: string) {
  const [data, setData] = useState<LearningCurveStep | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: result, error: fetchError } = await apiFetch<LearningCurveStep>( `/api/auto/learning_curve_steps/${id}` );
    if (fetchError) setError(fetchError);
    else setData(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { data, loading, error, refresh: fetchOne };
}

export function useLearningCurveStepActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const create = async (payload: Partial<LearningCurveStep>) => {
    setIsProcessing(true);
    const result = await apiFetch<LearningCurveStep>('/api/auto/learning_curve_steps', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const update = async (id: string, payload: Partial<LearningCurveStep>) => {
    setIsProcessing(true);
    const result = await apiFetch<LearningCurveStep>( `/api/auto/learning_curve_steps/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setIsProcessing(false);
    return result;
  };

  const remove = async (id: string) => {
    setIsProcessing(true);
    const result = await apiFetch( `/api/auto/learning_curve_steps/${id}`, {
      method: 'DELETE',
    });
    setIsProcessing(false);
    return result;
  };

  return { create, update, remove, isProcessing };
}
