import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { rawDb } from '@dharma/data-access/clients'
import process from 'process'

const base = path.join(
    process.cwd(),
    'apps/ingestion-service/data/gita-data'
)

const verses = JSON.parse(
    fs.readFileSync(path.join(base, 'verse.json'), 'utf-8')
)

const translations = JSON.parse(
    fs.readFileSync(path.join(base, 'translation.json'), 'utf-8')
)

console.log('RAW DB CONNECTING...')
console.log(process.env.DATABASE_URL_RAW)

function normalizeVerse(v: any) {
    const chapter = v.chapter || v.chapter_number
    const verse = v.verse || v.verse_number

    const sanskrit = v.sanskrit || v.text || v.sloka
    const iast = v.iast || v.transliteration

    return { chapter, verse, sanskrit, iast }
}

async function run() {
    let shastra = await rawDb.shastras.findFirst({
        where: { slug: 'bhagavad-gita' }
    })

    if (!shastra) {
        shastra = await rawDb.shastras.create({
            data: {
                slug: 'bhagavad-gita',
                name: 'Bhagavad Gita',
                structure_type: 'chapter-verse'
            }
        })
        console.log('Created shastra')
    }

    for (const v of verses) {
        const { chapter, verse, sanskrit, iast } = normalizeVerse(v)

        if (!chapter || !verse) {
            console.warn('⚠️ Skipping invalid verse structure', v)
            continue
        }

        const key = `${chapter}.${verse}`
        const slug = `bg.shloka.${chapter}.${verse}`
        const t = translations[key]

        try {
            let node = await rawDb.nodes.findFirst({
                where: { slug }
            })

            if (!node) {
                node = await rawDb.nodes.create({
                    data: {
                        shastra_id: shastra.id,
                        level: 'shloka',
                        slug,
                        order_index: verse,
                        canonical_ref: `BG.${chapter}.${verse}`
                    }
                })
            }

            const existingTexts = await rawDb.texts.findMany({
                where: { node_id: node.id }
            })

            if (existingTexts.length > 0) {
                console.log(`⏭️ Already exists BG ${key}`)
                continue
            }

            const textsToInsert: any[] = []

            if (sanskrit) {
                textsToInsert.push({
                    node_id: node.id,
                    content_type: 'mula',
                    language: 'sa',
                    script: 'devanagari',
                    content: sanskrit
                })
            }

            if (iast) {
                textsToInsert.push({
                    node_id: node.id,
                    content_type: 'transliteration',
                    language: 'sa',
                    script: 'latin',
                    content: iast
                })
            }

            if (t?.en) {
                textsToInsert.push({
                    node_id: node.id,
                    content_type: 'anuvada',
                    language: 'en',
                    script: 'latin',
                    content: t.en
                })
            }

            if (textsToInsert.length === 0) {
                console.warn(`⚠️ Skipping empty BG ${key}`)
                continue
            }

            await rawDb.texts.createMany({ data: textsToInsert })

            console.log(`RAW ✅ BG ${key}`)
        } catch (err) {
            console.error(`❌ Failed BG ${key}`, err)
        }
    }

    console.log('🎉 RAW INGESTION COMPLETE')
}

run()
    .catch(console.error)
    .finally(async () => {
        await rawDb.$disconnect()
    })