import { EmailProvider, EmailPayload } from './adapter.foundation'

/**
 * 🛰️ Resend Adapter (Primary)
 */
export class ResendEmailProvider implements EmailProvider {
  name = 'RESEND'
  constructor(private apiKey: string) {}

  async send(payload: EmailPayload): Promise<boolean> {
    if (!this.apiKey) throw new Error('Resend API Key missing')
    
    // In a real implementation, we would use fetch or the SDK here
    console.log(`[RESEND] Simulating email to ${payload.to}`)
    return true // Simulated success
  }
}

/**
 * 🛰️ SendGrid Adapter (Fallback)
 */
export class SendGridEmailProvider implements EmailProvider {
  name = 'SENDGRID'
  constructor(private apiKey: string) {}

  async send(payload: EmailPayload): Promise<boolean> {
    if (!this.apiKey) throw new Error('SendGrid API Key missing')
    
    console.log(`[SENDGRID] Simulating fallback email to ${payload.to}`)
    return true // Simulated success
  }
}
