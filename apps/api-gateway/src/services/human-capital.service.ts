import { PrismaClient } from '@dharma/data-access'

export class HumanCapitalService {
  constructor(private prisma: PrismaClient) {}

  async getHROverview(orgId: string) {
    const [members, payroll, guidance] = await Promise.all([
      this.prisma.orgMember.findMany({
        where: { orgId },
        include: { user: { include: { profile: true } } }
      }),
      this.prisma.payrollRecord.findMany({
        where: { orgMember: { orgId } },
        include: { orgMember: { include: { user: { include: { profile: true } } } } },
        orderBy: { created_at: 'desc' },
        take: 10
      }),
      this.prisma.guidanceSession.findMany({
        where: { assignment: { guide: { orgMembers: { some: { orgId } } } } },
        include: { 
          assignment: {
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
        mentor: g.assignment.guide,
        seeker: g.assignment.student,
        topic: g.topic,
        scheduledAt: g.session_date,
        status: g.assignment.status
    }))

    return {
      members,
      recentPayroll: payroll,
      recentGuidance: normalizedGuidance,
      stats: {
        totalStaff: members.length,
        activeMentors: new Set(normalizedGuidance.map(g => g.mentor.id)).size,
        pendingPayroll: payroll.filter(p => p.status === 'PENDING').length
      }
    }
  }
}
