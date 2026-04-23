import { PrismaClient } from '@prisma/client'

/**
 * DiscoveryService: The "Search & Recommendation" Engine.
 * 
 * Purpose: This service bridges the gap between ancient Shastra nodes and modern life situations.
 * It is responsible for finding practical wisdom that is relevant to a user's specific 
 * Life Stage and nature, while strictly enforcing Adhikāra (Eligibility) rules.
 */
export class DiscoveryService {
  constructor(private prisma: PrismaClient) {}

  /**
   * searchPractical: Performs a natural language search for life-relevant wisdom.
   * 
   * @param query - The search term (e.g., "family tension", "career stress").
   * @param eligibilityLevel - The user's Adhikāra level (1-5).
   * 
   * Responsibility:
   * 1. Search thematic Tags for keyword matches.
   * 2. Filter nodes within those tags based on user eligibility.
   * 3. Fallback to general text search if no specific tags are found.
   */
  async searchPractical(query: string, eligibilityLevel: number = 1) {
    // Search tags based on keywords or name
    const tags = await this.prisma.tag.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { keywords: { hasSome: [query.toLowerCase()] } },
        ],
      },
      include: {
        nodes: {
          where: {
            node: {
              sensitivity: { lte: eligibilityLevel }
            }
          },
          include: {
            node: {
              include: {
                texts: {
                  take: 1,
                },
              },
            },
          },
          take: 5,
        },
      },
    })

    // If no tags found, try searching texts directly
    let nodeResults = tags.flatMap(tag => 
      tag.nodes.map(tn => ({
        tagId: tag.id,
        tagName: tag.name,
        nodeId: tn.node.id,
        slug: tn.node.slug,
        level: tn.node.level,
        text: tn.node.texts[0]?.content || '',
        language: tn.node.texts[0]?.language || '',
      }))
    )

    if (nodeResults.length === 0) {
      const texts = await this.prisma.text.findMany({
        where: {
          content: { contains: query, mode: 'insensitive' },
        },
        include: {
          node: true,
        },
        take: 10,
      })
      nodeResults = texts.map(t => ({
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
  }

  async getNodesByTag(tagIdOrSlug: string, eligibilityLevel: number = 1) {
    const nodes = await this.prisma.nodeTag.findMany({
      where: {
        node: {
          sensitivity: { lte: eligibilityLevel }
        },
        OR: [
          { tagId: tagIdOrSlug },
          { tag: { slug: tagIdOrSlug } },
        ],
      },
      include: {
        node: {
          include: {
            texts: {
              take: 1,
            },
          },
        },
      },
      take: 20,
    })

    return nodes.map(n => ({
      id: n.node.id,
      slug: n.node.slug,
      level: n.node.level,
      text: n.node.texts[0]?.content || '',
      language: n.node.texts[0]?.language || '',
    }))
  }
}
