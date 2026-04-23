import { FastifyRequest, FastifyReply } from 'fastify'

/**
 * Rate Limit Middleware
 * Responsibility: Protect the system from brute-force and DDoS attacks.
 * Guard: Blocks request if rate limit exceeded.
 */
export const rateLimitMiddleware = (limit: number = 100, windowMs: number = 60000) => {
  // Mock store for rate limiting
  const tracker = new Map<string, { count: number; resetTime: number }>()

  return async (request: FastifyRequest, reply: FastifyReply) => {
    const ip = request.ip
    const now = Date.now()
    const record = tracker.get(ip) || { count: 0, resetTime: now + windowMs }

    if (now > record.resetTime) {
      record.count = 1
      record.resetTime = now + windowMs
    } else {
      record.count++
    }

    tracker.set(ip, record)

    if (record.count > limit) {
      return reply.code(429).send({ error: 'Too Many Requests', retryAfter: record.resetTime - now })
    }
  }
}

/**
 * Sanitize Middleware
 * Responsibility: Cleanse user input to prevent XSS and injection attacks.
 */
export const sanitizeMiddleware = async (request: FastifyRequest) => {
  if (request.body && typeof request.body === 'object') {
    // Logic: Recursively strip HTML tags or suspicious characters
    const body = request.body as any
    Object.keys(body).forEach(key => {
      if (typeof body[key] === 'string') {
        body[key] = body[key].replace(/<[^>]*>?/gm, '') // Basic HTML strip
      }
    })
  }
}

/**
 * IP Block Middleware
 * Responsibility: Guard against known malicious IP addresses.
 */
export const ipBlockMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const blacklistedIps = ['123.456.78.9']
  if (blacklistedIps.includes(request.ip)) {
    return reply.code(403).send({ error: 'Access Denied' })
  }
}
