import { 
  InstitutionalEmailService, 
  InstitutionalStorageService 
} from './adapter.foundation'
import { ResendEmailProvider, ConsoleEmailProvider } from './email.providers'

/**
 * 🧠 Integration Registry
 * Purpose: Centralized initialization of all third-party services with fallback logic.
 */
export class IntegrationRegistry {
  
  static getEmailService(): InstitutionalEmailService {
    const primary = new ResendEmailProvider(process.env.RESEND_API_KEY || '')
    const finalFallback = new ConsoleEmailProvider()
    
    // Pick providers that have keys, always include Console as final fallback
    const activeProviders = []
    if (process.env.RESEND_API_KEY) activeProviders.push(primary)
    
    // Console is always added as the ultimate witness
    activeProviders.push(finalFallback)

    return new InstitutionalEmailService(activeProviders)
  }

  static getStorageService(): InstitutionalStorageService {
    // Similarly for Cloudflare R2, AWS S3, etc.
    return new InstitutionalStorageService([])
  }
}
