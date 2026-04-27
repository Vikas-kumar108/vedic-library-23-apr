import { PrismaClient } from '@dharma/data-access'
import { UserSchema, SpiritualProfileSchema } from '@dharma/contracts'

export class AcademyService {
  constructor(private prisma: PrismaClient) {}

  /**
   * [IDENTITY SCHEMA]
   */
  private get userStore() {
    return this.prisma.users;
  }

  private get profileStore() {
    return this.prisma.user_profiles;
  }

  /**
   * Get the global community progress overview
   */
  async getCommunityPulse(orgId: string) {
    const circles = await this.prisma.circles.findMany({
      include: {
        _count: {
          select: { circle_members: true, circle_posts: true }
        }
      }
    })

    const vows = await this.prisma.$queryRawUnsafe(
      `SELECT status, COUNT(*) as count FROM spiritual_vows GROUP BY status`
    )

    const learningProgress = await this.prisma.user_curve_progress.findMany({
      include: {
        learning_curves: true,
        users: {
          include: { profile: true }
        }
      },
      take: 10,
      orderBy: { started_at: 'desc' }
    })

    return {
      circles: circles.map(c => ({
        id: c.id,
        name: c.name,
        members: c._count.circle_members,
        posts: c._count.circle_posts
      })),
      vowStats: (vows as any[]).reduce((acc, v) => ({ ...acc, [v.status]: Number(v.count) }), {}),
      recentActivity: learningProgress.map(p => ({
        seeker: p.users?.profile?.full_name,
        curve: p.learning_curves?.title,
        started: p.started_at,
        progress: p.progress_percentage
      }))
    }
  }

  /**
   * Get a detailed spiritual profile for a seeker
   */
  async getSeekerProfile(userId: string) {
    const user = await this.userStore.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual_profile: true,
        spiritual_vows: true,
        user_curve_progress: {
          include: {
            learning_curves: true,
            learning_curve_steps: true
          }
        },
        circle_members: {
          include: { circles: true }
        }
      }
    })

    if (!user) return null;

    return {
      ...UserSchema.parse(user),
      name: user.profile?.full_name,
      avatar: user.profile?.avatar_url,
      spiritual: {
        ...SpiritualProfileSchema.parse(user.spiritual_profile || {}),
        initiations: user.spiritual_vows.length
      },
      circles: user.circle_members.map(m => m.circles?.name),
      progress: user.user_curve_progress.map(p => ({
        title: p.learning_curves?.title,
        percentage: p.progress_percentage
      }))
    };
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
    return this.prisma.spiritual_vows.create({
      data: {
        user_id: data.userId,
        title: data.title,
        description: data.description,
        status: 'ACTIVE',
        start_date: data.startDate,
        end_date: data.endDate
      }
    })
  }

  /**
   * Get a detailed mentor profile
   */
  async getMentorProfile(guideId: string) {
    const mentor = await this.userStore.findUnique({
      where: { id: guideId },
      include: {
        profile: true,
        circles: true,
        guidance_as_guide: {
          include: {
            student: { include: { profile: true } }
          }
        }
      }
    })

    if (!mentor) return null;

    return {
      id: mentor.id,
      name: mentor.profile?.full_name,
      circles: mentor.circles.map(c => c.name),
      students: mentor.guidance_as_guide.map(g => ({
        id: g.student_id,
        name: g.student?.profile?.full_name
      }))
    };
  }

  /**
   * Get all published learning curves
   */
    const curves = await this.prisma.learning_curves.findMany({
      where: { is_published: true },
      include: {
        _count: {
          select: { learning_curve_steps: true, user_curve_progress: true }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    return curves.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      steps: c._count.learning_curve_steps,
      enrolled: c._count.user_curve_progress
    }))
}
