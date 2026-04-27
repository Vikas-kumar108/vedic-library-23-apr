import { PrismaClient } from '@dharma/data-access'

export class ComplianceService {
  constructor(private prisma: PrismaClient) {}

  async getComplianceOverview(orgId: string) {
    const [partnerships, ucs, tasks] = await Promise.all([
      this.prisma.partnerships.findMany({
        where: { org_id: orgId },
        include: { organizations_partnerships_partner_idToorganizations: true }
      }),
      this.prisma.utilization_certificates.findMany({
        where: { grants: { partnerships: { org_id: orgId } } },
        include: { grants: true }
      }),
      this.prisma.compliance_tasks.findMany({
        where: { org_id: orgId },
        orderBy: { due_date: 'asc' }
      })
    ])

    return {
      partnerships: partnerships.map(p => ({
        id: p.id,
        partnerName: p.organizations_partnerships_partner_idToorganizations?.name,
        type: p.partnership_type,
        status: p.status
      })),
      utilizationCertificates: ucs.map(u => ({
        id: u.id,
        grantId: u.grant_id,
        amount: u.total_utilized,
        date: u.certification_date
      })),
      activeComplianceTasks: tasks.map(t => ({
        id: t.id,
        title: t.title,
        dueDate: t.due_date,
        status: t.status
      }))
    }
  }

  async getPartnershipDeed(id: string) {
    const deed = await this.prisma.partnerships.findUnique({
      where: { id },
      include: { 
        organizations_partnerships_partner_idToorganizations: true,
        grants: true
      }
    })

    if (!deed) return null

    return {
      id: deed.id,
      partner: deed.organizations_partnerships_partner_idToorganizations?.name,
      type: deed.partnership_type,
      grants: deed.grants.map(g => ({ id: g.id, amount: g.amount }))
    }
  }

  async getUtilizationCertificate(id: string) {
    const uc = await this.prisma.utilization_certificates.findUnique({
      where: { id },
      include: {
        grants: {
          include: {
            partnerships: {
              include: { organizations_partnerships_partner_idToorganizations: true }
            }
          }
        }
      }
    })

    if (!uc) return null

    return {
      id: uc.id,
      amount: uc.total_utilized,
      date: uc.certification_date,
      grantPurpose: uc.grants?.purpose,
      partner: uc.grants?.partnerships?.organizations_partnerships_partner_idToorganizations?.name
    }
  }
}
