import { PrismaClient } from '@dharma/data-access'

export class DiscoveryRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * [IDENTITY MIGRATION GATEWAY]
   */
  private get userStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) return (this.prisma as any).identity_users;
    return (this.prisma as any).users;
  }

  private get spiritualProfileStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) return (this.prisma as any).identity_spiritual_profiles;
    return (this.prisma as any).spiritual_profiles;
  }

  private get statisticsStore() {
    const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
    if (isIdentityEnabled) return (this.prisma as any).identity_user_statistics;
    return (this.prisma as any).user_statistics;
  }

  async getUserContext(userId: string) {
    const [profile, stats] = await Promise.all([
      this.spiritualProfileStore.findUnique({ where: { user_id: userId } }),
      this.statisticsStore.findUnique({ where: { user_id: userId } })
    ]);
    return { profile, stats };
  }

  async getRecentReadNodes(userId: string, limit: number = 20): Promise<string[]> {
    try {
      const logs = await (this.prisma as any).audit_logs.findMany({
        where: {
          performed_by_id: userId,
          action: 'READ_NODE'
        },
        orderBy: { timestamp: 'desc' },
        take: limit,
        select: { record_id: true }
      });
      return logs.map((l: any) => l.record_id).filter(Boolean);
    } catch (e) {
      return [];
    }
  }

  /**
   * Finds wisdom nodes based on specific tags and seeker eligibility.
   */
  async findRecommendedByTags(eligibilityLevel: number, tags: string[], skip: number = 0, excludeIds: string[] = []) {
    return await (this.prisma as any).node_tags.findMany({
      where: {
        node: { 
          id: { notIn: excludeIds },
          sensitivity: { lte: eligibilityLevel } 
        },
        tag: { slug: { in: tags } }
      },
      include: {
        node: {
          include: {
            texts: { take: 1 },
            shastras: true
          }
        }
      },
      // TODO: Implement a unified 'sequence_number' column for absolute cross-shastra ordering
      orderBy: { node: { order_index: 'asc' } },
      skip: skip,
      take: 10
    })
  }

  /**
   * Fallback query to find generic high-level wisdom for a seeker's level.
   */
  async findGenericWisdom(eligibilityLevel: number, skip: number = 0, excludeIds: string[] = []) {
    return await (this.prisma as any).nodes.findMany({
      where: { 
        id: { notIn: excludeIds },
        sensitivity: { lte: eligibilityLevel } 
      },
      include: {
        texts: { take: 1 },
        shastras: true
      },
      orderBy: [{ order_index: 'asc' }, { created_at: 'asc' }],
      skip: skip,
      take: 10
    })
  }

  /**
   * findCuratedWisdom: Fallback logic when node_tags are empty.
   * Uses shastras and sensitivity as primary drivers.
   */
  async findCuratedWisdom(eligibilityLevel: number, skip: number = 0, excludeIds: string[] = []) {
    return await (this.prisma as any).nodes.findMany({
      where: {
        id: { notIn: excludeIds },
        sensitivity: { lte: eligibilityLevel },
        shastras: { some: { status: 'PUBLISHED' } }
      },
      include: {
        texts: { take: 1 },
        shastras: true
      },
      orderBy: [{ order_index: 'asc' }, { created_at: 'asc' }],
      skip: skip,
      take: 10
    })
  }

  async updateGuidedPathState(userId: string, focus: string, nodeId: string): Promise<boolean> {
    try {
      await this.spiritualProfileStore.update({
        where: { user_id: userId },
        data: {
          current_focus: focus,
          current_primary_node_id: nodeId,
          last_guided_at: new Date()
        }
      });
      return true;
    } catch (e: any) {
      console.error(`[GUIDED_PATH] Persistence Failure for user ${userId}:`, e.message);
      return false;
    }
  }

  async clearPrimaryNodeAtomic(userId: string, nodeId: string) {
    try {
      // Atomic completion: Only clear if the current primary matches the read node
      await this.spiritualProfileStore.updateMany({
        where: {
          user_id: userId,
          current_primary_node_id: nodeId
        },
        data: {
          current_primary_node_id: null
        }
      });
    } catch (e: any) {
      console.error(`[GUIDED_PATH] Atomic Clear Failure for user ${userId}:`, e.message);
    }
  }

  async logPathEvent(userId: string, action: string, nodeId?: string, metadata: any = {}) {
    try {
      // Fire-and-forget logging to ensure zero impact on seeker performance
      (this.prisma as any).audit_logs.create({
        data: {
          performed_by_id: userId,
          record_id: nodeId,
          action,
          module: 'KNOWLEDGE',
          new_data: metadata
        }
      }).catch(() => {});
    } catch (e) {
      // Never break the main shastric flow
    }
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
