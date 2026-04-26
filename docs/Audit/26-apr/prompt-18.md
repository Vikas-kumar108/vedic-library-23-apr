Fix dependency injection for Prisma in api-gateway knowledge modules.

Context:
We recently refactored into modules:
- src/modules/knowledge/library
- src/modules/knowledge/discovery
- src/modules/knowledge/wisdom

Each module has:
- repository
- service
- index.ts

Problem:
Prisma is undefined inside repositories, causing errors like:
"Cannot read properties of undefined (reading 'findMany')"

Task:

1. Update each module index.ts to export a factory function:

Example pattern:

export const createLibraryModule = (prisma: PrismaClient) => {
  const repo = new LibraryRepository(prisma)
  const service = new LibraryService(repo)

  return { service }
}

Apply same pattern to:
- createDiscoveryModule
- createWisdomModule

2. Update routes to use the factory correctly:

Example:

const { service } = createLibraryModule(fastify.prisma)

Do NOT instantiate modules without prisma.

3. Ensure:
- PrismaClient is passed from Fastify instance
- No logic changes
- No API changes
- No renaming of methods
- No modification of services/repositories logic

4. Only modify:
- index.ts files in knowledge modules
- route files where services are instantiated

Goal:
Fix Prisma injection so repositories can use prisma safely.

Do NOT refactor anything else.
Do NOT change business logic.


===========


Edited prompt-17.md
Viewed route.ts:1-20
Viewed index.ts:1-10
Viewed index.ts:1-10
Viewed index.ts:1-10
Edited index.ts
Edited index.ts
Edited index.ts
Edited library.routes.ts
Edited discovery.routes.ts
Edited institutional.routes.ts

I have fixed the Prisma dependency injection issue across the `api-gateway` knowledge modules by standardizing the factory pattern.

### Changes Summary
1.  **Standardized Factories:** Renamed the entry points in `src/modules/knowledge/*/index.ts` to `createLibraryModule`, `createDiscoveryModule`, and `createWisdomModule`. These functions now explicitly accept a `PrismaClient` instance and inject it into the repository layer.
2.  **Updated Route Wiring:** Modified the route files to correctly utilize these factory functions:
    - **Library Routes:** Now uses `createLibraryModule(request.server.prisma).service`.
    - **Discovery Routes:** Now uses `createDiscoveryModule(fastify.prisma).service`.
    - **Institutional Routes:** Now uses `createWisdomModule(request.server.prisma).service`.

### Files Updated
- **Module Indexes:**
  - `src/modules/knowledge/library/index.ts`
  - `src/modules/knowledge/discovery/index.ts`
  - `src/modules/knowledge/wisdom/index.ts`
- **Route Definitions:**
  - `src/routes/library.routes.ts`
  - `src/routes/discovery.routes.ts`
  - `src/routes/institutional.routes.ts`

These changes ensure that the database client is consistently passed from the Fastify server down to the data access repositories, preventing "undefined" errors during runtime while maintaining the existing API contracts and business logic.