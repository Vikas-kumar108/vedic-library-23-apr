import { FastifyInstance } from 'fastify';
import { FamilyGroupSchema } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for family_groups
 */
export default async function family_groupsRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.family_groups.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => FamilyGroupSchema.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.family_groups.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return FamilyGroupSchema.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.family_groups.create({
      data: body
    });
    return FamilyGroupSchema.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.family_groups.update({
      where: { id },
      data: body
    });
    return FamilyGroupSchema.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.family_groups.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
