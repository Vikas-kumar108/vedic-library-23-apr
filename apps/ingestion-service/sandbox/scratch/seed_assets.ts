import { PrismaClient } from '@dharma/data-access'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 RAW SQL SEEDING INSTITUTIONAL ASSETS...')

  const orgRows = await prisma.$queryRawUnsafe<any[]>(`SELECT id FROM organizations LIMIT 1`)
  if (orgRows.length === 0) {
    console.log('❌ No organization found.')
    return
  }
  const orgId = orgRows[0].id

  const assets = [
    {
      name: 'MacBook Pro M3 Max',
      description: 'Dev Workstation for Shastra AI Engine',
      serialNumber: 'SN-APL-889922',
      assetTag: 'TAG-IT-001',
      value: 349000,
      location: 'Main IT Hub - Floor 2',
      category: 'IT_EQUIPMENT'
    },
    {
      name: 'Custom Teakwood Bookcase',
      description: 'Manuscript preservation unit',
      serialNumber: 'SN-FUR-112233',
      assetTag: 'TAG-LIB-045',
      value: 85000,
      location: 'Central Library - Rare Section',
      category: 'FURNITURE'
    },
    {
      name: 'Rare Gītā Manuscript (Original)',
      description: '18th Century Sanskrit Manuscript',
      serialNumber: 'MS-V-001',
      assetTag: 'TAG-ARC-001',
      value: 1500000,
      location: 'Vault - Section Zero',
      category: 'ARCHIVAL'
    }
  ]

  for (const a of assets) {
    const qrCode = `VIOS-ASSET-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    const id = crypto.randomUUID()
    await prisma.$executeRawUnsafe(
        `INSERT INTO physical_assets (id, org_id, name, description, serial_number, asset_tag, qr_code, value, location, status, category) VALUES ($1::uuid, $2::uuid, $3, $4, $5, $6, $7, $8::numeric, $9, 'ACTIVE'::asset_status_enum, $10)`,
        id, orgId, a.name, a.description, a.serialNumber, a.assetTag, qrCode, a.value, a.location, a.category
    )
  }

  console.log(`✅ Seeded ${assets.length} institutional assets.`)
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
