'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '@/lib/api'

export type MentorshipType = 'spiritual' | 'emotional' | 'family' | 'advanced_study';
export type MentorshipUrgency = 'low' | 'medium' | 'high';

export type MentorshipPlan = {
  mentor_required: boolean;
  reason: string;
  urgency: MentorshipUrgency;
  suggested_mentor_id?: string;
  mentorship_type: MentorshipType;
  suggested_action: string;
};

/**
 * 🎓 useMentor Hook
 * Responsibility: Provide the UI with real-time mentorship requirements and assignments.
 */
export function useMentor() {
  const [plan, setPlan] = useState<MentorshipPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMentorship = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await apiFetch<MentorshipPlan>('/intelligence/mentor');
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setPlan(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMentorship();
  }, [fetchMentorship]);

  return { 
    mentorRequired: plan?.mentor_required || false,
    reason: plan?.reason || '',
    urgency: plan?.urgency || 'low',
    mentorId: plan?.suggested_mentor_id || null,
    type: plan?.mentorship_type || 'spiritual',
    suggestedAction: plan?.suggested_action || '',
    loading, 
    error,
    refresh: fetchMentorship 
  };
}
