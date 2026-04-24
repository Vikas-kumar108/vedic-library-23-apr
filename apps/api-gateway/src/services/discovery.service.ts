import { PrismaClient } from '@prisma/client'
import { searchByIntent } from '@dharma/search-domain'

export class DiscoveryService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getRecommended: Suggests wisdom based on user stage and tags.
   */
  async getRecommended(eligibilityLevel: number, tags: string[] = []) {
    // 1. Try to find nodes by tags first
    const results = await this.prisma.nodeTag.findMany({
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
      return results.map(r => ({
        id: r.node.id,
        slug: r.node.slug,
        title: r.node.canonicalRef || r.node.slug,
        shastra: r.node.shastra.name,
        text: r.node.texts[0]?.content || '',
        type: 'recommendation'
      }))
    }

    // 2. Fallback to generic high-level wisdom
    const fallback = await this.prisma.node.findMany({
      where: { sensitivity: { lte: eligibilityLevel } },
      include: {
        texts: { take: 1 },
        shastra: true
      },
      take: 1
    })

    return fallback.map(n => ({
      id: n.id,
      slug: n.slug,
      title: n.canonicalRef || n.slug,
      shastra: n.shastra.name,
      text: n.texts[0]?.content || '',
      type: 'fallback'
    }))
  }

  async searchPractical(query: string, eligibilityLevel: number = 1) {
    // Use the refined Intent-Search engine
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

    // Fallback to legacy tag search if no intent found
    const tags = await this.prisma.tag.findMany({
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
            texts: { take: 1 }
          }
        }
      },
      take: 20
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
