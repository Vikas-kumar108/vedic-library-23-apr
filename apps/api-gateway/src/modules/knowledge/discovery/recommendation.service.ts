import { DiscoveryRepository } from './discovery.repository'
import { toLightVerse } from '../shared/mappers/verse.mapper'

export enum SeekerTier {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export class SeekerRecommendationService {
  constructor(private repository: DiscoveryRepository) {}

  /**
   * getSeekerRecommendations: Generates a prioritized list of wisdom nodes 
   * based on the seeker's spiritual profile and reading history.
   */
  async getSeekerRecommendations(userId: string) {
    // 1. Resolve Seeker Context
    const { profile, stats } = await this.repository.getUserContext(userId);
    
    if (!profile) {
      throw new Error('Seeker profile not found for recommendation layer.');
    }

    const eligibilityLevel = profile.eligibility_level || 1;
    const nodesRead = stats?.nodes_read_count || 0;
    const tier = this.determineTier(eligibilityLevel);

    // 2. Fetch Anti-Repetition History
    const excludedIds = userId ? await this.repository.getRecentReadNodes(userId, 20) : [];

    // 3. Determine Strategy & Focus
    const strategy = this.getStrategy(tier, profile);
    const focus = this.deriveFocus(profile, eligibilityLevel);

    // 4. Stable Progression Logic: Check for active persisted guide
    let primaryGuide: any = null;
    // 4. Stable Progression Logic: Check for active persisted guide
    let primaryGuide: any = null;
    const isExpired = !profile.last_guided_at || 
      (new Date().getTime() - new Date(profile.last_guided_at).getTime() > 24 * 60 * 60 * 1000);
    
    if (userId && isExpired && profile.current_primary_node_id) {
      this.repository.logPathEvent(userId, 'PATH_REFRESHED', profile.current_primary_node_id, { focus, eligibility_level: eligibilityLevel });
    }

    const hasActiveGuide = profile.current_primary_node_id && !isExpired;

    if (userId && hasActiveGuide) {
      const isNotRead = !excludedIds.includes(profile.current_primary_node_id);

      if (isNotRead) {
        try {
          const node = await (this.repository as any).prisma.nodes.findUnique({
            where: { id: profile.current_primary_node_id },
            include: { texts: { take: 1 }, shastras: true }
          });
          if (node) {
            primaryGuide = {
              node: {
                id: node.id,
                slug: node.slug,
                title: node.canonical_ref || node.slug,
                shastra: node.shastras?.name,
                snippet: node.texts?.[0]?.content?.substring(0, 150) + '...'
              },
              category: 'PRIMARY_GUIDE',
              reason: `✨ CONTINUING: Your current focus for ${focus}.`
            };
          }
        } catch (e) { /* Fallback to new computation */ }
      }
    }
    
    // 5. Fetch Nodes with Sequential Continuity & Anti-Repetition
    const progressPointer = nodesRead;
    const varietyOffset = (nodesRead * 2) % 15;
    
    // Exclude the persisted guide from the generic pools to avoid duplication
    const allExclusions = primaryGuide ? [...excludedIds, primaryGuide.node.id] : excludedIds;

    let [foundational, contextual, advanced] = await Promise.all([
      this.repository.findGenericWisdom(Math.min(eligibilityLevel, 3), progressPointer % 30, allExclusions),
      this.repository.findRecommendedByTags(eligibilityLevel, strategy.tags, varietyOffset, allExclusions),
      this.repository.findCuratedWisdom(eligibilityLevel, (progressPointer + 5) % 20, allExclusions)
    ]);

    // Fallback: If exclusion made the pool too shallow (less than 3 total), retry without exclusion
    if (foundational.length + contextual.length + advanced.length < 3) {
      [foundational, contextual, advanced] = await Promise.all([
        this.repository.findGenericWisdom(Math.min(eligibilityLevel, 3), progressPointer % 30),
        this.repository.findRecommendedByTags(eligibilityLevel, strategy.tags, varietyOffset),
        this.repository.findCuratedWisdom(eligibilityLevel, (progressPointer + 5) % 20)
      ]);
    }

    // 6. Resolve Priority Weights & Focus (Total target: ~10 nodes)
    const weights: Record<string, number> = {
      [SeekerTier.BEGINNER]: { CONTINUITY: 7, RELEVANCE: 3, PROGRESSION: 0 },
      [SeekerTier.INTERMEDIATE]: { CONTINUITY: 4, RELEVANCE: 4, PROGRESSION: 2 },
      [SeekerTier.ADVANCED]: { CONTINUITY: 2, RELEVANCE: 4, PROGRESSION: 4 }
    }[tier];

    // 7. Assemble Weighted and Prioritized List
    const categories = {
      CONTINUITY: this.mapNodes(foundational, 'CONTINUITY', 'Your next logical step in foundational wisdom.'),
      RELEVANCE: this.mapNodes(contextual.map((r: any) => r.node), 'RELEVANCE', `Wisdom to find ${focus.toLowerCase()} in your current state.`),
      PROGRESSION: this.mapNodes(advanced, 'PROGRESSION', 'Advanced insights for deepening your path.')
    };

    const finalRecommendations: any[] = [];
    const seenSlugs = new Set<string>();

    // 8. Integration: Add persisted guide OR compute new one ONLY if missing/expired
    if (primaryGuide) {
      finalRecommendations.push(primaryGuide);
      seenSlugs.add(primaryGuide.node.slug);
    } else if (userId) {
      const primaryPool = focus === 'FOUNDATION' ? categories.CONTINUITY : categories.RELEVANCE;
      if (primaryPool.length > 0) {
        const firstNode = primaryPool[0];
        
        // 🚀 RELIABILITY: Await persistence and only return if successful
        const saved = await this.repository.updateGuidedPathState(userId, focus, firstNode.node.id);
        
        if (saved) {
          this.repository.logPathEvent(userId, 'PRIMARY_ASSIGNED', firstNode.node.id, { focus, eligibility_level: eligibilityLevel });
          finalRecommendations.push({
            ...firstNode,
            category: 'PRIMARY_GUIDE',
            reason: `✨ NEXT STEP: This is your primary focus for ${focus}.`
          });
          seenSlugs.add(firstNode.node.slug);
        }
      }
    }

    // 9. Assemble Remaining nodes based on weights
    for (const [category, count] of Object.entries(weights)) {
      const pool = categories[category as keyof typeof categories] || [];
      let pickedInCat = 0;
      const targetCount = category === 'CONTINUITY' && focus === 'FOUNDATION' ? count - 1 : count; // Adjust if already picked as primary

      for (const item of pool) {
        if (pickedInCat >= targetCount) break;
        if (item && item.node && !seenSlugs.has(item.node.slug)) {
          finalRecommendations.push(item);
          seenSlugs.add(item.node.slug);
          pickedInCat++;
        }
      }
    }

    // Fallback: Final fill from all pools to ensure at least 3
    if (finalRecommendations.length < 3) {
      const allPools = [...categories.CONTINUITY, ...categories.RELEVANCE, ...categories.PROGRESSION];
      for (const item of allPools) {
        if (finalRecommendations.length >= 3) break;
        if (item && item.node && !seenSlugs.has(item.node.slug)) {
          finalRecommendations.push(item);
          seenSlugs.add(item.node.slug);
        }
      }
    }

    return {
      tier,
      currentFocus: focus,
      summary: strategy.description,
      stats: { nodesRead },
      recommendations: finalRecommendations
    };
  }

