import { PrismaClient } from '@dharma/data-access'

export class InstitutionalService {
  constructor(private prisma: PrismaClient) { }

  /**
   * Fetches an overview of institutional health.
   */
  async getOverview(orgId: string) {
    const grantCount = await this.prisma.grants.count({
      where: { partnerships: { org_id: orgId } }
    })

    const totalGrantAmount = await this.prisma.grants.aggregate({
      where: { partnerships: { org_id: orgId } },
      _sum: { amount: true }
    })

    const pendingCompliance = await this.prisma.compliance_tasks.count({
      where: { org_id: orgId, status: 'UPCOMING' }
    })

    const recentJournals = await this.prisma.journal_entries.findMany({
      where: { org_id: orgId },
      orderBy: { created_at: 'desc' },
      take: 5,
      include: {
        transactions: true,
        journal_lines: { include: { financial_accounts: true } }
      }
    })

    return {
      stats: {
        activeGrants: grantCount,
        totalFunding: totalGrantAmount._sum.amount || 0,
        pendingTasks: pendingCompliance
      },
      recentActivity: recentJournals.map(j => ({
        id: j.id,
        date: j.created_at,
        amount: j.transactions?.amount,
        description: j.description
      }))
    }
  }

  /**
   * Fetches all grants and their milestones.
   */
  async getGrants(orgId: string) {
    const grantList = await this.prisma.grants.findMany({
      where: { partnerships: { org_id: orgId } },
      include: {
        partnerships: {
          include: { organizations_partnerships_partner_idToorganizations: true }
        },
        grant_milestones: true,
        grant_allocations: {
          include: { projects: true }
        }
      }
    })

    return grantList.map(g => ({
      id: g.id,
      amount: g.amount,
      status: g.status,
      partner: g.partnerships?.organizations_partnerships_partner_idToorganizations?.name,
      milestones: g.grant_milestones.length,
      allocations: g.grant_allocations.map(a => a.projects?.name)
    }))
  }

  /**
   * Fetches the double-entry audit ledger.
   */
  async getLedger(orgId: string, limit = 50, offset = 0) {
    const entries = await this.prisma.journal_entries.findMany({
      where: { org_id: orgId },
      orderBy: { created_at: 'desc' },
      take: limit,
      skip: offset,
      include: {
        transactions: true,
        journal_lines: {
          include: { financial_accounts: true }
        }
      }
    })

    return entries.map(e => ({
      id: e.id,
      date: e.created_at,
      description: e.description,
      amount: e.transactions?.amount,
      lines: e.journal_lines.map(l => ({
        account: l.financial_accounts?.name,
        debit: l.debit,
        credit: l.credit
      }))
    }))
  }

  /**
   * Fetches the health and inventory of the Shastra database.
   */
  async getContentHealth() {
    const shastras = await this.prisma.shastras.findMany({
      include: {
        _count: {
          select: { nodes: true }
        }
      }
    })

    const textStats = await this.prisma.texts.groupBy({
      by: ['language'],
      _count: { _all: true }
    })

    return {
      shastras: shastras.map(s => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        nodeCount: s._count.nodes,
        status: s.status,
        updatedAt: s.updated_at
      })),
      languages: textStats
    }
  }
}
