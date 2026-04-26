import { PrismaClient } from '@dharma/data-access'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const PROJECT_ROOT = '/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2'
const INGESTION_DATA_DIR = path.join(PROJECT_ROOT, 'apps/ingestion-service/data')
const GITA_BACKUP_PATH = path.join(INGESTION_DATA_DIR, 'gita-data/gita_verses_backup.txt')
const KS_DATA_DIR = path.join(INGESTION_DATA_DIR, 'ks-prakarana-output')
const TAGS_DIR = path.join(INGESTION_DATA_DIR, 'ks-tags-subtags')

const treeInput = `
sruti/
├── rig-veda/
│   └── samhita/
├── sama-veda/
├── yajur-veda/
└── atharva-veda/

smriti/
├── itihasa/
│   ├── mahabharata/
│   │   └── bhagavad-gita/
│   └── ramayana/
├── purana/
│   ├── mahapurana/
│   ├── bhagavata/
│   └── upapurana/
├── darsana/
│   ├── yoga/
│   │   └── yoga-sutra/
│   └── vedanta/
│       └── brahma-sutra/
├── kama-shastra/
│   └── kama-sutra/
└── sampredaya/
`

const CANONICAL_SLUG_MAP: Record<string, string> = {
  'bhagavad-gita': 'bg',
  'kama-sutra': 'ks',
}

