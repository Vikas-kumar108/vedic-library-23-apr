import { prisma } from './prisma'

/**
 * [STABILIZED IDENTITY ACCESS]
 * Responsibility: Provide direct access to identity-related tables.
 * Dual-schema switching has been decommissioned.
 */

export const userStore = prisma.users
export const profileStore = prisma.user_profiles
export const preferenceStore = prisma.user_preferences
export const statisticsStore = prisma.user_statistics
export const spiritualProfileStore = prisma.spiritual_profiles
