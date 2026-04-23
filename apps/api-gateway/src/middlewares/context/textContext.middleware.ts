import { FastifyRequest } from 'fastify'

/**
 * Text Context Middleware
 * Responsibility: Extract and normalize scripture context from the request.
 * Purpose: Ensures all downstream services know which Book/Chapter/Verse is being discussed.
 */
export const textContextMiddleware = async (request: FastifyRequest) => {
  const params = request.params as any
  const query = request.query as any

  const context = {
    bookId: params.bookId || query.bookId,
    chapter: params.chapterId || query.chapterId,
    verse: params.verseId || query.verseId
  }

  // Attach context to request for use in controllers/services
  ;(request as any).textContext = context
}

/**
 * Node Context Middleware
 * Responsibility: Identify the current position in the hierarchical Vedic Tree.
 */
export const nodeContextMiddleware = async (request: FastifyRequest) => {
  const nodeId = (request.params as any).nodeId
  
  // Logic: Fetch node metadata from the Vedic Tree registry
  const nodeMetadata = {
    id: nodeId,
    type: 'CHAPTER',
    depth: 2
  }

  ;(request as any).nodeContext = nodeMetadata
}
