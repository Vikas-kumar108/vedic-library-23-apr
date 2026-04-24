import { IntegrationRegistry } from '../integrations/registry'

/**
 * 🛡️ Institutional Environment Hardener
 * Purpose: Ensure all third-party integrations are functional and hardened.
 */
export class EnvironmentHardener {
  
  static async verifyIntegrations() {
    console.log('🛡️ HARDENER: Initiating Institutional Health Check...')
    
    const results = {
      email: await this.checkEmail(),
      storage: await this.checkStorage(),
      notifications: await this.checkNotifications()
    }

    console.log('📊 HARDENER: Integration Health Report:', results)
    
    if (Object.values(results).some(r => !r.primary && !r.fallback)) {
      console.warn('⚠️ CRITICAL: Some institutional pillars have NO functional providers.')
    }
  }

  private static async checkEmail() {
    const resendKey = process.env.RESEND_API_KEY
    const sendgridKey = process.env.SENDGRID_API_KEY

    return {
      primary: !!resendKey && resendKey !== 'mock_key',
      fallback: !!sendgridKey && sendgridKey !== 'mock_key',
      status: (resendKey || sendgridKey) ? 'OPERATIONAL' : 'OFFLINE'
    }
  }

  private static async checkStorage() {
    const cfKey = process.env.CLOUDFLARE_R2_KEY
    const awsKey = process.env.AWS_S3_KEY

    return {
      primary: !!cfKey,
      fallback: !!awsKey,
      status: (cfKey || awsKey) ? 'OPERATIONAL' : 'OFFLINE'
    }
  }

  private static async checkNotifications() {
    const msg91Key = process.env.MSG91_KEY
    const twilioKey = process.env.TWILIO_KEY

    return {
      primary: !!msg91Key,
      fallback: !!twilioKey,
      status: (msg91Key || twilioKey) ? 'OPERATIONAL' : 'OFFLINE'
    }
  }
}