async function main() {
  console.log('🚀 PROFESSIONAL SYNC (Phase 4 - Clean)...')
  
  // Clear DB safely
  await prisma.node.deleteMany()
  await prisma.shastra.deleteMany()
  await prisma.source.deleteMany()

  // 1. Setup Shastras
  console.log('1. Initializing Shastras...')
  const rootShastra = await prisma.shastra.create({
    data: { slug: 'veda', name: 'Vedic Corpus', structureType: 'tree' }
  })
  const gitaShastra = await prisma.shastra.create({
    data: { slug: 'bg', name: 'Bhagavad Gītā', structureType: 'chapter-verse' }
  })
  const ksShastra = await prisma.shastra.create({
    data: { slug: 'ks', name: 'Kāma Sūtra', structureType: 'adhikarana-adhyaya-prakarana-sutra' }
  })

  // 2. Setup Sources
  console.log('2. Initializing Sources...')
  const vyasa = await prisma.source.create({ data: { name: 'Veda Vyāsa', role: 'author' } })

  // 3. Build Base Tree (Categories)
  console.log('3. Building Base Tree...')
  const treeLines = treeInput.split('\n').filter(l => l.trim() !== '')
  const stack: { id: string, level: number, path: string, shastraId: string, childrenCount: number }[] = []
  const rootChildrenCount: Record<string, number> = {}
  
  for (const line of treeLines) {
    let level = 0
    if (line.includes('├──') || line.includes('└──')) {
       const match = line.match(/^([│ \t]+)[├└]/)
       level = match ? Math.floor(match[1].length / 4) + 1 : 1
    }
    const nameRaw = line.replace(/[│├└─ \t]/g, '').replace(/\//, '')
    if (!nameRaw) continue
    const slug = nameRaw.toLowerCase().replace(/[^a-z0-9]/g, '-')
    
    while (stack.length > 0 && stack[stack.length - 1].level >= level) stack.pop()
    const parent = stack.length > 0 ? stack[stack.length - 1] : null
    const currentPath = parent ? `${parent.path}.${slug.replace(/-/g, '_')}` : slug.replace(/-/g, '_')
    
    const shastraSlug = CANONICAL_SLUG_MAP[slug]
    const currentShastraId = shastraSlug === 'bg' ? gitaShastra.id : (shastraSlug === 'ks' ? ksShastra.id : (parent?.shastraId || rootShastra.id))

    if (!parent) {
      if (!rootChildrenCount[currentShastraId]) rootChildrenCount[currentShastraId] = 0
    }
    const orderIndex = parent ? (parent as any).childrenCount++ : rootChildrenCount[currentShastraId]++

    const nodeData: any = {
      shastraId: currentShastraId,
      parentId: parent?.id || null,
      level: shastraSlug ? 'text' : 'category',
      slug,
      orderIndex,
    }

    try {
      const node = await prisma.node.create({ data: nodeData })
      await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${currentPath}'::ltree WHERE id = '${node.id}';`)
      stack.push({ id: node.id, level, path: currentPath, shastraId: currentShastraId, childrenCount: 0 } as any)
    } catch (err: any) {
      console.error(`Failed to create node: ${slug}`)
      console.error('Node Data:', JSON.stringify(nodeData))
      console.error('Error Details:', err.message)
      throw err
    }
  }

  // 4. Import Gita Content
  console.log('4. Importing Gita Content...')
  const GITA_JSON_PATH = path.join(INGESTION_DATA_DIR, 'gita-data/verse.json')
  const gitaNode = await prisma.node.findFirst({ where: { slug: 'bhagavad-gita' } })
  if (gitaNode && fs.existsSync(GITA_JSON_PATH)) {
    const rootPathResult = await prisma.$queryRawUnsafe<any[]>(`SELECT path::text FROM nodes WHERE id = '${gitaNode.id}'`)
    const rootPathStr = rootPathResult[0].path

    const verses = JSON.parse(fs.readFileSync(GITA_JSON_PATH, 'utf-8'))
    const chapterNodes: Record<number, string> = {}

    for (const v of verses) {
      const chNum = v.chapter_number
      const vsNum = v.verse_number

      if (!chapterNodes[chNum]) {
        const chNode = await prisma.node.create({
          data: {
            shastraId: gitaShastra.id,
            parentId: gitaNode.id,
            level: 'chapter',
            slug: `ch-${chNum}`,
            orderIndex: chNum
          }
        })
        const chPath = `${rootPathStr}.ch${chNum}`
        await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${chPath}'::ltree WHERE id = '${chNode.id}';`)
        chapterNodes[chNum] = chNode.id
      }

      const vsNode = await prisma.node.create({
        data: {
          shastraId: gitaShastra.id,
          parentId: chapterNodes[chNum],
          level: 'verse',
          slug: `v-${vsNum}`,
          orderIndex: vsNum,
          canonicalRef: `BG ${chNum}.${vsNum}`
        }
      })
      const vsPath = `${rootPathStr}.ch${chNum}.v${vsNum}`
      await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${vsPath}'::ltree WHERE id = '${vsNode.id}';`)

      await prisma.text.create({
        data: {
          nodeId: vsNode.id,
          contentType: 'sutra',
          language: 'sa',
          script: 'devanagari',
          content: v.text,
          sourceId: vyasa.id
        }
      })
      if (v.transliteration) {
        await prisma.text.create({
          data: {
            nodeId: vsNode.id,
            contentType: 'sutra',
            language: 'sa',
            script: 'latin',
            content: v.transliteration,
            sourceId: vyasa.id
          }
        })
      }
    }
  }

  // 5. Import Kama Sutra Content
  console.log('5. Importing Kama Sutra Content...')
  const ksNode = await prisma.node.findFirst({ where: { slug: 'kama-sutra' } })
  if (ksNode) {
    const rootPathResult = await prisma.$queryRawUnsafe<any[]>(`SELECT path::text FROM nodes WHERE id = '${ksNode.id}'`)
    const rootPathStr = rootPathResult[0].path

    const ksFiles = fs.readdirSync(KS_DATA_DIR).filter(f => f.endsWith('.json'))
    const fileGroups: Record<string, string> = {}
    for (const file of ksFiles) {
      const match = file.match(/ks-.*-p(\d+)-.*(?:-v(\d+))?\.json/)
      if (!match) continue
      const pId = match[1]
      const version = match[2] ? parseInt(match[2]) : 0
      if (!fileGroups[pId] || version > 0) fileGroups[pId] = file 
    }

    const adhikaranaNodes: Record<number, string> = {}
    const adhyayaNodes: Record<string, string> = {}

    for (const file of Object.values(fileGroups)) {
      const data = JSON.parse(fs.readFileSync(path.join(KS_DATA_DIR, file), 'utf-8'))
      const aNum = data.adhikarana_number
      const chNum = data.adhyaya_number

      if (!adhikaranaNodes[aNum]) {
        const aNode = await prisma.node.create({
          data: {
            shastraId: ksShastra.id,
            parentId: ksNode.id,
            level: 'section',
            slug: `adhik-${aNum}`,
            orderIndex: aNum
          }
        })
        const aPath = `${rootPathStr}.part${aNum}`
        await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${aPath}'::ltree WHERE id = '${aNode.id}';`)
        adhikaranaNodes[aNum] = aNode.id
      }

      const adhyayaKey = `${aNum}-${chNum}`
      if (!adhyayaNodes[adhyayaKey]) {
        const chNode = await prisma.node.create({
          data: {
            shastraId: ksShastra.id,
            parentId: adhikaranaNodes[aNum],
            level: 'chapter',
            slug: `adhy-${chNum}`,
            orderIndex: chNum
          }
        })
        const chPath = `${rootPathStr}.part${aNum}.ch${chNum}`
        await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${chPath}'::ltree WHERE id = '${chNode.id}';`)
        adhyayaNodes[adhyayaKey] = chNode.id
      }

      const prakaranaNode = await prisma.node.create({
        data: {
          shastraId: ksShastra.id,
          parentId: adhyayaNodes[adhyayaKey],
          level: 'text',
          slug: `p-${data.global_prakarana_id}`,
          orderIndex: data.prakarana_number_within_adhyaya
        }
      })
      const pPath = `${rootPathStr}.part${aNum}.ch${chNum}.p${data.global_prakarana_id}`
      await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${pPath}'::ltree WHERE id = '${prakaranaNode.id}';`)

      for (const s of data.sutras) {
        const sNode = await prisma.node.create({
          data: {
            shastraId: ksShastra.id,
            parentId: prakaranaNode.id,
            level: 'verse',
            slug: `s-${s.number.replace(/\./g, '-')}`,
            canonicalRef: `KS ${s.number}`
          }
        })
        const sPath = `${pPath}.s${s.number.replace(/\./g, '_')}`
        await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${sPath}'::ltree WHERE id = '${sNode.id}';`)

        await prisma.text.create({
          data: {
            nodeId: sNode.id,
            contentType: 'sutra',
            language: 'sa',
            script: 'devanagari',
            content: s.text
          }
        })
      }
    }
  }

  console.log('✅ SYNC COMPLETE.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
