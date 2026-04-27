'use server'

import { prisma } from '@/lib/prisma'
import { userStore } from '@/lib/identity-gateway'

/**
 * SECURE PORTAL ACTIONS
 * Responsibility: Validate temporary access tokens and fetch portal-specific data.
 */

export async function validatePortalToken(token: string) {
  try {
    const shareLink = await prisma.secure_share_links.findUnique({
      where: { token },
      include: {
        organizations: {
          select: { name: true, type: true }
        },
        secure_share_link_documents: {
          include: { legal_documents: true }
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
    await prisma.secure_share_links.update({
      where: { token },
      data: { access_count: { increment: 1 } }
    })

    // Fetch the actual documents
    const documents = shareLink.secure_share_link_documents.map(d => d.legal_documents)

    return {
      success: true,
      organization: shareLink.organizations,
      purpose: shareLink.purpose,
      expiresAt: shareLink.expires_at,
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
      profile: true,
      spiritual_profile: true
    }
  })
  return students
}
