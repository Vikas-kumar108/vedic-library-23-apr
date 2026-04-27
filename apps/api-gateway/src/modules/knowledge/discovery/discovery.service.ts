import { PrismaClient } from '@dharma/data-access'
import { searchByIntent } from '@dharma/search-domain'
import { DiscoveryRepository } from './discovery.repository'
import { resolveReference } from '../shared/utils/reference.util'
import { getPrimaryText } from '../shared/utils/text.util'
import { toLightVerse } from '../shared/mappers/verse.mapper'
import { SeekerStateService } from '../../../intelligence/seeker-state.service'
import { RecommendationService } from '../../../intelligence/recommendation.service'

export class DiscoveryService {
  constructor(private repository: DiscoveryRepository) {}

  /**
   * getRecommended: Suggests wisdom based on user stage, statistics, and tags.
   */
  async getRecommended(userId?: string, tags: string[] = [], manualStage?: number) {
    // 1. Resolve Personalization Context (Primary Driver)
    let eligibilityLevel = manualStage || 1;
    let skipCount = 0;

    if (userId) {
      try {
        const { profile, stats } = await this.repository.getUserContext(userId);
        eligibilityLevel = profile?.eligibility_level || eligibilityLevel;
        skipCount = stats?.nodes_read_count || 0;
      } catch (e) {
        // Silent fallback to defaults
      }
    }

    // 2. Fetch Personalized Mix (Gracefully bypass empty node_tags)
    const searchTags = tags.length > 0 ? tags : ['daily-wisdom', 'grihastha-dharma'];
    
    try {
      let taggedResults = [];
      try {
        taggedResults = await this.repository.findRecommendedByTags(eligibilityLevel, searchTags, skipCount % 5);
      } catch (e) {
        // node_tags might be missing, handled below
      }

      const taggedNodes = taggedResults.map((r: any) => r.nodes).filter(Boolean);
      
      // 3. Populate with curated fallback if tagged results are sparse
      let fallbackNodes = [];
      if (taggedNodes.length < 3) {
        fallbackNodes = await this.repository.findCuratedWisdom(eligibilityLevel, (skipCount + taggedNodes.length) % 10);
      }

      // Combine and deduplicate
      const combined = [...taggedNodes, ...fallbackNodes];
      const uniqueNodes = Array.from(new Map(combined.map(n => [n.slug, n])).values());

      // 4. Intelligence Layer: Suggest Next Step
      let nextStep = null;
      if (userId) {
        const { profile, stats } = await this.repository.getUserContext(userId);
        const state = SeekerStateService.computeState(profile as any, profile as any, stats);
        const recService = new RecommendationService((this.repository as any).prisma);
        nextStep = await recService.suggestNext(userId, state);
      }

      return {
        recommendations: uniqueNodes.slice(0, 3).map((n: any) => ({
          ...toLightVerse(n),
          slug: n.slug || 'unknown-wisdom',
          shastra: n.shastras?.[0]?.name || 'Vedic Library',
          type: taggedNodes.some(tn => tn.id === n.id) ? 'recommendation' : 'curated'
        })),
        next_step: nextStep
      };
    } catch (e) {
      return { recommendations: [], next_step: null };
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
        (tag as any).node_tags.map((tn: any) => ({
          tagId: tag.id,
          tagName: tag.name,
          nodeId: tn.nodes.id,
          slug: tn.nodes.slug,
          level: tn.nodes.level,
          text: getPrimaryText(tn.nodes.texts),
          language: tn.nodes.texts[0]?.language || '',
        }))
      )

      if (nodeResults.length === 0) {
        const texts = await this.repository.findTextsByKeyword(query)
        nodeResults = texts.map((t: any) => ({
          tagId: 'general',
          tagName: 'General Wisdom',
          nodeId: t.nodes.id,
          slug: t.nodes.slug,
          level: t.nodes.level,
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
        id: n.nodes.id,
        slug: n.nodes.slug,
        level: n.nodes.level,
        text: getPrimaryText(n.nodes.texts),
        language: n.nodes.texts[0]?.language || '',
      }))
    } catch (e) {
      return []
    }
  }
}



