import { PrismaClient } from '@dharma/data-access'

export class AcademyService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Get the global community progress overview
   */
  async getCommunityPulse(orgId: string) {
    const circles = await this.prisma.circle.findMany({
      include: {
        _count: {
          select: { members: true, posts: true }
        }
      }
    })

    const vows = await this.prisma.$queryRawUnsafe(
      `SELECT status, COUNT(*) as count FROM spiritual_vows GROUP BY status`
    )

    const learningProgress = await this.prisma.userCurveProgress.findMany({
      include: {
        curve: true,
        user: {
          include: { profile: true }
        }
      },
      take: 10,
      orderBy: { startedAt: 'desc' }
    })

    return {
      circles,
      vowStats: (vows as any[]).reduce((acc, v) => ({ ...acc, [v.status]: Number(v.count) }), {}),
      recentActivity: learningProgress
    }
  }

  /**
   * Get a detailed spiritual profile for a seeker
   */
  async getSeekerProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual: true,
        spiritual_vows: true,
        curveProgress: {
          include: {
            curve: true,
            currentStep: true
          }
        },
        circleMemberships: {
          include: { circle: true }
        }
      }
    })

    return user
  }

  /**
   * Record a new spiritual vow
   */
  async recordVow(data: {
    userId: string
    title: string
    description?: string
    startDate?: Date
    endDate?: Date
  }) {
    return this.prisma.$executeRawUnsafe(
      `INSERT INTO spiritual_vows (id, user_id, title, description, status, start_date, end_date, created_at)
       VALUES (uuid_generate_v4(), $1::uuid, $2, $3, 'ACTIVE', $4, $5, NOW())`,
      data.userId, data.title, data.description, data.startDate, data.endDate
    )
  }
}
