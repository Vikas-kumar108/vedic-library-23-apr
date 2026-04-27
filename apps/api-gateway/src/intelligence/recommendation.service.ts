import { PrismaClient } from '@dharma/data-access';
import { SeekerState } from './seeker-state.service';

export type Recommendation = {
  next_node_id: string;
  reason: string;
};

/**
 * 🛰️ Institutional Recommendation Engine
 * Responsibility: Guide seekers to the most appropriate next step in their journey.
 * This service implements the simplified high-level guidance logic.
 */
export class RecommendationService {
  constructor(private prisma: PrismaClient) {}

  /**
   * suggestNext: Analyzes seeker state and node relations to find the optimal next node.
   */
  async suggestNext(userId: string, state: SeekerState): Promise<Recommendation | null> {
    const { stage, focus, stability_score, risk_flags } = state;

    // 1. Logic for Disturbed Seekers (Shanti/Bhakti focus)
    if (risk_flags.includes('drop_risk') || stability_score < 30) {
      const calmingNode = await this.prisma.nodes.findFirst({
        where: { 
          level: 'verse', 
          node_tags: { some: { tags: { name: { contains: 'peace', mode: 'insensitive' } } } } 
        },
        orderBy: { created_at: 'desc' }
      });
      if (calmingNode) {
        return {
          next_node_id: calmingNode.id,
          reason: "We noticed you've been feeling disturbed. This calming Bhakti verse might help bring some peace."
        };
      }
    }

    // 2. State-Based Branching
    let targetTag = 'foundational';
    let reason = "Let's start with the basics of Vedic knowledge.";

    if (stage === 'advanced') {
      targetTag = 'deep-shastra';
      reason = "As an advanced seeker, you're ready for deeper ontological analysis.";
    } else if (stage === 'intermediate') {
      targetTag = 'philosophy';
      reason = "Time to bridge your faith with structured philosophical understanding.";
    }

    // 3. Use Node Relations to pick next logical node if available
    // For this example, we'll try to find a node related to the last read node or just based on stage
    const stats = await this.prisma.user_statistics.findUnique({ where: { user_id: userId } });
    
    // 4. Find Nodes matching Stage + Focus
    const recommendedNode = await this.prisma.nodes.findFirst({
      where: {
        level: 'verse',
        node_tags: { some: { tags: { name: { in: [targetTag, focus] } } } }
      },
      orderBy: { created_at: 'asc' }
    });

    if (recommendedNode) {
      return {
        next_node_id: recommendedNode.id,
        reason
      };
    }

    return null;
  }
}
