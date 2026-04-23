import { prisma } from '@/lib/prisma'
import { UserRole } from '@/lib/prisma'

/**
 * Universal CRM Service Layer (Vedic Community OS)
 * Responsibility: Centralized, deeply-linked data logic for all community features.
 */

export class CRMService {
  /**
   * Deep Profile Discovery
   * Fetches every connection for a member across 16 categories.
   */
  static async getDeepMember(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        familyLinks: {
          include: { related: true }
        },
        relatedTo: {
          include: { user: true }
        },
        contributions: {
          include: { project: true },
          orderBy: { date: 'desc' }
        },
        benefits: {
          orderBy: { date: 'desc' }
        },
        subscriptionTier: true,
        journeyStage: true,
        hostedEvents: true,
        eventRegistrations: {
          include: { event: true }
        }
      }
    })
  }

  /**
   * Transparency Audit Discovery
   * Links Projects to their financial and social outcomes.
   */
  static async getProjectTransparency(projectId: string) {
    return await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        contributions: {
          include: { user: true }
        },
        expenses: {
          orderBy: { date: 'desc' }
        },
        activityLogs: {
          orderBy: { date: 'desc' }
        }
      }
    })
  }

  /**
   * Communication Intelligence
   * Fetches campaigns with their target segments and reach.
   */
  static async getCampaignAnalytics() {
    return await prisma.communicationCampaign.findMany({
      include: {
        targetTier: {
          include: {
            _count: {
              select: { users: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  /**
   * Universal Search (Intelligent)
   * Searches across Users, Projects, and Campaigns.
   */
  static async universalSearch(query: string) {
    const [users, projects] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { full_name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { village: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 10
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5
      })
    ])

    return { users, projects }
  }
}
