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
    const primary = new ResendEmailProvider(process.env.RESEND_API_KEY || 'mock_key')
    const fallback = new SendGridEmailProvider(process.env.SENDGRID_API_KEY || 'mock_key')
    
    // We can dynamically add more providers from env here
    return new InstitutionalEmailService([primary, fallback])
  }

  static getStorageService(): InstitutionalStorageService {
    // Similarly for Cloudflare R2, AWS S3, etc.
    return new InstitutionalStorageService([])
  }
}
