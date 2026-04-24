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
    return await request.server.prisma.subscriptionTier.findMany({
      where: { orgId },
      include: { _count: { select: { spiritualProfiles: true } } }
    })
  })

  /**
   * 2. Get Membership Stats
   */
  typedFastify.get('/stats/:orgId', {
    schema: { params: OrgParamsSchema }
  }, async (request) => {
    const { orgId } = request.params
    const totalMembers = await request.server.prisma.spiritualProfile.count({
      where: { subscriptionTier: { orgId } }
    })
    return { totalMembers }
  })
}
