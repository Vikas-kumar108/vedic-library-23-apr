import 'dotenv/config'
import { rawDb, syncDb } from '@dharma/data-access/clients'

async function run() {
    const rawNodes = await rawDb.nodes.findMany({
        include: {
            texts: true,
            shastras: true
        }
    })

    for (const rawNode of rawNodes) {
        try {
            // ✅ Ensure shastra exists in sync
            let cleanShastra = await syncDb.shastras.findFirst({
                where: { slug: rawNode.shastras.slug }
            })

            if (!cleanShastra) {
                cleanShastra = await syncDb.shastras.create({
                    data: {
                        slug: rawNode.shastras.slug,
                        name: rawNode.shastras.name,
                        structure_type: rawNode.shastras.structure_type
                    }
                })
            }

            // ✅ Find or create node
            let cleanNode = await syncDb.nodes.findFirst({
                where: { slug: rawNode.slug }
            })

            if (!cleanNode) {
                cleanNode = await syncDb.nodes.create({
                    data: {
                        shastra_id: cleanShastra.id,
                        level: rawNode.level,
                        slug: rawNode.slug,
                        order_index: rawNode.order_index,
                        canonical_ref: rawNode.canonical_ref
                    }
                })
            }

            // ✅ Skip if already synced
            const existingTexts = await syncDb.texts.findMany({
                where: { node_id: cleanNode.id }
            })

            if (existingTexts.length > 0) {
                console.log(`⏭️ SYNC exists ${rawNode.slug}`)
                continue
            }

            // ✅ Copy texts
            const textsToInsert = rawNode.texts
                .filter(t => t.content)
                .map(t => ({
                    node_id: cleanNode!.id,
                    content_type: t.content_type,
                    language: t.language,
                    script: t.script,
                    content: t.content
                }))

            if (textsToInsert.length === 0) {
                console.warn(`⚠️ No valid texts for ${rawNode.slug}`)
                continue
            }

            await syncDb.texts.createMany({
                data: textsToInsert
            })

            console.log(`SYNC ✅ ${rawNode.slug}`)
        } catch (err) {
            console.error(`❌ SYNC FAILED ${rawNode.slug}`, err)
        }
    }

    console.log('🎉 SYNC COMPLETE')
}

run()
    .catch(console.error)
    .finally(async () => {
        await rawDb.$disconnect()
        await syncDb.$disconnect()
    })