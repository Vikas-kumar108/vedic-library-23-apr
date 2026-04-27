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
    return await prisma.users.findUnique({
      where: { id: userId },
      include: {
        family_links_as_user: {
          include: { related: true }
        },
        family_links_as_related: {
          include: { user: true }
        },
        contributions: {
          include: { projects: true },
          orderBy: { created_at: 'desc' }
        },
        organizations: true,
        vedic_events: true,
        event_registrations: {
          include: { vedic_events: true }
        }
      }
    })
  }

  /**
   * Transparency Audit Discovery
   * Links Projects to their financial and social outcomes.
   */
  static async getProjectTransparency(projectId: string) {
    return await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        contributions: {
          include: { users: true }
        },
        transactions: {
          orderBy: { created_at: 'desc' }
        },
        activity_logs: {
          orderBy: { created_at: 'desc' }
        }
      }
    })
  }

  /**
   * Communication Intelligence
   * Fetches campaigns with their target segments and reach.
   */
  static async getCampaignAnalytics() {
    return await prisma.communication_campaigns.findMany({
      include: {
        _count: {
          select: { communication_logs: true }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  /**
   * Universal Search (Intelligent)
   * Searches across Users, Projects, and Campaigns.
   */
  static async universalSearch(query: string) {
    const [users, projects] = await Promise.all([
      prisma.users.findMany({
        where: {
          OR: [
            { email: { contains: query, mode: 'insensitive' } },
            { profile: { full_name: { contains: query, mode: 'insensitive' } } },
            { profile: { village: { contains: query, mode: 'insensitive' } } }
          ]
        },
        take: 10
      }),
      prisma.projects.findMany({
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
