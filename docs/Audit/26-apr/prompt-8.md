Analyze current refactored modules:

- Library (service + repository)
- Discovery (service + repository)
- WisdomEngine (service + repository)

Tasks:
1. Identify common patterns across repositories
2. Identify shared utilities across services
3. Propose a clean folder structure for a new module:

apps/knowledge-engine/

Include:
- internal folder structure
- how services are grouped
- how repositories are grouped

DO NOT move files yet.
ONLY propose structure and migration plan.

====================================================


Created knowledge_engine_proposal.md

I have analyzed the refactored modules and formulated an architectural proposal for the new `apps/knowledge-engine` module.

You can review the complete structural design and migration strategy in the [knowledge_engine_proposal.md](file:///Users/ppublications/.gemini/antigravity/brain/166493e0-3a72-42d0-87c8-fa4b04bea183/artifacts/knowledge_engine_proposal.md) artifact.

**Key Highlights of the Proposal:**
1.  **Repository Patterns:** All repositories utilize constructor-injected Prisma clients, handle complex relational aggregations internally, and strictly return raw data payloads.
2.  **Service Utilities:** The services heavily orchestrate shared logic from `@dharma/text-engine` (for transliteration/formatting) and `@dharma/search-domain` (for semantic matching), acting as Presenters that transform raw DB nodes into UI-friendly structures.
3.  **Domain-Driven Folders:** Instead of the flat structure seen in `api-gateway`, the new engine is proposed to use **Vertical Slicing** (e.g., `src/modules/library/`, `src/modules/discovery/`). Each folder will encapsulate its own controller, service, repository, and routes, preventing "God folder" anti-patterns.

Let me know what you think of this structure and if you'd like to proceed with the migration!



# Knowledge Engine Architecture Proposal

Based on the recent refactoring of the `Library`, `Discovery`, and `WisdomEngine` modules, we have identified several core architectural patterns. This document proposes a clean, domain-driven structure for extracting these modules into a dedicated `apps/knowledge-engine/` microservice.

## 1. Common Patterns Across Repositories

The refactored repositories (`library.repository.ts`, `discovery.repository.ts`, `wisdom.repository.ts`) exhibit the following strict patterns:

-   **Constructor Injection:** Every repository requires a `PrismaClient` instance passed through the constructor. This allows for flexibility (e.g., passing a transaction client if needed).
-   **Pure Data Return Types:** Methods return raw, nested Prisma objects (e.g., `nodes` with deeply included `texts`, `tags`, and `shastras`). They do not attempt to map or format the data.
-   **Query Encapsulation:** Complex database logic—such as `include` relations, `orderBy` rules, and fallback schemas (`(this.prisma as any).node_tags`)—is entirely hidden from the higher layers.

## 2. Shared Utilities Across Services

The services act as orchestrators and presenters, heavily relying on shared logic from the monorepo's `packages/`:

-   **`@dharma/text-engine`:**
    *   `transliterate`: Used dynamically to convert Devanagari to IAST (and vice versa) on the fly.
    *   `formatReference`: Used to generate standard Vedic citation strings.
-   **`@dharma/search-domain`:**
    *   `searchByIntent`: Used by the `DiscoveryService` to execute AI-driven semantic searches before falling back to keyword searches.
-   **Data Transformation:** All services take the raw database output from their respective repositories and transform it into standardized UI-friendly DTOs (e.g., grouping translations by author, formatting the library tree).

---

## 3. Proposed Folder Structure: `apps/knowledge-engine/`

The current `api-gateway` uses a flat structure (`src/services/`, `src/repositories/`), which leads to overloaded directories. For the new `knowledge-engine`, we propose a **Domain-Driven Module Structure**.

```text
apps/knowledge-engine/
├── package.json
├── tsconfig.json
└── src/
    ├── config/               # App configuration (env validation, fastify setup)
    ├── core/                 # Shared interfaces, types, and error handlers
    ├── plugins/              # Fastify plugins (e.g., Prisma setup)
    ├── modules/              # ⬅️ Feature-based Domain Modules
    │   │
    │   ├── library/          # Domain: Scripture Navigation & Reading
    │   │   ├── library.controller.ts  # Handles HTTP requests/responses
    │   │   ├── library.service.ts     # Business logic & DTO mapping
    │   │   ├── library.repository.ts  # Pure data access
    │   │   ├── library.routes.ts      # Route definitions
    │   │   └── library.schema.ts      # Zod validation schemas
    │   │
    │   ├── discovery/        # Domain: Search, Intent, & Recommendations
    │   │   ├── discovery.controller.ts
    │   │   ├── discovery.service.ts
    │   │   ├── discovery.repository.ts
    │   │   └── discovery.routes.ts
    │   │
    │   └── wisdom-engine/    # Domain: Contextual Spiritual Interpretation
    │       ├── wisdom.controller.ts
    │       ├── wisdom.service.ts
    │       ├── wisdom.repository.ts
    │       └── wisdom.routes.ts
    │
    └── server.ts             # Application entry point
```

### Grouping Strategy

-   **Vertical Slicing:** Instead of grouping by technical concern (all services together, all repos together), files are grouped by **Domain** (`library`, `discovery`, `wisdom-engine`).
-   **Controllers Introduced:** Route files (`*.routes.ts`) in the current gateway hold request parsing logic. In the new structure, a `Controller` layer will handle request/reply extraction, leaving `Routes` to strictly define paths and schemas.
-   **Service to Repository 1:1 Mapping:** Each domain service interacts strictly with its own domain repository. If `DiscoveryService` needs Library data, it should theoretically call `LibraryService`, not `LibraryRepository`, maintaining domain boundaries.

---

## 4. Proposed Migration Plan

1.  **Initialize Microservice:**
    *   Create the `apps/knowledge-engine` workspace.
    *   Set up Fastify, TypeScript, and local `.env` configurations.
2.  **Establish Core & Dependencies:**
    *   Import `@dharma/data-access`, `@dharma/text-engine`, and `@dharma/search-domain`.
    *   Configure the Prisma plugin.
3.  **Migrate Modules (One by One):**
    *   Move the newly refactored `library.repository.ts` and `library.service.ts`.
    *   Extract the route logic from the gateway into `library.controller.ts` and `library.routes.ts`.
    *   Repeat for `discovery` and `wisdom-engine`.
4.  **Update API Gateway (Strangler Fig Pattern):**
    *   Remove the logic from `apps/api-gateway`.
    *   Configure `api-gateway` to proxy incoming `/library`, `/discovery`, and `/wisdom` requests to the new `knowledge-engine` microservice URL.
5.  **Verify & Test:**
    *   Ensure the UI remains unaffected by verifying the API contracts match exactly.
