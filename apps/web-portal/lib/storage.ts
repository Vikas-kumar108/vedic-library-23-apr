/**
 * VEDIC STORAGE INTELLIGENCE (MULTI-TENANT)
 * Responsibility: Manage file paths, signed URLs, and multi-tenant isolation for heavy data.
 */

export const BUCKET_NAMES = {
  DOCUMENTS: 'institutional-vault',
  FINANCE: 'financial-proofs',
  MEMBERS: 'member-assets',
  CONTENT: 'wisdom-library'
}

export class StorageService {
  /**
   * Generates a secure, isolated path for any file.
   * Format: org-{orgId}/{category}/{subCategory}/{fileName}
   */
  static getPath(orgId: string, category: string, subCategory: string, fileName: string) {
    const cleanOrgId = orgId.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    return `org-${cleanOrgId}/${category}/${subCategory}/${Date.now()}-${fileName}`
  }

  /**
   * Resolves a public URL for a file.
   */
  static getPublicUrl(bucket: string, path: string) {
    // In production, this would be your Supabase/Cloudflare URL
    return `https://storage.vedic-library.org/${bucket}/${path}`
  }

  /**
   * Intelligent Path Helper for CRM
   */
  static getMemberPath(orgId: string, userId: string, fileName: string) {
    return this.getPath(orgId, 'members', userId, fileName)
  }

  /**
   * Intelligent Path Helper for Finance
   */
  static getFinancePath(orgId: string, transactionId: string, fileName: string) {
    return this.getPath(orgId, 'finance', transactionId, fileName)
  }
}
