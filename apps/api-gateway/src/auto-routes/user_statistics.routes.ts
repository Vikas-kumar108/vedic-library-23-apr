import { FastifyInstance } from 'fastify';
import { UserStatisticSchema } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for user_statistics
 */
export default async function user_statisticsRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.user_statistics.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => UserStatisticSchema.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.user_statistics.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return UserStatisticSchema.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.user_statistics.create({
      data: body
    });
    return UserStatisticSchema.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.user_statistics.update({
      where: { id },
      data: body
    });
    return UserStatisticSchema.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.user_statistics.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
