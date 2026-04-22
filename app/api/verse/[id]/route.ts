import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Verse, Commentary, LanguageKey } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Missing verse ID' }, { status: 400 })
  }

  try {
    const node = await prisma.node.findUnique({
      where: { id },
      include: {
        shastra: true,
        texts: {
          include: {
            source: true
          }
        },
        fromRelations: {
          include: {
            toNode: true
          }
        }
      },
    })

    if (!node) {
      return NextResponse.json({ error: 'Node not found' }, { status: 404 })
    }

    // Initialize base verse object
    const verse: Verse = {
      id: node.id,
      unitType: 'sloka', // default
      reference: {
        text: node.shastra.slug,
        chapter: 0,
        verse: node.orderIndex,
      },
      text: {},
      meanings: {
        synonyms: {},
        translations: {},
        segmentation: {},
        anvaya: {},
        anvayaTranslation: {},
      },
      translationsByAuthor: [],
      commentary: [],
      meta: {
        canonicalRef: node.canonicalRef || undefined,
      },
      relations: {
        related_verses: [],
        courses: [],
        guidance: [],
        seva_domains: [],
      },
    }

    // Process Decomposed Texts
    for (const t of node.texts) {
      const lang = t.language as string
      
      if (t.contentType === 'sutra' || t.contentType === 'title') {
        // Map scripts
        const scriptKey = t.script === 'devanagari' ? 'devanagari' : 'iast'
        verse.text[scriptKey] = t.content
        if (t.contentType === 'sutra') verse.unitType = 'sutra'
      } else if (t.contentType === 'translation') {
        verse.meanings.translations[lang] = t.content
        verse.translationsByAuthor.push({
          author: t.source?.name || 'Anonymous',
          lang: lang,
          text: t.content
        })
      } else if (t.contentType === 'commentary') {
        verse.commentary.push({
          author: t.source?.name || 'Anonymous',
          sampradaya: t.source?.role || 'general',
          content: { [lang]: t.content },
          subCommentaries: []
        })
      }
    }

    // Map Relations
    verse.relations.related_verses = node.fromRelations.map(r => ({
      id: r.toNodeId,
      name: r.toNode.canonicalRef || r.toNode.slug || 'Related'
    }))

    return NextResponse.json(verse)
  } catch (error: any) {
    console.error('Error fetching verse from Prisma:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}
