import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../api-gateway/src/routers';

/**
 * 🛰️ Institutional tRPC Client
 * Responsibility: Provide type-safe procedure calls to the API Gateway.
 */
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: '/api/trpc', // Call our Next.js proxy
        }),
      ],
    };
  },
  ssr: false,
});
