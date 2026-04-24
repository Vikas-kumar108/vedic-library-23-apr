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
 * 🛰️ Console Adapter (Final Fallback)
 * Purpose: Ensures emails are at least logged when all external gateways are offline.
 */
export class ConsoleEmailProvider implements EmailProvider {
  name = 'CONSOLE'
  async send(payload: EmailPayload): Promise<boolean> {
    console.log(`
╔══════════════════════════════════════════════════════════════════════════════
║ 📧 [CONSOLE EMAIL FALLBACK]
╠══════════════════════════════════════════════════════════════════════════════
║ FROM:    ${payload.from || 'System'}
║ TO:      ${payload.to}
║ SUBJECT: ${payload.subject}
╠══════════════════════════════════════════════════════════════════════════════
║ BODY:
║ ${payload.html || payload.body}
╚══════════════════════════════════════════════════════════════════════════════
`)
    return true
  }
}
