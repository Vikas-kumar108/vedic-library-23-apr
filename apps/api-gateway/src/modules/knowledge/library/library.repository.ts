import { PrismaClient } from '@dharma/data-access'

export class LibraryRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches the hierarchical structure of the library, including chapters and verses.
   */
  async getLibraryNavigationTree() {
    return this.prisma.node.findMany({
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        parentId: true,
        slug: true,
        level: true,
        canonicalRef: true,
      }
    })
  }

  /**
   * Fetches a specific Scripture node (Verse or Sutra) with its associated
   * Shastra metadata, translations, and multi-author commentaries.
   */
  async getVerseWithCommentary(id: string, isUuid: boolean) {
    return this.prisma.node.findFirst({
      where: {
        OR: [
          ...(isUuid ? [{ id }] : []),
          { slug: id }
        ]
      },
      include: {
        shastra: true,
        texts: {
          include: { source: true }
        },
        fromRelations: {
          include: { toNode: true }
        },
        tags: {
          include: {
            tag: {
              include: { parent: true }
            }
          }
        }
      }
    })
  }

  /**
   * Fetches semantic tags assigned to a specific verse for relation mapping.
   */
  async getVerseTags(nodeId: string) {
    return this.prisma.node.findUnique({
      where: { id: nodeId },
      include: {
        tags: { select: { tagId: true } }
      }
    })
  }

  /**
   * Finds related verses across different shastras based on shared philosophical tags.
   */
  async getRelatedVerses(nodeId: string, tagIds: string[], limit: number) {
    return this.prisma.node.findMany({
      where: {
        id: { not: nodeId },
        tags: {
          some: { tagId: { in: tagIds } }
        }
      },
      include: {
        shastra: true,
        texts: {
          where: { contentType: { in: ['sutra', 'title'] } },
          take: 1
        }
      },
      take: limit
    })
  }

  /**
   * Fetches the top-level categories and sub-categories of the library taxonomy.
   */
  async getLibraryTaxonomy() {
    return this.prisma.tag.findMany({
      where: { parentId: null },
      include: {
        subtags: true
      },
      orderBy: { name: 'asc' }
    })
  }
}
