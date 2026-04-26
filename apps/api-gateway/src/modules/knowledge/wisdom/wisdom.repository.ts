import { PrismaClient } from '@dharma/data-access'

export class WisdomRepository {
  constructor(private prisma: PrismaClient) { }

  /**
   * Fetches a specific verse by its slug, including shastra metadata.
   */
  async findVerseBySlug(slug: string) {
    return this.prisma.nodes.findUnique({
      where: { slug },
      include: {
        shastra: true
      }
    })
  }
}
