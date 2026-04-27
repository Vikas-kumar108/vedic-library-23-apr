import { prisma } from '@/lib/prisma'

/**
 * COMMUNICATION ORCHESTRATOR (BACKEND BRAIN)
 * Responsibility: Route messages across multiple channels with tenant isolation.
 */

export class CommunicationOrchestrator {
  /**
   * Dispatches a campaign to the correct audience and channels.
   */
  static async dispatchCampaign(campaignId: string) {
    const campaign = await prisma.communication_campaigns.findUnique({
      where: { id: campaignId },
      include: { 
        subscription_tiers: true,
        organizations_communication_campaigns_org_idToorganizations: true
      }
    })

    if (!campaign) throw new Error('CAMPAIGN_NOT_FOUND')

    // 1. Fetch the Segmented Audience
    // 1. Fetch the Segmented Audience (Best effort: by organization membership)
    const audience = await prisma.users.findMany({
      where: {
        organization_members: {
          some: { org_id: campaign.org_id } // STRICT TENANT ISOLATION
        }
      }
    })

    // 2. Route by Channel Type
    const results = await Promise.all(
      audience.map(async (user) => {
        try {
          switch (campaign.type) {
            case 'EMAIL':
              return await this.sendEmail(user.email, campaign.content)
            case 'PORTAL_NOTICE':
              return await this.sendPortalNotice(user.id, campaign.content)
            default:
              return null
          }
        } catch (error) {
          console.error(`FAILED_TO_SEND to ${user.id}:`, error)
          return null
        }
      })
    )

    // 3. Record Completion
    await prisma.communication_campaigns.update({
      where: { id: campaignId },
      data: { 
        status: 'SENT',
        sent_at: new Date()
      }
    })

    return { total: audience.length, success: results.filter(Boolean).length }
  }

  /* --- CHANNEL ADAPTERS (MOCK IMPLEMENTATIONS) --- */

  private static async sendEmail(email: string | null, content: string) {
    if (!email) return null
    console.log(`[POSTMARK_ADAPTER] Sending Email to ${email}`)
    return true
  }

  private static async sendWhatsApp(phone: string | null, content: string) {
    if (!phone) return null
    console.log(`[META_ADAPTER] Sending WhatsApp to ${phone}`)
    return true
  }

  private static async sendSMS(phone: string | null, content: string) {
    if (!phone) return null
    console.log(`[TWILIO_ADAPTER] Sending SMS to ${phone}`)
    return true
  }

  private static async sendPortalNotice(userId: string, content: string) {
    console.log(`[PORTAL_ADAPTER] Sending In-App Notice to ${userId}`)
    return true
  }
}
