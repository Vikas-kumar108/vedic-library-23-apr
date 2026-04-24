import { EmailProvider, EmailPayload } from './adapter.foundation'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

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
 * 🛰️ AWS SES Adapter (Secondary Production Fallback)
 */
export class AWSSESEmailProvider implements EmailProvider {
  name = 'AWS_SES'
  private client: SESClient

  constructor(config: { region: string; accessKeyId: string; secretAccessKey: string }) {
    this.client = new SESClient({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      }
    })
  }

  async send(payload: EmailPayload): Promise<boolean> {
    console.log(`[AWS_SES] Attempting to send email to ${payload.to}...`)
    
    const command = new SendEmailCommand({
      Source: payload.from || process.env.INSTITUTIONAL_EMAIL_FROM || 'Vedic Library <onboarding@resend.dev>',
      Destination: { ToAddresses: [payload.to] },
      Message: {
        Subject: { Data: payload.subject },
        Body: {
          Html: { Data: payload.html || payload.body },
          Text: { Data: payload.body }
        }
      }
    })

    try {
      const res = await this.client.send(command)
      console.log(`✅ [AWS_SES] Email sent successfully: ${res.MessageId}`)
      return true
    } catch (error) {
      console.error(`❌ [AWS_SES] Failed:`, error)
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
