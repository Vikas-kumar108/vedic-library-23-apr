import { PrismaClient } from '@dharma/data-access'
import { searchByIntent } from '@dharma/search-domain'

export class DiscoveryService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getRecommended: Suggests wisdom based on user stage and tags.
   */
  async getRecommended(eligibilityLevel: number, tags: string[] = []) {
    // 1. Try to find nodes by tags first
    // Note: If node_tags doesn't exist yet in the Golden V18, this will return empty
    try {
      const results = await (this.prisma as any).node_tags.findMany({
        where: {
          node: { sensitivity: { lte: eligibilityLevel } },
          tag: { slug: { in: tags.length > 0 ? tags : ['daily-wisdom', 'grihastha-dharma'] } }
        },
        include: {
          node: {
            include: {
              texts: { take: 1 },
              shastra: true
            }
          }
        },
        take: 3
      })

      if (results.length > 0) {
        return results.map((r: any) => ({
          id: r.node.id,
          slug: r.node.slug,
          title: r.node.canonical_ref || r.node.slug,
          shastra: r.node.shastra.name,
          text: r.node.texts[0]?.content || '',
          type: 'recommendation'
        }))
      }
    } catch (e) {
      console.warn('DiscoveryService: node_tags table might be missing or empty.')
    }

    // 2. Fallback to generic high-level wisdom
    try {
      const fallback = await this.prisma.nodes.findMany({
        where: { sensitivity: { lte: eligibilityLevel } },
        include: {
          texts: { take: 1 },
          shastra: true
        },
        take: 3
      })

      return fallback.map(n => ({
        id: n.id,
        slug: n.slug,
        title: n.canonical_ref || n.slug,
        shastra: n.shastra.name,
        text: n.texts[0]?.content || '',
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
      const tags = await this.prisma.tags.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
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
                  texts: { take: 1 }
                }
              }
            },
            take: 5
          }
        }
      })

      let nodeResults = tags.flatMap(tag => 
        (tag as any).nodes.map((tn: any) => ({
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
        const texts = await this.prisma.texts.findMany({
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
    } catch (e) {
      console.error('Legacy search failure:', e)
      return []
    }
  }

  async getNodesByTag(tagIdOrSlug: string, eligibilityLevel: number = 1) {
    try {
      const nodes = await (this.prisma as any).node_tags.findMany({
        where: {
          node: {
            sensitivity: { lte: eligibilityLevel }
          },
          OR: [
            { tag_id: tagIdOrSlug },
            { tag: { slug: tagIdOrSlug } },
          ],
        },
        include: {
          node: {
            include: {
              texts: { take: 1 }
            }
          }
        },
        take: 20
      })

      return nodes.map((n: any) => ({
        id: n.node.id,
        slug: n.node.slug,
        level: n.node.level,
        text: n.node.texts[0]?.content || '',
        language: n.node.texts[0]?.language || '',
      }))
    } catch (e) {
      return []
    }
  }
}
