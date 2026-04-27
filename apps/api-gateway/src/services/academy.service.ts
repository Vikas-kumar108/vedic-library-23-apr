import { PrismaClient } from '@dharma/data-access'

export class AcademyService {
  constructor(private prisma: PrismaClient) {}

  /**
   * [IDENTITY MIGRATION GATEWAY]
   */
  private get userStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) {
      return this.prisma.users;
    }
    return (this.prisma as any).legacy_users;
  }

  private get profileStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) {
      return this.prisma.user_profiles;
    }
    return (this.prisma as any).legacy_user_profiles;
  }

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

    const learningProgress = await (this.prisma as any).user_curve_progress.findMany({
      include: {
        curve: true,
        user: {
          include: { user_profiles: true }
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
    const user = await this.userStore.findUnique({
      where: { id: userId },
      include: {
        user_profiles: true,
        spiritual_profiles: true,
        spiritual_vows: true,
        user_curve_progress: {
          include: {
            curve: true,
            currentStep: true
          }
        },
        circle_members: {
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

  /**
   * Get a detailed mentor profile
   */
  async getMentorProfile(guideId: string) {
    const mentor = await this.userStore.findUnique({
      where: { id: guideId },
      include: {
        user_profiles: true,
        mentored_circles: true,
        guidance_assignments_guidance_assignments_guide_idTousers: {
          include: {
            student: { include: { user_profiles: true } }
          }
        }
      }
    })

    return mentor
  }

  /**
   * Get all published learning curves
   */
  async getLearningCurves() {
    return this.prisma.learningCurve.findMany({
      where: { isPublished: true },
      include: {
        _count: {
          select: { steps: true, userProgress: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}
