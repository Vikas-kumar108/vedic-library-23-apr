import { EmailProvider, EmailPayload } from './adapter.foundation'

/**
 * 🛰️ Resend Adapter (Primary)
 */
export class ResendEmailProvider implements EmailProvider {
  name = 'RESEND'
  constructor(private apiKey: string) {}

  async send(payload: EmailPayload): Promise<boolean> {
    if (!this.apiKey) throw new Error('Resend API Key missing')
    
    console.log(`[RESEND] Sending real email to ${payload.to}...`)
    
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          from: payload.from || process.env.INSTITUTIONAL_EMAIL_FROM || 'Vedic Library <onboarding@resend.dev>',
          to: payload.to,
          subject: payload.subject,
          html: payload.html || payload.body
        })
      })

      const data = await res.json()
      if (res.ok) {
        console.log(`✅ [RESEND] Email sent: ${data.id}`)
        return true
      } else {
        console.error(`❌ [RESEND] API Error:`, data)
        return false
      }
    } catch (error) {
      console.error(`❌ [RESEND] Connection Error:`, error)
      return false
    }
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
