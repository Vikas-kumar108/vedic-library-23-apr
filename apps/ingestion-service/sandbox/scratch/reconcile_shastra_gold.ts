import { PrismaClient } from '@dharma/data-access'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const prisma = new PrismaClient()

const PROJECT_ROOT = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2'
const INGESTION_DATA_DIR = path.join(PROJECT_ROOT, 'apps/ingestion-service/data')
const GITA_JSON_PATH = path.join(INGESTION_DATA_DIR, 'gita-data/verse.json')
const KS_DATA_DIR = path.join(INGESTION_DATA_DIR, 'ks-prakarana-output')

async function main() {
  console.log('🚀 RAW SQL RECONCILIATION (BG + KS)...')
  
  const getOrCreateNode = async (shastraId: string, parentId: string | null, level: string, slug: string, orderIndex: number = 0, canonicalRef: string | null = null) => {
    const existing = await prisma.$queryRawUnsafe<any[]>(`SELECT id FROM nodes WHERE slug = $1 LIMIT 1`, slug)
    if (existing.length > 0) return existing[0].id

    const id = crypto.randomUUID()
    await prisma.$executeRawUnsafe(
        `INSERT INTO nodes (id, shastra_id, parent_id, level, slug, order_index, canonical_ref) VALUES ($1::uuid, $2::uuid, $3::uuid, $4, $5, $6::integer, $7)`,
        id, shastraId, parentId, level, slug, orderIndex, canonicalRef
    )
    return id
  }

  // 1. Shastras
  const bgRows = await prisma.$queryRawUnsafe<any[]>(`SELECT id FROM shastras WHERE slug = 'bg'`)
  const bgId = bgRows[0]?.id || (await prisma.shastra.create({ data: { slug: 'bg', name: 'Bhagavad Gītā' } })).id
  
  const ksRows = await prisma.$queryRawUnsafe<any[]>(`SELECT id FROM shastras WHERE slug = 'ks'`)
  const ksId = ksRows[0]?.id || (await prisma.shastra.create({ data: { slug: 'ks', name: 'Kāma Sūtra' } })).id

  // 2. Import KS
  if (fs.existsSync(KS_DATA_DIR)) {
    console.log('📖 Restoring KS...')
    const rootKS = await getOrCreateNode(ksId, null, 'text', 'kama-sutra', 0)
    const ksFiles = fs.readdirSync(KS_DATA_DIR).filter(f => f.endsWith('.json'))

    for (const file of ksFiles) {
        const data = JSON.parse(fs.readFileSync(path.join(KS_DATA_DIR, file), 'utf-8'))
        const aNum = data.adhikarana_number
        const adNum = data.adhyaya_number
        const pNum = data.global_prakarana_id
        const pOrder = parseInt(String(pNum).replace(/\D/g, '')) || 0

        const aNode = await getOrCreateNode(ksId, rootKS, 'section', `ks-adhik-${aNum}`, aNum)
        const adNode = await getOrCreateNode(ksId, aNode, 'chapter', `ks-adhy-${aNum}-${adNum}`, adNum)
        const pNode = await getOrCreateNode(ksId, adNode, 'text', `ks-p-${pNum}`, pOrder, `KS Prakarana ${pNum}`)

        for (const s of data.sutras) {
            const slug = `ks-s-${s.number.replace(/\./g, '-')}`
            const sNode = await getOrCreateNode(ksId, pNode, 'verse', slug, 0, `KS ${s.number}`)

            await prisma.$executeRawUnsafe(`DELETE FROM texts WHERE node_id = $1::uuid`, sNode)
            await prisma.$executeRawUnsafe(
                `INSERT INTO texts (id, node_id, content_type, language, script, content) VALUES ($1::uuid, $2::uuid, 'sutra'::content_type_enum, 'sa', 'devanagari', $3)`,
                crypto.randomUUID(), sNode, s.text
            )
        }
    }
  }

  console.log('✅ RAW SQL Reconciliation Complete.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
