import { PrismaClient } from '@dharma/data-access'
import { validateText } from './validateText'

const prisma = new PrismaClient()

export async function ingestVerse({
    shastraSlug,
    chapter,
    verse,
    texts
}: any) {

    const shastra = await prisma.shastras.findUnique({
        where: { slug: shastraSlug }
    })

    if (!shastra) throw new Error('❌ Shastra not found')

    const node = await prisma.nodes.create({
        data: {
            shastra_id: shastra.id,
            level: 'shloka',
            slug: `bg.shloka.${chapter}.${verse}`,
            order_index: verse,
            canonical_ref: `BG.${chapter}.${verse}`
        }
    })

    for (const t of texts) {
        validateText(t)

        await prisma.texts.create({
            data: {
                node_id: node.id,
                content_type: t.content_type,
                language: t.language,
                script: t.script,
                content: t.content
            }
        })
    }

    return node.id
}