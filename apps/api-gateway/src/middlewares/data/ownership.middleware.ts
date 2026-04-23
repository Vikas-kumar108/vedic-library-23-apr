import { FastifyRequest, FastifyReply } from 'fastify'

/**
 * Ownership Middleware
 * Responsibility: Verify that the user owns the resource they are trying to mutate.
 * Guard: Blocks if user ID mismatch.
 */
export const ownershipMiddleware = (resourceIdField: string = 'id') => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as any).user
    const resourceId = (request.params as any)[resourceIdField]

    if (!user) return reply.code(401).send({ error: 'Auth required' })

    // Logic: In a real app, you'd check the DB for resource ownership
    // For now, we simulate by assuming some resources have userId in their lookup
    const resourceOwnerId = 'u1' // Mocked DB lookup result

    if (user.id !== resourceOwnerId && user.role !== 'ADMIN') {
      return reply.code(403).send({ 
        error: 'Forbidden', 
        message: 'You do not have permission to modify this resource.' 
      })
    }
  }
}
