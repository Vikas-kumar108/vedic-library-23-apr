import { PrismaClient } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const VAULT_DATA = [
  { "title": "80G Approval Certificate 2026", "category": "Tax", "expiryDate": "2028-12-31", "sensitivity": "RESTRICTED" },
  { "title": "12AB Registration Certificate", "category": "Tax", "expiryDate": "2027-03-31", "sensitivity": "RESTRICTED" },
  { "title": "PAN Card Copy", "category": "Registration", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "Trust Deed Document", "category": "Registration", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "Society Registration Certificate", "category": "Registration", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "Certificate of Incorporation", "category": "Registration", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "FCRA Registration Certificate", "category": "Tax", "expiryDate": "2029-06-30", "sensitivity": "RESTRICTED" },
  { "title": "CSR Registration Form CSR-1", "category": "Registration", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "Annual Audit Report FY 2024-25", "category": "Audit", "expiryDate": "2026-09-30", "sensitivity": "RESTRICTED" },
  { "title": "Income Tax Return Filing FY 2024-25", "category": "Tax", "expiryDate": "2026-07-31", "sensitivity": "RESTRICTED" },
  { "title": "Balance Sheet FY 2024-25", "category": "Audit", "expiryDate": "2026-09-30", "sensitivity": "RESTRICTED" },
  { "title": "Audit Report FY 2023-24", "category": "Audit", "expiryDate": "2025-09-30", "sensitivity": "RESTRICTED" },
  { "title": "GST Registration Certificate", "category": "Tax", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "Professional Tax Registration", "category": "Tax", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "Organization Profile Brochure", "category": "Registration", "expiryDate": null, "sensitivity": "PUBLIC" },
  { "title": "CSR Impact Report 2025", "category": "Audit", "expiryDate": "2027-03-31", "sensitivity": "PUBLIC" },
  { "title": "Donor Transparency Report", "category": "Audit", "expiryDate": "2027-03-31", "sensitivity": "PUBLIC" },
  { "title": "MoU with CSR Partner Company", "category": "Registration", "expiryDate": "2028-01-15", "sensitivity": "RESTRICTED" },
  { "title": "Internal Financial Policy Document", "category": "Audit", "expiryDate": null, "sensitivity": "RESTRICTED" },
  { "title": "Annual Activity Report 2025", "category": "Audit", "expiryDate": "2027-03-31", "sensitivity": "PUBLIC" }
]

async function main() {
  console.log('🛡️ MANIFESTING INSTITUTIONAL VAULT...')
  
  // 1. Fetch Root Organization
  const org = await prisma.organization.findUnique({
    where: { id: '00000000-0000-0000-0000-000000000001' }
  })

  if (!org) {
    console.error('❌ ROOT ORGANIZATION NOT FOUND. PLEASE RUN seed_finance.ts FIRST.')
    process.exit(1)
  }

  // 2. Seed Documents
  for (const doc of VAULT_DATA) {
    await prisma.legalDocument.create({
      data: {
        orgId: org.id,
        title: doc.title,
        category: doc.category,
        expiryDate: doc.expiryDate ? new Date(doc.expiryDate) : null,
        sensitivity: doc.sensitivity as any,
        status: 'VERIFIED',
        fileUrl: `https://vault.vedic-library.org/org-${org.id}/legal/${doc.title.replace(/\s+/g, '_').toLowerCase()}.pdf`
      }
    })
    console.log(`Secured in Vault: ${doc.title}`)
  }

  console.log('✅ VAULT MANIFESTATION COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
