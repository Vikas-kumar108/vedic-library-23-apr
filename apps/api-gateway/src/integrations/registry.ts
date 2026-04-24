import { 
  InstitutionalEmailService, 
  InstitutionalStorageService 
} from './adapter.foundation'
import { 
  ResendEmailProvider, 
  AWSSESEmailProvider, 
  ConsoleEmailProvider 
} from './email.providers'

/**
 * 🧠 Integration Registry
 * Purpose: Centralized initialization of all third-party services with fallback logic.
 */
export class IntegrationRegistry {
  
  static getEmailService(): InstitutionalEmailService {
    const activeProviders = []

    // 1. Primary: Resend
    if (process.env.RESEND_API_KEY) {
      activeProviders.push(new ResendEmailProvider(process.env.RESEND_API_KEY))
    }
    
    // 2. Secondary: AWS SES
    if (process.env.AWS_SES_ACCESS_KEY && process.env.AWS_SES_SECRET_KEY) {
      activeProviders.push(new AWSSESEmailProvider({
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_SECRET_KEY
      }))
    }

    // 3. Ultimate Witness: Console (Always Active)
    activeProviders.push(new ConsoleEmailProvider())

    return new InstitutionalEmailService(activeProviders)
  }

  static getStorageService(): InstitutionalStorageService {
    // Similarly for Cloudflare R2, AWS S3, etc.
    return new InstitutionalStorageService([])
  }
}
