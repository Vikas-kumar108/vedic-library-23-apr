import { ingestVerse } from '../lib/ingestVerse'
import fs from 'fs'

const data = JSON.parse(
    fs.readFileSync('apps/ingestion-service/data/gita.json', 'utf-8')
)

async function run() {
    for (const v of data) {
        await ingestVerse({
            shastraSlug: 'bhagavad-gita',
            chapter: v.chapter,
            verse: v.verse,
            texts: [
                {
                    content_type: 'mula',
                    language: 'sa',
                    script: 'devanagari',
                    content: v.sanskrit
                },
                {
                    content_type: 'transliteration',
                    language: 'sa',
                    script: 'latin',
                    content: v.iast
                },
                {
                    content_type: 'anuvada',
                    language: 'en',
                    script: 'latin',
                    content: v.translation
                }
            ]
        })

        console.log(`✅ BG ${v.chapter}.${v.verse}`)
    }
}

run()