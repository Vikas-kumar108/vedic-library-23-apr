import { PrismaClient } from '@dharma/data-access'
import { searchByIntent } from '@dharma/search-domain'
import { DiscoveryRepository } from './discovery.repository'
import { resolveReference } from '../shared/utils/reference.util'
import { getPrimaryText } from '../shared/utils/text.util'
import { toLightVerse } from '../shared/mappers/verse.mapper'

export class DiscoveryService {
  constructor(private repository: DiscoveryRepository) {}

  /**
   * getRecommended: Suggests wisdom based on user stage and tags.
   */
  async getRecommended(eligibilityLevel: number, tags: string[] = []) {
    // 1. Try to find nodes by tags first
    try {
      const searchTags = tags.length > 0 ? tags : ['daily-wisdom', 'grihastha-dharma']
      const results = await this.repository.findRecommendedByTags(eligibilityLevel, searchTags)

      if (results.length > 0) {
        return results.map((r: any) => ({
          ...toLightVerse(r.node),
          slug: r.node.slug,
          shastra: r.node.shastra.name,
          type: 'recommendation'
        }))
      }
    } catch (e) {
      console.warn('DiscoveryService: node_tags table might be missing or empty.')
    }

    // 2. Fallback to generic high-level wisdom
    try {
      const fallback = await this.repository.findGenericWisdom(eligibilityLevel)

      return fallback.map((n: any) => ({
        ...toLightVerse(n),
        slug: n.slug,
        shastra: n.shastra.name,
        type: 'fallback'
      }))
    } catch (e) {
      console.error('DiscoveryService Error:', e)
      return [] // Graceful empty state
    }
  }

  async searchPractical(query: string, eligibilityLevel: number = 1) {
    // Use the refined Intent-Search engine
    try {
      const results = await searchByIntent(query, eligibilityLevel)

      if (results.length > 0) {
        return results.map(r => ({
          tagId: 'intent-match',
          tagName: 'Wisdom Match',
          nodeId: r.nodeId,
          slug: r.canonicalRef,
          level: 'verse',
          text: r.content,
          language: 'mixed',
          shastra: r.shastraName
        }))
      }
    } catch (e) {
      console.warn('Intent search failed, falling back to legacy search.')
    }

    // Fallback to legacy tag search if no intent found
    try {
      const tags = await this.repository.findTagsByKeyword(query, eligibilityLevel)

      let nodeResults = tags.flatMap((tag: any) => 
        (tag as any).nodes.map((tn: any) => ({
          tagId: tag.id,
          tagName: tag.name,
          nodeId: tn.node.id,
          slug: tn.node.slug,
          level: tn.node.level,
          text: getPrimaryText(tn.node.texts),
          language: tn.node.texts[0]?.language || '',
        }))
      )

      if (nodeResults.length === 0) {
        const texts = await this.repository.findTextsByKeyword(query)
        nodeResults = texts.map((t: any) => ({
          tagId: 'general',
          tagName: 'General Wisdom',
          nodeId: t.node.id,
          slug: t.node.slug,
          level: t.node.level,
          text: t.content,
          language: t.language,
        }))
      }

      return nodeResults
    } catch (e) {
      console.error('Legacy search failure:', e)
      return []
    }
  }

  async getNodesByTag(tagIdOrSlug: string, eligibilityLevel: number = 1) {
    try {
      const nodes = await this.repository.findNodesByTagReference(tagIdOrSlug, eligibilityLevel)

      return nodes.map((n: any) => ({
        id: n.node.id,
        slug: n.node.slug,
        level: n.node.level,
        text: getPrimaryText(n.node.texts),
        language: n.node.texts[0]?.language || '',
      }))
    } catch (e) {
      return []
    }
  }
}



