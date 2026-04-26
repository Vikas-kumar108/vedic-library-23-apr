import { PrismaClient } from '@prisma/client'

export class LibraryRepository {
  constructor(private prisma: PrismaClient) { }

  async getLibraryNavigationTree() {
    return this.prisma.nodes.findMany({
      where: {
        status: 'ACTIVE'
      },
      orderBy: {
        order_index: 'asc'
      }
    })
  }

  async getVerseWithCommentary(id: string, isUuid: boolean) {
    return this.prisma.nodes.findFirst({
      where: isUuid
        ? { id }
        : { slug: id },

      include: {
        shastras: true,

        texts: {
          include: {
            sources: true
          }
        },

        node_relations_node_relations_from_node_idTonodes: {
          include: {
            nodes_node_relations_to_node_idTonodes: true
          }
        },

        node_tags: {
          include: {
            tags: {
              include: {
                tags: true
              }
            }
          }
        }
      }
    })
  }

  async getVerseTags(nodeId: string) {
    return this.prisma.nodes.findUnique({
      where: { id: nodeId },
      include: {
        node_tags: true
      }
    })
  }

  async getRelatedVerses(nodeId: string, tagIds: string[], limit: number) {
    return this.prisma.nodes.findMany({
      where: {
        id: { not: nodeId },
        node_tags: {
          some: {
            tag_id: { in: tagIds }
          }
        }
      },
      take: limit,
      include: {
        shastras: true,
        texts: true
      }
    })
  }

  async getLibraryTaxonomy() {
    return this.prisma.tags.findMany({
      where: {
        parent_id: null
      },
      include: {
        other_tags: {
          include: {
            other_tags: true
          }
        }
      }
    })
  }
}