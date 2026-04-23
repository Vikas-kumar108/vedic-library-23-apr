# Multi-stage Dockerfile for @dharma/web-portal
# Purpose: Optimized Next.js deployment with standalone output.

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Stage 1: Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web-portal/package.json ./apps/web-portal/
COPY packages/data-access/package.json ./packages/data-access/
COPY packages/search-domain/package.json ./packages/search-domain/
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM deps AS build
COPY . .
RUN pnpm db:generate
RUN pnpm --filter @dharma/web-portal build

# Stage 3: Production
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV production

# Next.js standalone output
COPY --from=build /app/apps/web-portal/.next/standalone ./
COPY --from=build /app/apps/web-portal/.next/static ./apps/web-portal/.next/static
COPY --from=build /app/apps/web-portal/public ./apps/web-portal/public

EXPOSE 3000
ENV PORT 3000

CMD ["node", "apps/web-portal/server.js"]
