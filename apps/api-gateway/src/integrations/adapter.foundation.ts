/**
 * Institutional Integration Adapters
 * Philosophy: Provider Independence & Fallback Resilience
 */

export interface EmailPayload {
  to: string
  from?: string
  subject: string
  body: string
  html?: string
}

export interface StoragePayload {
  fileName: string
  buffer: Buffer
  mimeType: string
  category: 'RECEIPT' | 'DOCUMENT' | 'SHASTRA_SCAN'
}

// 🏛️ The Dharma of Communication (Interfaces)
export interface EmailProvider {
  name: string
  send(payload: EmailPayload): Promise<boolean>
}

export interface StorageProvider {
  name: string
  upload(payload: StoragePayload): Promise<string>
}

// 🚀 Unified Email Orchestrator with Fallback
export class InstitutionalEmailService {
  constructor(private providers: EmailProvider[]) {}

  async sendEmail(payload: EmailPayload): Promise<boolean> {
    console.log(`📡 INSTITUTIONAL: Preparing email to ${payload.to}...`)
    
    for (const provider of this.providers) {
      try {
        console.log(`🛰️ Attempting via ${provider.name}...`)
        const success = await provider.send(payload)
        if (success) {
          console.log(`✅ Success via ${provider.name}`)
          return true
        }
      } catch (error) {
        console.error(`⚠️ ${provider.name} FAILED:`, error)
        // Continue to next provider
      }
    }

    console.error(`❌ ALL EMAIL PROVIDERS FAILED. Enqueuing for retry...`)
    return false
  }
}

// 📦 Unified Storage Orchestrator with Fallback
export class InstitutionalStorageService {
  constructor(private providers: StorageProvider[]) {}

  async uploadFile(payload: StoragePayload): Promise<string> {
    for (const provider of this.providers) {
      try {
        console.log(`📦 Uploading ${payload.fileName} via ${provider.name}...`)
        const url = await provider.upload(payload)
        if (url) return url
      } catch (error) {
        console.error(`⚠️ ${provider.name} Storage FAILED:`, error)
      }
    }
    throw new Error('All storage providers exhausted.')
  }
}
