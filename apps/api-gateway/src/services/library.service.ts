import { PrismaClient } from '@dharma/data-access'

export class LibraryService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches the entire hierarchical tree for navigation.
   */
  async getTree() {
    const nodes = await this.prisma.node.findMany({
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        parentId: true,
        slug: true,
        name: true,
        level: true,
        canonicalRef: true,
      }
    })
    return nodes
  }

  /**
   * Fetches a specific verse and its content segments.
   */
  async getVerse(id: string) {
    // Try UUID first, then slug
    const node = await this.prisma.node.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }]
      },
      include: {
        texts: {
          include: { source: true }
        }
      }
    })

    if (!node) return null

    return {
      id: node.id,
      slug: node.slug,
      name: node.name,
      canonicalRef: node.canonicalRef,
      segments: node.texts.map(t => ({
        id: t.id,
        content: t.content,
        contentType: t.contentType,
        language: t.language,
        script: t.script,
        isPrimary: t.isPrimary,
        source: t.source?.name
      }))
    }
  }
}
