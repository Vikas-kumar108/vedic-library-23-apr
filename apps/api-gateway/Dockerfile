# Multi-stage Dockerfile for @dharma/api-gateway
# Purpose: Environment parity and scalable deployment on Railway/Render.

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Stage 1: Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-gateway/package.json ./apps/api-gateway/
COPY packages/data-access/package.json ./packages/data-access/
COPY packages/search-domain/package.json ./packages/search-domain/
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM deps AS build
COPY . .
RUN pnpm db:generate
RUN pnpm --filter @dharma/api-gateway build

# Stage 3: Production
FROM node:20-slim AS runner
WORKDIR /app
COPY --from=build /app/apps/api-gateway/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api-gateway/package.json ./package.json

EXPOSE 4000
CMD ["node", "dist/index.js"]
