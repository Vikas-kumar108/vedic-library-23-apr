import { 
  InstitutionalEmailService, 
  InstitutionalStorageService 
} from './adapter.foundation'
import { ResendEmailProvider, SendGridEmailProvider } from './email.providers'

/**
 * 🧠 Integration Registry
 * Purpose: Centralized initialization of all third-party services with fallback logic.
 */
export class IntegrationRegistry {
  
  static getEmailService(): InstitutionalEmailService {
    const primary = new ResendEmailProvider(process.env.RESEND_API_KEY || '')
    const fallback = new SendGridEmailProvider(process.env.SENDGRID_API_KEY || '')
    
    // Pick providers that have keys
    const activeProviders = []
    if (process.env.RESEND_API_KEY) activeProviders.push(primary)
    if (process.env.SENDGRID_API_KEY) activeProviders.push(fallback)

    return new InstitutionalEmailService(activeProviders)
  }

  static getStorageService(): InstitutionalStorageService {
    // Similarly for Cloudflare R2, AWS S3, etc.
    return new InstitutionalStorageService([])
  }
}
