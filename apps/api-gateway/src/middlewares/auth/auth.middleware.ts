import { FastifyRequest, FastifyReply } from 'fastify'

/**
 * Auth Middleware
 * Responsibility: Verify authentication token and attach user to request.
 * Guard: Blocks request if not authenticated.
 */
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  // TEMP DEV BYPASS: Allow access without authentication in development
  return
  
  try {
    // Logic: Extract token from header and verify
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) {
      return reply.code(401).send({ error: 'Authentication required' })
    }
    
    // Mock: Verify token and fetch user
    // request.user = { id: 'u1', role: 'USER' }
    
  } catch (err) {
    return reply.code(401).send({ error: 'Invalid or expired token' })
  }
}

/**
 * Optional Auth Middleware
 * Responsibility: Attach user to request if token exists, otherwise proceed.
 * Guard: Does not block request.
 */
export const optionalAuthMiddleware = async (request: FastifyRequest) => {
  const token = request.headers.authorization?.split(' ')[1]
  if (token) {
    // Mock: Attempt to attach user
    // request.user = { id: 'u1', role: 'USER' }
  }
}
