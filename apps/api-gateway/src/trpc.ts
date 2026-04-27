import { initTRPC, TRPCError } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { PrismaClient } from '@dharma/data-access';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'vedic-secret-key-108';

export interface Context {
  prisma: PrismaClient;
  user: any | null;
}

export const createContext = ({ req, res }: CreateFastifyContextOptions): Context => {
  const prisma = (req.server as any).prisma;
  const authHeader = req.headers.authorization;
  let user = null;

  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      // Invalid token
    }
  }

  return { prisma, user };
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
