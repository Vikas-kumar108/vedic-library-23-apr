import { LibraryRepository } from './library.repository'
import { resolveReference } from '../shared/utils/reference.util'
import { getPrimaryText } from '../shared/utils/text.util'
import { toTagList } from '../shared/mappers/tag.mapper'

export class LibraryService {
  constructor(private repository: LibraryRepository) { }

  async getTree() {
    const nodes = await this.repository.getLibraryNavigationTree()

    const nodesMap: Record<string, any> = {}

    nodes.forEach((n: any) => {
      const slug = n.slug || 'node'

      const name =
        n.canonical_ref ||
        slug
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

      nodesMap[n.id] = {
        id: n.id,
        parent_id: n.parent_id,
        slug: n.slug,
        name,
        type: n.level,
        children: []
      }
    })

    const tree: any[] = []

    nodes.forEach((n: any) => {
      if (n.parent_id && nodesMap[n.parent_id]) {
        nodesMap[n.parent_id].children.push(nodesMap[n.id])
      } else {
        tree.push(nodesMap[n.id])
      }
    })

    return tree
  }

  async getVerse(id: string) {
    const isUuid = /^[0-9a-f-]{36}$/i.test(id)
    const node = await this.repository.getVerseWithCommentary(id, isUuid)

    if (!node) return null

    const verse: any = {
      id: node.id,
      unitType: node.level === 'shloka' ? 'sloka' : 'category',
      reference: {
        text: node.shastras?.slug,
        chapter: 0,
        verse: node.order_index
      },
      text: {},
      meanings: {
        synonyms: {},
        translations: {},
        segmentation: {},
        anvaya: {},
        anvayaTranslation: {}
      },
      translationsByAuthor: [],
      commentary: [],
      meta: {
        canonicalRef: resolveReference(node)
      },
      relations: {
        related_verses:
          node.node_relations_node_relations_from_node_idTonodes?.map((r: any) => ({
            id: r.to_node_id,
            name: resolveReference(r.nodes_node_relations_to_node_idTonodes)
          })) || [],
        courses: [],
        guidance: [],
        seva_domains: [],
        tags: toTagList(node.node_tags || [])
      }
    }

    for (const t of node.texts || []) {
      const lang = t.language

      if (t.content_type === 'sutra' || t.content_type === 'title') {
        const scriptKey = t.script === 'devanagari' ? 'devanagari' : 'iast'
        verse.text[scriptKey] = t.content
        if (t.content_type === 'sutra') verse.unitType = 'sutra'
      } else if (t.content_type === 'translation') {
        verse.meanings.translations[lang] = t.content

        verse.translationsByAuthor.push({
          author: t.sources?.name ?? 'Anonymous',
          lang,
          text: t.content
        })
      } else if (t.content_type === 'commentary') {
        verse.commentary.push({
          author: t.sources?.name ?? 'Anonymous',
          sampradaya: t.sources?.role ?? 'general',
          content: { [lang]: t.content },
          subCommentaries: []
        })
      }
    }

    return verse
  }

  async getRelated(nodeId: string, limit: number = 3) {
    const node = await this.repository.getVerseTags(nodeId)

    if (!node || !node.node_tags || node.node_tags.length === 0) return []

    const tagIds = node.node_tags.map((t: any) => t.tag_id)

    const related = await this.repository.getRelatedVerses(nodeId, tagIds, limit)

    return related.map((r: any) => ({
      id: r.id,
      slug: r.slug,
      title: resolveReference(r),
      shastra: r.shastras?.name,
      snippet: getPrimaryText(r.texts)
    }))
  }

  async getTags() {
    return await this.repository.getLibraryTaxonomy()
  }
}