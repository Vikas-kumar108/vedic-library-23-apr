import { PrismaClient } from '@dharma/data-access'

export class DiscoveryRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Finds wisdom nodes based on specific tags and seeker eligibility.
   */
  async findRecommendedByTags(eligibilityLevel: number, tags: string[]) {
    return await (this.prisma as any).node_tags.findMany({
      where: {
        node: { sensitivity: { lte: eligibilityLevel } },
        tag: { slug: { in: tags } }
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
  }

  /**
   * Fallback query to find generic high-level wisdom for a seeker's level.
   */
  async findGenericWisdom(eligibilityLevel: number) {
    return await (this.prisma as any).nodes.findMany({
      where: { sensitivity: { lte: eligibilityLevel } },
      include: {
        texts: { take: 1 },
        shastra: true
      },
      take: 3
    })
  }

  /**
   * Searches for spiritual tags matching a keyword and includes associated nodes.
   */
  async findTagsByKeyword(query: string, eligibilityLevel: number) {
    return await (this.prisma as any).tags.findMany({
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
  }

  /**
   * Performs a literal content search in the texts database.
   */
  async findTextsByKeyword(query: string) {
    return await (this.prisma as any).texts.findMany({
      where: {
        content: { contains: query, mode: 'insensitive' },
      },
      include: {
        node: true,
      },
      take: 10,
    })
  }

  /**
   * Fetches all nodes associated with a specific tag (by ID or Slug).
   */
  async findNodesByTagReference(tagIdOrSlug: string, eligibilityLevel: number) {
    return await (this.prisma as any).node_tags.findMany({
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
  }
}
