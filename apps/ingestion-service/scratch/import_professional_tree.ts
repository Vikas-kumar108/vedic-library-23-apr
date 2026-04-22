import prisma, { ContentType, Language, Script } from '@dharma/data-access'
import fs from 'fs'
import path from 'path'
const KS_DATA_DIR = './data/ks-prakarana-output'
const GITA_BACKUP_PATH = 'scratch/verse_texts_backup.txt'

const treeInput = `
sruti/
├── rig-veda/
│   ├── samhita/
├── sama-veda/
├── yajur-veda/
└── atharva-veda/

smrti/
├── dharma-sastra/
├── artha-sastra/
├── kama-sastra/
│   └── kama-sutra/
├── niti-sastra/
└── supplementary/

itihasa/
├── ramayana/
└── mahabharata/
    ├── adi-parva/
    ├── bhisma-parva/
    │   └── bhagavad-gita/
    └── santi-parva/

purana/
├── mahapurana/
├── bhagavata/
└── upapurana/

darsana/
├── yoga/
│   └── yoga-sutra/
└── vedanta/
    └── brahma-sutra/

sampradaya/
├── vaisnava-sampradayas/
├── sri-sampradaya/
├── rudra-sampradaya/
├── kumara-sampradaya/
`

const CANONICAL_SLUG_MAP: Record<string, string> = {
  'bhagavad-gita': 'bg',
  'kama-sutra': 'ks',
}

async function main() {
  console.log('🚀 PROFESSIONAL SYNC (Phase 4 - Debugging)...')
  
  // Clear DB safely
  await prisma.node.deleteMany()
  await prisma.shastra.deleteMany()
  await prisma.source.deleteMany()

  // 1. Setup Shastras
  console.log('1. Initializing Shastras...')
  const rootShastra = await prisma.shastra.create({
    data: { slug: 'root', name: 'Vedic Library', structureType: 'category-tree' }
  })
  const gitaShastra = await prisma.shastra.create({
    data: { slug: 'bg', name: 'Bhagavad Gītā', structureType: 'chapter-sloka' }
  })
  const ksShastra = await prisma.shastra.create({
    data: { slug: 'ks', name: 'Kāmasūtra', structureType: 'adhikarana-adhyaya-prakarana-sutra' }
  })

  // 2. Setup Sources
  console.log('2. Initializing Sources...')
  const spSource = await prisma.source.create({ data: { name: 'Śrīla Prabhupāda', role: 'translator' } })
  const vatsyayanaSource = await prisma.source.create({ data: { name: 'Vātsyāyana', role: 'author' } })

  // 3. Build Base Tree (Categories)
  console.log('3. Building Base Tree...')
  const treeLines = treeInput.split('\n').filter(l => l.trim() !== '')
  const stack: { id: string, level: number, path: string, shastraId: string }[] = []
  
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

    const nodeData = {
      shastraId: currentShastraId,
      parentId: parent?.id || null,
      level: shastraSlug ? 'text' : 'category',
      slug,
      name: nameRaw.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    }

    try {
      const node = await prisma.node.create({ data: nodeData })
      await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${currentPath}'::ltree WHERE id = '${node.id}';`)
      stack.push({ id: node.id, level, path: currentPath, shastraId: currentShastraId })
    } catch (err: any) {
      console.error(`Failed to create node: ${slug}`)
      console.error('Node Data:', JSON.stringify(nodeData))
      console.error('Error Details:', err.message)
      throw err
    }
  }

  // 4. Import Gita Content
  console.log('4. Importing Gita Content...')
  const gitaNode = await prisma.node.findFirst({ where: { slug: 'bhagavad-gita' } })
  if (gitaNode && fs.existsSync(GITA_BACKUP_PATH)) {
    const rootPathResult = await prisma.$queryRawUnsafe<any[]>(`SELECT path::text FROM nodes WHERE id = '${gitaNode.id}'`)
    const rootPathStr = rootPathResult[0].path

    const lines = fs.readFileSync(GITA_BACKUP_PATH, 'utf-8').split('\n')
    const chapterNodes: Record<number, string> = {}

    for (const line of lines) {
      if (!line.trim()) continue
      const [id, devanagari, iast] = line.split('|')
      const parts = id.replace('-v', '-').split('-')
      const chNum = parseInt(parts[1])
      const vsNum = parseInt(parts[2])
      if (isNaN(chNum) || isNaN(vsNum)) continue

      if (!chapterNodes[chNum]) {
        const chNode = await prisma.node.create({
          data: {
            shastraId: gitaShastra.id,
            parentId: gitaNode.id,
            level: 'chapter',
            slug: `ch-${chNum}`,
            name: `Chapter ${chNum}`,
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
          name: vsNum.toString(),
          orderIndex: vsNum,
          canonicalRef: `BG ${chNum}.${vsNum}`
        }
      })
      const vsPath = `${rootPathStr}.ch${chNum}.v${vsNum}`
      await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${vsPath}'::ltree WHERE id = '${vsNode.id}';`)

      await prisma.text.create({
        data: {
          nodeId: vsNode.id,
          contentType: ContentType.sutra,
          language: Language.sa,
          script: Script.devanagari,
          content: devanagari,
          isPrimary: true
        }
      })
      if (iast) {
        await prisma.text.create({
          data: {
            nodeId: vsNode.id,
            contentType: ContentType.translation,
            language: Language.sa,
            script: Script.latin,
            content: iast
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
            name: `Adhikarana ${aNum}`,
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
            slug: `ch-${chNum}`,
            name: `Chapter ${chNum}`,
            orderIndex: chNum
          }
        })
        const chPath = `${rootPathStr}.part${aNum}.ch${chNum}`
        await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${chPath}'::ltree WHERE id = '${chNode.id}';`)
        adhyayaNodes[adhyayaKey] = chNode.id
      }

      for (const sutra of data.sutras) {
        const vsNumStr = sutra.number.split('.').pop() || '0'
        const vsNum = parseInt(vsNumStr)
        
        const vsNode = await prisma.node.create({
          data: {
            shastraId: ksShastra.id,
            parentId: adhyayaNodes[adhyayaKey],
            level: 'verse',
            slug: `v-${vsNumStr}`,
            name: vsNumStr,
            orderIndex: vsNum,
            canonicalRef: `KS ${sutra.number}`
          }
        })
        const vsPath = `${rootPathStr}.part${aNum}.ch${chNum}.v${vsNumStr.replace(/\./g, '_')}`
        await prisma.$executeRawUnsafe(`UPDATE nodes SET path = '${vsPath}'::ltree WHERE id = '${vsNode.id}';`)

        await prisma.text.create({
          data: {
            nodeId: vsNode.id,
            contentType: ContentType.sutra,
            language: Language.sa,
            script: Script.devanagari,
            content: sutra.text,
            sourceId: vatsyayanaSource.id,
            isPrimary: true
          }
        })
      }
    }
  }

  console.log('✅ PROFESSIONAL SYNC COMPLETE.')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
