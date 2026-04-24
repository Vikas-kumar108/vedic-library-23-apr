import { PrismaClient } from '@dharma/data-access'

export class InstitutionalService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches an overview of institutional health.
   */
  async getOverview(orgId: string) {
    const grantCount = await this.prisma.grant.count({
      where: { partnership: { orgId } }
    })

    const totalGrantAmount = await this.prisma.grant.aggregate({
      where: { partnership: { orgId } },
      _sum: { amount: true }
    })

    const pendingCompliance = await this.prisma.complianceTask.count({
      where: { orgId, status: 'UPCOMING' }
    })

    const recentJournals = await this.prisma.journalEntry.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        transaction: true,
        lines: { include: { account: true } }
      }
    })

    return {
      stats: {
        activeGrants: grantCount,
        totalFunding: totalGrantAmount._sum.amount || 0,
        pendingTasks: pendingCompliance
      },
      recentActivity: recentJournals
    }
  }

  /**
   * Fetches all grants and their milestones.
   */
  async getGrants(orgId: string) {
    return await this.prisma.grant.findMany({
      where: { partnership: { orgId } },
      include: {
        partnership: {
          include: { partner: true }
        },
        milestones: true,
        allocations: {
          include: { project: true }
        }
      }
    })
  }

  /**
   * Fetches the double-entry audit ledger.
   */
  async getLedger(orgId: string, limit = 50, offset = 0) {
    return await this.prisma.journalEntry.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        transaction: true,
        lines: {
          include: { account: true }
        }
      }
    })
  }
}
