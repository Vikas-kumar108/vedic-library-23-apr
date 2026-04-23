'use client'

import { useAuth } from './useAuth'

/**
 * useAccess Hook
 * Responsibility: Provide real-time access decisions for UI components.
 * Purpose: Gating content based on Role + Life Stage + Relationship.
 */
export function useAccess(node?: { id: string, type?: string }) {
  const { user, isAdmin } = useAuth()

  // 1. Level 1: Admin bypass
  if (isAdmin) return { canAccess: true, reason: null }

  // 2. Logic: Local simulation of the Vedic-Aware algorithm
  // In a real app, this would query the backend or use a cached permissions manifest
  const checkAccess = () => {
    if (!node) return { canAccess: true, reason: null }

    // Example: Restriction for "Grihastha" content
    if (node.type === 'GRIHASTHA_DHARMA' && user?.stage !== 'GRIHASTHA') {
      return { 
        canAccess: false, 
        reason: 'This teaching is specifically for those in the Householder stage of life.' 
      }
    }

    return { canAccess: true, reason: null }
  }

  const { canAccess, reason } = checkAccess()

  return { canAccess, reason }
}

/**
 * usePermissions Hook
 * Responsibility: Expose granular capabilities based on user role.
 */
export function usePermissions() {
  const { user } = useAuth()

  return {
    canEditContent: user?.role === 'ADMIN' || user?.role === 'TEACHER',
    canGuideStudents: user?.role === 'MENTOR',
    canAccessScholarMode: user?.role === 'ADMIN' || user?.role === 'STUDENT'
  }
}
