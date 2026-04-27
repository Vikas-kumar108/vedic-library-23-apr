import { prisma } from './prisma'

/**
 * [IDENTITY MIGRATION GATEWAY]
 * Responsibility: Provide dynamic access to identity-related tables during the migration lock-in phase.
 */

const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true'

export const getStore = (storeName: 'users' | 'user_profiles' | 'user_preferences' | 'user_statistics' | 'spiritual_profiles') => {
  if (isIdentityEnabled) {
    const identityName = `identity_${storeName}`
    return (prisma as any)[identityName]
  }
  return (prisma as any)[storeName]
}

export const userStore = getStore('users')
export const profileStore = getStore('user_profiles')
export const preferenceStore = getStore('user_preferences')
export const statisticsStore = getStore('user_statistics')
export const spiritualProfileStore = getStore('spiritual_profiles')
