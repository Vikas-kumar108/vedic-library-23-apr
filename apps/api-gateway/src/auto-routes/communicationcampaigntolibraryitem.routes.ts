import { FastifyInstance } from 'fastify';
import { CommunicationCampaignToLibraryItemSchema } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for CommunicationCampaignToLibraryItem
 */
export default async function CommunicationCampaignToLibraryItemRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.CommunicationCampaignToLibraryItem.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => CommunicationCampaignToLibraryItemSchema.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.CommunicationCampaignToLibraryItem.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return CommunicationCampaignToLibraryItemSchema.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.CommunicationCampaignToLibraryItem.create({
      data: body
    });
    return CommunicationCampaignToLibraryItemSchema.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.CommunicationCampaignToLibraryItem.update({
      where: { id },
      data: body
    });
    return CommunicationCampaignToLibraryItemSchema.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.CommunicationCampaignToLibraryItem.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
