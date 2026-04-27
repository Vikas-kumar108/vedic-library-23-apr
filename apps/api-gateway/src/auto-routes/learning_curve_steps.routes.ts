import { FastifyInstance } from 'fastify';
import { LearningCurveStepSchema } from '@dharma/contracts';
import { z } from 'zod';

/**
 * 🛰️ Auto-generated CRUD for learning_curve_steps
 */
export default async function learning_curve_stepsRoutes(fastify: FastifyInstance) {
  const prisma = (fastify as any).prisma;

  // 1. GET ALL
  fastify.get('/', async (request, reply) => {
    const data = await prisma.learning_curve_steps.findMany({
      take: 50,
      orderBy: { created_at: 'desc' }
    });
    return data.map((item: any) => LearningCurveStepSchema.parse(item));
  });

  // 2. GET BY ID
  fastify.get('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const item = await prisma.learning_curve_steps.findUnique({
      where: { id }
    });
    if (!item) return reply.status(404).send({ error: 'Not found' });
    return LearningCurveStepSchema.parse(item);
  });

  // 3. POST (Create)
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.learning_curve_steps.create({
      data: body
    });
    return LearningCurveStepSchema.parse(item);
  });

  // 4. PATCH (Update)
  fastify.patch('/:id', async (request: any, reply) => {
    const { id } = request.params;
    const body = request.body as any;
    const item = await prisma.learning_curve_steps.update({
      where: { id },
      data: body
    });
    return LearningCurveStepSchema.parse(item);
  });

  // 5. DELETE
  fastify.delete('/:id', async (request: any, reply) => {
    const { id } = request.params;
    await prisma.learning_curve_steps.delete({
      where: { id }
    });
    return reply.status(204).send();
  });
}
