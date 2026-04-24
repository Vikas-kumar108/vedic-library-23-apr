import { 
  InstitutionalEmailService, 
  InstitutionalStorageService 
} from './adapter.foundation'
import { 
  ResendEmailProvider, 
  AWSSESEmailProvider, 
  ConsoleEmailProvider 
} from './email.providers'
import { 
  R2StorageProvider, 
  SupabaseStorageProvider,
  LocalStorageProvider 
} from './storage.providers'

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
    const activeProviders = []

    // 1. Primary: Cloudflare R2
    if (process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY) {
      activeProviders.push(new R2StorageProvider({
        accountId: process.env.R2_ACCOUNT_ID,
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        bucketName: process.env.R2_BUCKET_NAME || 'vedic-library-assets',
        publicUrl: process.env.R2_PUBLIC_URL || 'https://assets.vedicskills.com'
      }))
    }

    // 2. Secondary: Supabase Storage (No card required)
    if (process.env.SUPABASE_PROJECT_REF && process.env.SUPABASE_S3_ACCESS_KEY && process.env.SUPABASE_S3_SECRET_KEY) {
      activeProviders.push(new SupabaseStorageProvider({
        projectRef: process.env.SUPABASE_PROJECT_REF,
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY,
        secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY,
        bucketName: process.env.SUPABASE_STORAGE_BUCKET || 'wisdom-assets'
      }))
    }

    // 3. Fallback: Local Filesystem
    activeProviders.push(new LocalStorageProvider(process.cwd()))

    return new InstitutionalStorageService(activeProviders)
  }
}
