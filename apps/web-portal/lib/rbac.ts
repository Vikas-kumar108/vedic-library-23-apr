import { prisma } from '@/lib/prisma'
import { UserRole } from '@/lib/prisma'
import { redirect } from 'next/navigation'

/**
 * Vedic RBAC Protection System
 * Responsibility: Enforce strict role-based access to sensitive community data.
 */

export async function checkRole(allowedRoles: UserRole[], currentUser: any) {
  if (!currentUser) {
    return { authorized: false, reason: 'unauthenticated' }
  }

  const hasRole = currentUser.roles.some((role: UserRole) => allowedRoles.includes(role))
  
  if (!hasRole) {
    return { authorized: false, reason: 'unauthorized' }
  }

  return { authorized: true }
}

export function protectAction(allowedRoles: UserRole[], user: any) {
  const hasRole = user?.roles?.some((role: any) => allowedRoles.includes(role))
  if (!hasRole) {
    throw new Error('UNAUTHORIZED_ACCESS: Your role does not have permission for this Vedic action.')
  }
}
