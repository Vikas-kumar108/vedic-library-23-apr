import { EmailProvider, EmailPayload } from './adapter.foundation'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { Resend } from 'resend'

/**
 * 🛰️ Resend Adapter (Primary)
 */
export class ResendEmailProvider implements EmailProvider {
  name = 'RESEND'
  private resend: Resend

  constructor(apiKey: string) {
    const cleanKey = apiKey.trim().replace(/['"]+/g, '')
    this.resend = new Resend(cleanKey)
  }

  async send(payload: EmailPayload): Promise<boolean> {
    console.log(`[RESEND] Sending real email via official SDK...`)
    
    try {
      const { data, error } = await this.resend.emails.send({
        from: payload.from || process.env.INSTITUTIONAL_EMAIL_FROM || 'Vedic Library <onboarding@resend.dev>',
        to: [payload.to],
        reply_to: payload.replyTo || 'vedic.skills@gmail.com', // 🎯 The Bridge to your Gmail
        subject: payload.subject,
        html: payload.html || payload.body,
        text: payload.body,
      })

      if (error) {
        console.error(`❌ [RESEND] SDK Error:`, error)
        return false
      }

      console.log(`✅ [RESEND] Email sent successfully: ${data?.id}`)
      return true
    } catch (error) {
      console.error(`❌ [RESEND] Execution Error:`, error)
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
      ReplyToAddresses: [payload.replyTo || 'vedic.skills@gmail.com'], // 🎯 The Bridge to your Gmail
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
