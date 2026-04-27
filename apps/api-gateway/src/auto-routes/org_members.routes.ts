import { FastifyInstance } from 'fastify';
import { OrgMemberSchema } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for org_members
 */
export default async function org_membersRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.org_members.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => OrgMemberSchema.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.org_members.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return OrgMemberSchema.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.org_members.create({
      data: body
    });
    return OrgMemberSchema.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.org_members.update({
      where: { id },
      data: body
    });
    return OrgMemberSchema.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.org_members.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
