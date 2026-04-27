import { PrismaClient } from '@dharma/data-access'

export class HumanCapitalService {
  constructor(private prisma: PrismaClient) {}

  async getHROverview(orgId: string) {
    const [members, payroll, guidance] = await Promise.all([
      this.prisma.org_members.findMany({
        where: { org_id: orgId },
        include: { users: { include: { profile: true } } }
      }),
      this.prisma.payroll_records.findMany({
        where: { org_members: { org_id: orgId } },
        include: { org_members: { include: { users: { include: { profile: true } } } } },
        orderBy: { created_at: 'desc' },
        take: 10
      }),
      this.prisma.guidance_sessions.findMany({
        where: { guidance_assignments: { guide: { org_members: { some: { org_id: orgId } } } } },
        include: { 
          guidance_assignments: {
            include: {
              guide: { include: { profile: true } },
              student: { include: { profile: true } }
            }
          }
        },
        orderBy: { session_date: 'desc' },
        take: 10
      })
    ])

    // Normalize for UI
    const normalizedGuidance = guidance.map(g => ({
        id: g.id,
        mentor: g.guidance_assignments?.guide?.profile?.full_name,
        seeker: g.guidance_assignments?.student?.profile?.full_name,
        topic: g.topic,
        scheduledAt: g.session_date,
        status: g.guidance_assignments?.status
    }))

    return {
      members: members.map(m => ({
        id: m.id,
        name: m.users?.profile?.full_name,
        role: m.role,
        joined: m.created_at
      })),
      recentPayroll: payroll.map(p => ({
        id: p.id,
        name: p.org_members?.users?.profile?.full_name,
        amount: p.amount,
        status: p.status,
        date: p.created_at
      })),
      recentGuidance: normalizedGuidance,
      stats: {
        totalStaff: members.length,
        activeMentors: new Set(guidance.map(g => g.guidance_assignments?.guide_id)).size,
        pendingPayroll: payroll.filter(p => p.status === 'PENDING').length
      }
    }
  }
}
