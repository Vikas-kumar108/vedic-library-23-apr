import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()
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

const CANONICAL_ID_MAP: Record<string, string> = {
  'bhagavad-gita': 'bg',
  'rig-veda': 'rv',
  'bhagavata': 'sb',
  'yoga-sutra': 'ys',
  'brahma-sutra': 'bs',
  'kama-sutra': 'ks',
}

async function main() {
  console.log('🚀 ULTIMATE MASTER SYNC (Phase 3 - Comprehensive)...')
  
  await prisma.libraryNode.deleteMany()
  await prisma.verse.deleteMany()
  await prisma.author.deleteMany()

  const authors = [
    { name: 'Śrīla Prabhupāda', role: 'translator', sampradaya: 'Brahma-Madhva-Gaudiya' },
    { name: 'Vātsyāyana', role: 'author' },
    { name: 'Śaṅkarācārya', role: 'commentator', sampradaya: 'Advaita' }
  ]
  for (const a of authors) await prisma.author.create({ data: a })

  console.log('3. Restoring Gita...')
  if (fs.existsSync(GITA_BACKUP_PATH)) {
    const lines = fs.readFileSync(GITA_BACKUP_PATH, 'utf-8').split('\n')
    for (const line of lines) {
      if (!line.trim()) continue
      const [id, devanagari, iast] = line.split('|')
      if (!id || !devanagari) continue
      const parts = id.replace('-v', '-').split('-')
      const ch = parseInt(parts[1])
      const vs = parseInt(parts[2])
      if (isNaN(ch) || isNaN(vs)) continue

      await prisma.verse.create({
        data: { id: id.replace('-v', '-'), chapterNumber: ch, verseNumber: vs, unitType: 'sloka', scripts: { devanagari, iast } }
      })
    }
  }

  console.log('4. Importing Kama Sutra (Version Aware)...')
  const ksFiles = fs.readdirSync(KS_DATA_DIR).filter(f => f.endsWith('.json'))
  
  // Group files by Prakarana ID to take the latest version
  const fileGroups: Record<string, { name: string, version: number }> = {}
  for (const file of ksFiles) {
    const match = file.match(/ks-.*-p(\d+)-.*(?:-v(\d+))?\.json/)
    if (!match) continue
    const pId = match[1]
    const version = match[2] ? parseInt(match[2]) : 0
    
    if (!fileGroups[pId] || version > fileGroups[pId].version) {
      fileGroups[pId] = { name: file, version }
    }
  }

  const selectedFiles = Object.values(fileGroups).map(g => g.name)
  console.log(`Found ${selectedFiles.length} unique Prakaranas.`)

  for (const file of selectedFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(KS_DATA_DIR, file), 'utf-8'))
    for (const sutra of data.sutras) {
      const sutraId = `ks-p${data.prakarana_number_within_adhikarana}-adhik${data.adhikarana_number}-${sutra.number.replace(/\./g, '-')}`
      const vsNum = parseInt(sutra.number.split('.').pop() || '0')
      await prisma.verse.upsert({
        where: { id: sutraId },
        update: { 
          adhikaranaNumber: data.adhikarana_number,
          chapterNumber: data.adhyaya_number, 
          verseNumber: vsNum, 
          unitType: 'sutra', 
          scripts: { devanagari: sutra.text } 
        },
        create: { 
          id: sutraId, 
          adhikaranaNumber: data.adhikarana_number,
          chapterNumber: data.adhyaya_number, 
          verseNumber: vsNum, 
          unitType: 'sutra', 
          scripts: { devanagari: sutra.text } 
        }
      })
    }
  }

  console.log('5. Building Tree Base...')
  const treeLines = treeInput.split('\n').filter(l => l.trim() !== '')
  const stack: { id: string, level: number, path: string }[] = []
  let order = 0
  for (const line of treeLines) {
    order++
    let level = 0
    if (line.includes('├──') || line.includes('└──')) {
       const match = line.match(/^([│ \t]+)[├└]/)
       level = match ? Math.floor(match[1].length / 4) + 1 : 1
    }
    const nameRaw = line.replace(/[│├└─ \t]/g, '').replace(/\//, '')
    if (!nameRaw) continue
    const idPart = nameRaw.toLowerCase().replace(/[^a-z0-9]/g, '-')
    while (stack.length > 0 && stack[stack.length - 1].level >= level) stack.pop()
    const parent = stack.length > 0 ? stack[stack.length - 1] : null
    const currentPath = parent ? `${parent.path}.${idPart.replace(/-/g, '_')}` : idPart.replace(/-/g, '_')
    let fullId = CANONICAL_ID_MAP[idPart] || (parent ? `${parent.id}-${idPart}` : idPart)
    
    await prisma.libraryNode.create({ 
      data: { 
        id: fullId, 
        parentId: parent?.id || null, 
        name: nameRaw.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '), 
        type: CANONICAL_ID_MAP[idPart] ? 'text' : 'category', 
        order 
      }
    })
    await prisma.$executeRawUnsafe(`UPDATE "LibraryNode" SET path = '${currentPath}'::ltree WHERE id = '${fullId}';`)
    stack.push({ id: fullId, level, path: currentPath })
  }

  console.log('6. Building Hierarchical Content...')
  const verses = await prisma.verse.findMany()
  const textGrouped: Record<string, typeof verses> = {}
  for (const v of verses) {
    const textId = v.id.split('-')[0]
    if (!textGrouped[textId]) textGrouped[textId] = []
    textGrouped[textId].push(v)
  }

  for (const [textId, textVerses] of Object.entries(textGrouped)) {
    const rootNode = await prisma.libraryNode.findUnique({ where: { id: textId } })
    if (!rootNode) continue
    const rootPathResult = await prisma.$queryRawUnsafe<any[]>(`SELECT path::text FROM "LibraryNode" WHERE id = '${textId}'`)
    const rootPathStr = rootPathResult[0].path

    if (textId === 'ks') {
      const adhikaranaNums = Array.from(new Set(textVerses.map(v => v.adhikaranaNumber))).sort((a,b) => (a||0) - (b||0))
      for (const aNum of adhikaranaNums) {
        if (!aNum) continue
        const partId = `ks-adhik${aNum}`
        const partPath = `${rootPathStr}.part${aNum}`
        await prisma.libraryNode.create({ data: { id: partId, parentId: textId, name: `Adhikarana ${aNum}`, type: 'section', order: aNum }})
        await prisma.$executeRawUnsafe(`UPDATE "LibraryNode" SET path = '${partPath}'::ltree WHERE id = '${partId}';`)

        const adhyayaNums = Array.from(new Set(textVerses.filter(v => v.adhikaranaNumber === aNum).map(v => v.chapterNumber))).sort((a,b) => a - b)
        for (const chNum of adhyayaNums) {
          const chId = `ks-adhik${aNum}-ch${chNum}`
          const chPath = `${partPath}.ch${chNum}`
          await prisma.libraryNode.create({ data: { id: chId, parentId: partId, name: `Chapter ${chNum}`, type: 'chapter', order: chNum }})
          await prisma.$executeRawUnsafe(`UPDATE "LibraryNode" SET path = '${chPath}'::ltree WHERE id = '${chId}';`)

          const chVerses = textVerses.filter(v => v.adhikaranaNumber === aNum && v.chapterNumber === chNum).sort((a,b) => a.verseNumber - b.verseNumber)
          for (const v of chVerses) {
             await prisma.libraryNode.create({ data: { id: v.id, parentId: chId, name: v.verseNumber.toString(), type: 'verse', order: v.verseNumber }})
             await prisma.$executeRawUnsafe(`UPDATE "LibraryNode" SET path = '${chPath}.v${v.verseNumber}'::ltree WHERE id = '${v.id}';`)
          }
        }
      }
    } else {
      const chapters = Array.from(new Set(textVerses.map(v => v.chapterNumber))).sort((a,b) => a - b)
      for (const chNum of chapters) {
        const chId = `${textId}-ch${chNum}`
        const chPath = `${rootPathStr}.ch${chNum}`
        await prisma.libraryNode.create({ data: { id: chId, parentId: textId, name: `Chapter ${chNum}`, type: 'chapter', order: chNum }})
        await prisma.$executeRawUnsafe(`UPDATE "LibraryNode" SET path = '${chPath}'::ltree WHERE id = '${chId}';`)

        const chVerses = textVerses.filter(v => v.chapterNumber === chNum).sort((a,b) => a.verseNumber - b.verseNumber)
        for (const v of chVerses) {
          await prisma.libraryNode.create({ data: { id: v.id, parentId: chId, name: v.verseNumber.toString(), type: 'verse', order: v.verseNumber }})
          await prisma.$executeRawUnsafe(`UPDATE "LibraryNode" SET path = '${chPath}.v${v.verseNumber}'::ltree WHERE id = '${v.id}';`)
        }
      }
    }
  }

  console.log('✅ SYNC COMPLETE.')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
