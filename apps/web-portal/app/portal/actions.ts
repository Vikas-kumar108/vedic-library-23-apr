'use server'

import { prisma } from '@/lib/prisma'
import { userStore } from '@/lib/identity-gateway'

/**
 * SECURE PORTAL ACTIONS
 * Responsibility: Validate temporary access tokens and fetch portal-specific data.
 */

export async function validatePortalToken(token: string) {
  try {
    const shareLink = await prisma.secureShareLink.findUnique({
      where: { token },
      include: {
        organization: {
          select: { name: true, type: true }
        },
        documents: {
          include: { document: true }
        }
      }
    })

    if (!shareLink) {
      return { success: false, error: 'INVALID_TOKEN: Access denied.' }
    }

    if (new Date() > shareLink.expiresAt) {
      return { success: false, error: 'EXPIRED_TOKEN: This access link has expired.' }
    }

    // Increment access count for audit tracking
    await prisma.secureShareLink.update({
      where: { token },
      data: { accessCount: { increment: 1 } }
    })

    // Fetch the actual documents
    const documents = shareLink.documents.map(d => d.document)

    return {
      success: true,
      organization: shareLink.organization,
      purpose: shareLink.purpose,
      expiresAt: shareLink.expiresAt,
      documents
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Mentor Access Discovery
 * Fetches students assigned to a specific mentor portal token.
 */
export async function getMentorStudents(mentorId: string) {
  // Logic to fetch students assigned to this mentor via circles
  const students = await userStore.findMany({
    where: {
      circle_members: {
        some: {
          circle: {
            mentor_id: mentorId
          }
        }
      }
    },
    include: {
      user_profiles: true,
      spiritual_profiles: true
    }
  })
  return students
}
