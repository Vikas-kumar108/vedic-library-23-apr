import { PrismaClient } from '@dharma/data-access'

export class DiscoveryRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * [IDENTITY SCHEMA]
   */
  private get userStore() {
    return this.prisma.users;
  }

  private get spiritualProfileStore() {
    return this.prisma.spiritual_profiles;
  }

  private get statisticsStore() {
    return this.prisma.user_statistics;
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
      const logs = await this.prisma.audit_logs.findMany({
        where: {
          performed_by_id: userId,
          action: 'READ_NODE'
        },
        orderBy: { timestamp: 'desc' },
        take: limit,
        select: { record_id: true }
      });
      return logs.map((l) => l.record_id).filter(Boolean) as string[];
    } catch (e) {
      return [];
    }
  }

  /**
   * Finds wisdom nodes based on specific tags and seeker eligibility.
   */
  async findRecommendedByTags(eligibilityLevel: number, tags: string[], skip: number = 0, excludeIds: string[] = []) {
    return await this.prisma.node_tags.findMany({
      where: {
        nodes: { 
          id: { notIn: excludeIds },
          sensitivity: { lte: eligibilityLevel } 
        },
        tags: { slug: { in: tags } }
      },
      include: {
        nodes: {
          include: {
            texts: { take: 1 },
            shastras: true
          }
        }
      },
      // TODO: Implement a unified 'sequence_number' column for absolute cross-shastra ordering
      orderBy: { nodes: { order_index: 'asc' } },
      skip: skip,
      take: 10
    })
  }

  /**
   * Fallback query to find generic high-level wisdom for a seeker's level.
   */
  async findGenericWisdom(eligibilityLevel: number, skip: number = 0, excludeIds: string[] = []) {
    return await this.prisma.nodes.findMany({
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
    return await this.prisma.nodes.findMany({
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
      console.error(`[GUIDED_PATH_FAILURE] State Persistence Failure | User: ${userId} | Node: ${nodeId} | Error: ${e.message}`);
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
      console.error(`[GUIDED_PATH_FAILURE] Atomic Clear Failure | User: ${userId} | Node: ${nodeId} | Error: ${e.message}`);
    }
  }

  async logPathEvent(userId: string, action: string, nodeId?: string, metadata: any = {}) {
    try {
      // Fire-and-forget logging to ensure zero impact on seeker performance
      this.prisma.audit_logs.create({
        data: {
          performed_by_id: userId,
          record_id: nodeId,
          action,
          module: 'KNOWLEDGE',
          new_data: metadata
        }
      }).catch((e: any) => {
        console.error(`[GUIDED_PATH_FAILURE] Audit Log Creation Failure | User: ${userId} | Node: ${nodeId} | Action: ${action} | Error: ${e.message}`);
      });
    } catch (e: any) {
       console.error(`[GUIDED_PATH_FAILURE] Async Event Logging Failure | User: ${userId} | Action: ${action} | Error: ${e.message}`);
    }
  }

  /**
   * Searches for spiritual tags matching a keyword and includes associated nodes.
   */
  async findTagsByKeyword(query: string, eligibilityLevel: number) {
    return await this.prisma.tags.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        node_tags: {
          where: {
            nodes: {
              sensitivity: { lte: eligibilityLevel }
            }
          },
          include: {
            nodes: {
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
    return await this.prisma.texts.findMany({
      where: {
        content: { contains: query, mode: 'insensitive' },
      },
      include: {
        nodes: true,
      },
      take: 10,
    })
  }

  /**
   * Fetches all nodes associated with a specific tag (by ID or Slug).
   */
  async findNodesByTagReference(tagIdOrSlug: string, eligibilityLevel: number) {
    return await this.prisma.node_tags.findMany({
      where: {
        nodes: {
          sensitivity: { lte: eligibilityLevel }
        },
        OR: [
          { tag_id: tagIdOrSlug },
          { tags: { slug: tagIdOrSlug } },
        ],
      },
      include: {
        nodes: {
          include: {
            texts: { take: 1 }
          }
        }
      },
      take: 20
    })
  }
}
