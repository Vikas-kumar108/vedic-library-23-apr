import { LibraryRepository } from './library.repository'
import { resolveReference } from '../shared/utils/reference.util'
import { getPrimaryText } from '../shared/utils/text.util'
import { toTagList } from '../shared/mappers/tag.mapper'

export class LibraryService {
  constructor(private repository: LibraryRepository) {}

  /**
   * Fetches the entire hierarchical tree for navigation.
   */
  async getTree() {
    const nodes = await this.repository.getLibraryNavigationTree()

    const nodesMap: Record<string, any> = {}
    nodes.forEach((n: any) => {
      const slug = n.slug || 'node'
      const name = n.canonicalRef || slug
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
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
    const node = await this.repository.getVerseWithCommentary(id, isUuid)

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
        canonicalRef: resolveReference(node),
      },
      relations: {
        related_verses: node.fromRelations.map((r: any) => ({
          id: r.toNodeId,
          name: resolveReference(r.toNode)
        })),
        courses: [],
        guidance: [],
        seva_domains: [],
        tags: toTagList(node.tags),
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

    return verse
  }

  /**
   * getRelated: Finds sibling or related nodes based on shared tags.
   */
  async getRelated(nodeId: string, limit: number = 3) {
    const node = await this.repository.getVerseTags(nodeId)

    if (!node || node.tags.length === 0) return []

    const tagIds = node.tags.map(t => t.tagId)
    const related = await this.repository.getRelatedVerses(nodeId, tagIds, limit)

    return related.map(r => ({
      id: r.id,
      slug: r.slug,
      title: resolveReference(r),
      shastra: r.shastra.name,
      snippet: getPrimaryText(r.texts)
    }))
  }

  /**
   * Fetches all tags organized by hierarchy.
   */
  async getTags() {
    return await this.repository.getLibraryTaxonomy()
  }
}