  private deriveFocus(profile: any, level: number): 'FOUNDATION' | 'STABILITY' | 'CLARITY' | 'DEPTH' {
    if (level <= 3) return 'FOUNDATION';
    if (['disturbed', 'confused'].includes(profile.inner_state)) return 'STABILITY';
    if (profile.inner_state === 'seeking' || (level > 3 && level <= 7)) return 'CLARITY';
    return 'DEPTH';
  }

  private determineTier(level: number): SeekerTier {
    if (level <= 3) return SeekerTier.BEGINNER;
    if (level <= 7) return SeekerTier.INTERMEDIATE;
    return SeekerTier.ADVANCED;
  }

  private getStrategy(tier: SeekerTier, profile: any) {
    const stageTags = this.mapLifeStageToTags(profile.life_stage);
    const stateTags = this.mapInnerStateToTags(profile.inner_state);
    
    const baseTags = [...stageTags, ...stateTags];

    switch (tier) {
      case SeekerTier.BEGINNER:
        return {
          description: 'Focusing on foundational Dharma and daily stability.',
          tags: baseTags.length > 0 ? baseTags : ['dharma', 'stability']
        };
      case SeekerTier.INTERMEDIATE:
        return {
          description: 'Structured progression through Shastra and Sadhana.',
          tags: baseTags.length > 0 ? baseTags : ['sadhana', 'philosophy']
        };
      case SeekerTier.ADVANCED:
        return {
          description: 'Deep philosophical inquiry and contemplative practice.',
          tags: baseTags.length > 0 ? baseTags : ['vedanta', 'contemplation']
        };
    }
  }

  private mapLifeStageToTags(stage: string): string[] {
    const mapping: Record<string, string[]> = {
      student: ['vidya', 'brahmacharya'],
      married: ['grihastha', 'duty'],
      parent: ['family', 'samskara'],
      vanaprastha: ['detachment', 'forest'],
      renunciate: ['sannyasa', 'moksha']
    };
    return mapping[stage] || [];
  }

  private mapInnerStateToTags(state: string): string[] {
    const mapping: Record<string, string[]> = {
      confused: ['clarity', 'direction'],
      seeking: ['truth', 'inquiry'],
      stable: ['sadhana', 'consistency'],
      disturbed: ['peace', 'shanti'],
      detached: ['vairagya', 'liberation']
    };
    return mapping[state] || [];
  }

  private mapNodes(nodes: any[], category: string, reason: string) {
    return nodes.map(n => {
      if (!n) return null;
      return {
        category,
        reason,
        node: {
          ...toLightVerse(n),
          slug: n.slug,
          shastra: n.shastras?.[0]?.name || 'Institutional Library'
        }
      };
    });
  }
}
