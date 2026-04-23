import { PrismaClient } from '@dharma/data-access'
import { transliterate, formatReference } from '@dharma/text-engine'

export class LibraryService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches the entire hierarchical tree for navigation.
   */
  async getTree() {
    const nodes = await this.prisma.node.findMany({
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        parentId: true,
        slug: true,
        level: true,
        canonicalRef: true,
      }
    })

    const nodesMap: Record<string, any> = {}
    nodes.forEach(n => {
      const slug = n.slug || 'node'
      const name = n.canonicalRef || slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      nodesMap[n.id] = {
        id: n.id,
        parentId: n.parentId,
        slug: n.slug,
        name: name,
        type: n.level,
        children: []
      }
    })

    const tree: any[] = []
    nodes.forEach(n => {
      if (n.parentId && nodesMap[n.parentId]) {
        nodesMap[n.parentId].children.push(nodesMap[n.id])
      } else {
        tree.push(nodesMap[n.id])
      }
    })

    return tree
  }

  /**
   * Fetches a specific verse and its content segments.
   */
  async getVerse(id: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
    const node = await this.prisma.node.findFirst({
      where: {
        OR: [
          ...(isUuid ? [{ id }] : []),
          { slug: id }
        ]
      },
      include: {
        shastra: true,
        texts: {
          include: { source: true }
        },
        fromRelations: {
          include: { toNode: true }
        },
        tags: {
          include: {
            tag: {
              include: { parent: true }
            }
          }
        }
      }
    })

    if (!node) return null

    // Assemble the Verse object (Standard format used by the platform)
    const verse: any = {
      id: node.id,
      unitType: node.level === 'verse' ? 'sloka' : 'category',
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
        related_verses: node.fromRelations.map(r => ({
          id: r.toNodeId,
          name: r.toNode.canonicalRef || r.toNode.slug || 'Related'
        })),
        courses: [],
        guidance: [],
        seva_domains: [],
        tags: node.tags.map(nt => ({
          id: nt.tag.id,
          slug: nt.tag.slug,
          name: nt.tag.name,
          sanskrit: nt.tag.sanskritName,
          parent: nt.tag.parent ? {
            id: nt.tag.parent.id,
            slug: nt.tag.parent.slug,
            name: nt.tag.parent.name
          } : null
        })),
      },
    }

    // Process Texts
    for (const t of node.texts) {
      const lang = t.language
      if (t.contentType === 'sutra' || t.contentType === 'title') {
        const scriptKey = t.script === 'devanagari' ? 'devanagari' : 'iast'
        verse.text[scriptKey] = t.content
        if (t.contentType === 'sutra') verse.unitType = 'sutra'
        
        // DYNAMIC TRANSLITERATION: If we have Devanagari but no IAST, or vice versa
        if (scriptKey === 'devanagari' && !verse.text['iast']) {
          verse.text['iast'] = transliterate(t.content, 'devanagari', 'iast')
        } else if (scriptKey === 'iast' && !verse.text['devanagari']) {
          verse.text['devanagari'] = transliterate(t.content, 'iast', 'devanagari')
        }
      } else if (t.contentType === 'translation') {
        verse.meanings.translations[lang] = t.content
        verse.translationsByAuthor.push({
          author: t.source?.name || 'Anonymous',
          lang,
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

    // DYNAMIC REFERENCE: Use formatReference if canonicalRef is missing
    if (!verse.meta.canonicalRef) {
      verse.meta.canonicalRef = formatReference(node.shastra.slug, 0, node.orderIndex)
    }

    return verse
  }

  /**
   * Fetches all tags organized by hierarchy.
   */
  async getTags() {
    const tags = await this.prisma.tag.findMany({
      where: { parentId: null },
      include: {
        subtags: true
      },
      orderBy: { name: 'asc' }
    })
    return tags
  }
}
