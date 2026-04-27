import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InstitutionalService } from '../services/institutional.service'
import { OrgParamsSchema } from '../schemas/institutional.schema'

export default async function membershipRoutes(fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>()

  /**
   * 1. Get Membership Tiers (Pricing)
   * Fetches the subscription tiers and benefits for an organization.
   */
  typedFastify.get('/tiers/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const { orgId } = request.params
    const tiers = await request.server.prisma.subscription_tiers.findMany({
      where: { org_id: orgId },
      include: { _count: { select: { spiritual_profiles: true } } }
    })
    return tiers.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      level: t.level,
      memberCount: t._count.spiritual_profiles
    }))
  })

  /**
   * 2. Get Membership Stats
   */
  typedFastify.get('/stats/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const { orgId } = request.params
    const totalMembers = await request.server.prisma.spiritual_profiles.count({
      where: { subscription_tiers: { org_id: orgId } }
    })
    return { totalMembers }
  })
}
