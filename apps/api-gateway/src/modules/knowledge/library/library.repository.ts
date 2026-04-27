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

  async recordNodeView(userId: string, nodeId: string) {
    const oneMinuteAgo = new Date(Date.now() - 60000);
    
    try {
      // 1. Debounce Check (Avoid duplicates within 1 minute - Optimization)
      const existing = await this.prisma.audit_logs.findFirst({
        where: {
          performed_by_id: userId,
          action: 'READ_NODE',
          record_id: nodeId,
          timestamp: { gte: oneMinuteAgo }
        }
      });

      if (existing) return;

      // 2. Create Log (DB Unique constraint is the final guard)
      await this.prisma.audit_logs.create({
        data: {
          action: 'READ_NODE',
          record_id: nodeId,
          performed_by_id: userId,
          module: 'KNOWLEDGE'
        }
      });

      // 3. Completion Trigger: Clear primary guide if it was just read (Atomic)
      const profileStore = process.env.IDENTITY_SCHEMA_ENABLED === 'true' 
        ? (this.prisma as any).identity_spiritual_profiles 
        : (this.prisma as any).spiritual_profiles;

      if (profileStore) {
        // Fetch metadata before atomic clear for observability
        const profile = await profileStore.findUnique({
          where: { user_id: userId },
          select: { 
            current_primary_node_id: true,
            current_focus: true,
            eligibility_level: true
          }
        });

        if (profile?.current_primary_node_id === nodeId) {
          const result = await profileStore.updateMany({
            where: { 
              user_id: userId,
              current_primary_node_id: nodeId
            },
            data: { current_primary_node_id: null }
          });

          if (result.count > 0) {
            // 🛰️ Observability: Log completion milestones
            (this.prisma as any).audit_logs.create({
              data: {
                performed_by_id: userId,
                record_id: nodeId,
                action: 'PRIMARY_COMPLETED',
                module: 'KNOWLEDGE',
                new_data: { 
                  focus: profile.current_focus, 
                  eligibility_level: profile.eligibility_level 
                }
              }
            }).catch(() => {});
          }
        }
      }
    } catch (e) {
      // Ignore unique constraint violations or other logging errors
      // P2002 is the Prisma code for unique constraint violation
    }
  }
}