import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodSchema } from 'zod'

/**
 * Validation Middleware (Factory)
 * Responsibility: Enforce strict data contracts for incoming requests.
 * Guard: Blocks if payload/params do not match the Zod schema.
 */
export const validateMiddleware = (schema: ZodSchema) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const validated = schema.parse({
        body: request.body,
        query: request.query,
        params: request.params
      })
      
      // Replace with validated data
      request.body = validated.body
      request.query = validated.query
      request.params = validated.params
    } catch (err: any) {
      return reply.code(400).send({ 
        error: 'Validation Failed', 
        details: err.errors 
      })
    }
  }
}
