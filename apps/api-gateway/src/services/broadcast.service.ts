import { PrismaClient } from '@dharma/data-access'
import { InstitutionalEmailService } from '../integrations/adapter.foundation'

export interface BroadcastCriteria {
  role?: string
  stage?: string
  userIds?: string[]
  allUsers?: boolean
}

/**
 * 🛰️ Broadcast Service
 * Responsibility: Targeted distribution of Shastra content to specific Seekers.
 */
export class BroadcastService {
  constructor(
    private prisma: PrismaClient,
    private emailService: InstitutionalEmailService
  ) {}

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

  async broadcastWisdom(contentId: string, criteria: BroadcastCriteria) {
    // 1. Fetch the Wisdom Content (Sloka/Verse/Article)
    const content = await this.prisma.shastraContent.findUnique({
      where: { id: contentId },
      include: { shastra: true }
    })

    if (!content) throw new Error('Wisdom content not found')

    // 2. Identify the Targeted Audience
    let audience = []
    if (criteria.userIds && criteria.userIds.length > 0) {
      audience = await this.userStore.findMany({
        where: { id: { in: criteria.userIds } }
      })
    } else if (criteria.allUsers) {
      audience = await this.userStore.findMany()
    } else {
      audience = await this.userStore.findMany({
        where: {
          OR: [
            criteria.role ? { roles: { has: criteria.role as any } } : {},
            criteria.stage ? { stage: criteria.stage } : {}
          ]
        }
      })
    }

    console.log(`📡 BROADCAST: Targeting ${audience.length} seekers...`)

    // 3. Orchestrate the Transmission
    const results = await Promise.allSettled(
      audience.map(seeker => 
        this.emailService.sendEmail({
          to: seeker.email,
          subject: `📜 Revelation: ${content.title} • ${content.shastra?.title || 'Wisdom'}`,
          body: content.text,
          html: `
            <div style="font-family: serif; padding: 40px; border: 1px solid #eee; border-radius: 20px; max-width: 600px; margin: auto;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; padding: 4px 12px; background: #f3e8ff; color: #9333ea; border-radius: 8px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">
                  Divine Revelation
                </div>
              </div>
              
              <h2 style="font-style: italic; color: #1e293b; text-align: center; margin-bottom: 20px;">
                "${content.title}"
              </h2>
              
              <div style="font-size: 18px; line-height: 1.8; color: #334155; margin-bottom: 30px; text-align: center;">
                ${content.text.replace(/\n/g, '<br/>')}
              </div>
              
              <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center;">
                <p style="font-size: 12px; color: #64748b; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
                  Source: ${content.shastra?.title || 'Institutional Library'}
                </p>
                <a href="${process.env.FRONTEND_URL}/library/${content.slug}" 
                   style="display: inline-block; margin-top: 10px; color: #9333ea; font-weight: bold; text-decoration: none; font-size: 14px;">
                   Continue Study in Library →
                </a>
              </div>
            </div>
          `
        })
      )
    )

    return {
      targeted: audience.length,
      successful: results.filter(r => r.status === 'fulfilled' && r.value === true).length,
      failed: results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && r.value === false)).length
    }
  }
}
