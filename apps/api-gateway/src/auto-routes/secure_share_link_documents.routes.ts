import { FastifyInstance } from 'fastify';
import { SecureShareLinkDocumentSchema } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for secure_share_link_documents
 */
export default async function secure_share_link_documentsRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.secure_share_link_documents.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => SecureShareLinkDocumentSchema.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.secure_share_link_documents.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return SecureShareLinkDocumentSchema.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.secure_share_link_documents.create({
      data: body
    });
    return SecureShareLinkDocumentSchema.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.secure_share_link_documents.update({
      where: { id },
      data: body
    });
    return SecureShareLinkDocumentSchema.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.secure_share_link_documents.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
