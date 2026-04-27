import { FastifyInstance } from 'fastify';
import { CircleMemberSchema } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for circle_members
 */
export default async function circle_membersRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.circle_members.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => CircleMemberSchema.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.circle_members.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return CircleMemberSchema.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.circle_members.create({
      data: body
    });
    return CircleMemberSchema.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.circle_members.update({
      where: { id },
      data: body
    });
    return CircleMemberSchema.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.circle_members.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
