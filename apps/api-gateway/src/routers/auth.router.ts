import { router, publicProcedure } from '../trpc';
import { RegisterInput, LoginInput, UserSchema } from '@dharma/contracts';
import { AuthService } from '../services/auth.service';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  register: publicProcedure
    .input(RegisterInput)
    .mutation(async ({ ctx, input }) => {
      const authService = new AuthService(ctx.prisma);
      try {
        const result = await authService.register(input);
        return {
          ...result,
          user: UserSchema.parse(result)
        };
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }
    }),

  login: publicProcedure
    .input(LoginInput)
    .mutation(async ({ ctx, input }) => {
      const authService = new AuthService(ctx.prisma);
      try {
        const result = await authService.login(input);
        return {
          accessToken: result.accessToken,
          user: UserSchema.parse(result.user)
        };
      } catch (error: any) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error.message,
        });
      }
    }),
});
