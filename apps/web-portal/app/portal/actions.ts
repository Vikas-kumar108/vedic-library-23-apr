'use server'

import { prisma } from '@/lib/prisma'

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
    const documents = await prisma.legalDocument.findMany({
      where: {
        id: { in: shareLink.documentIds }
      }
    })

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
  // Logic to fetch students assigned to this mentor
  const students = await prisma.user.findMany({
    where: {
      mentoredBy: {
        some: { id: mentorId }
      }
    },
    select: {
      id: true,
      full_name: true,
      village: true,
      journeyStage: true
    }
  })
  return students
}
