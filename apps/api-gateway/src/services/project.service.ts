import { PrismaClient } from '@dharma/data-access'
import { Decimal } from '@prisma/client/runtime/library'

export class ProjectService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Get all active institutional projects with budget stats
   */
  async getInstitutionalBlueprint(orgId: string) {
    const projects = await this.prisma.projects.findMany({
      where: { org_id: orgId },
      include: {
        grant_allocations: true,
        transactions: {
          select: {
            amount: true,
            type: true
          }
        },
        project_budget_lines: true
      },
      orderBy: { created_at: 'desc' }
    })

    return projects.map(p => {
      const utilized = p.transactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((sum, t) => sum.add(t.amount as Decimal), new Decimal(0))
      
      const budget = p.total_budget as Decimal
      const progress = budget.isZero() ? 0 : utilized.dividedBy(budget).mul(100).toNumber()

      return {
        id: p.id,
        name: p.name,
        description: p.description,
        status: p.status,
        stats: {
          totalBudget: budget,
          utilizedAmount: utilized,
          remainingBudget: budget.minus(utilized),
          progressPercent: Math.min(progress, 100)
        }
      }
    })
  }

  /**
   * Create a new infrastructure project
   */
  async createProject(data: {
    orgId: string
    name: string
    description?: string
    totalBudget: number
    causeId?: string
  }) {
    return this.prisma.projects.create({
      data: {
        org_id: data.orgId,
        name: data.name,
        description: data.description,
        total_budget: new Decimal(data.totalBudget),
        cause_id: data.causeId,
        status: 'ACTIVE'
      }
    })
  }

  /**
   * Record an activity log for a project build
   */
  async recordProjectActivity(data: {
    orgId: string
    projectId: string
    title: string
    description: string
    category: string
    images?: string[]
  }) {
    return this.prisma.activity_logs.create({
      data: {
        org_id: data.orgId,
        project_id: data.projectId,
        title: data.title,
        description: data.description,
        category: data.category,
        images: data.images || []
      }
    })
  }
}
