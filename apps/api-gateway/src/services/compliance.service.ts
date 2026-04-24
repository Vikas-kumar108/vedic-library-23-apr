import { PrismaClient } from '@dharma/data-access'

export class ComplianceService {
  constructor(private prisma: PrismaClient) {}

  async getComplianceOverview(orgId: string) {
    const [partnerships, ucs, tasks] = await Promise.all([
      this.prisma.partnership.findMany({
        where: { orgId },
        include: { partner: true }
      }),
      this.prisma.utilizationCertificate.findMany({
        where: { grant: { orgId } },
        include: { grant: true }
      }),
      this.prisma.complianceTask.findMany({
        where: { orgId },
        orderBy: { dueDate: 'asc' }
      })
    ])

    return {
      partnerships,
      utilizationCertificates: ucs,
      activeComplianceTasks: tasks
    }
  }

  async getPartnershipDeed(id: string) {
    return this.prisma.partnership.findUnique({
      where: { id },
      include: { 
        partner: true,
        grants: true
      }
    })
  }

  async getUtilizationCertificate(id: string) {
    return this.prisma.utilizationCertificate.findUnique({
      where: { id },
      include: {
        grant: {
          include: {
            partnership: {
              include: { partner: true }
            }
          }
        }
      }
    })
  }
}
