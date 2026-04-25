We are extracting the Knowledge Domain from api-gateway.

Services involved:
- library.service.ts
- wisdom-engine.service.ts
- discovery.service.ts (if applicable)

Tasks:
1. Identify all dependencies (internal + external)
2. Identify Prisma usage
3. Identify shared utilities used
4. Detect risks if extracted

Output:
- Dependency graph
- Risk analysis
- Safe extraction order

===============================================


# System Architecture Analysis

Based on the exploration of the monorepo at `/Users/ppublications/Workspace/system/ui-lab/playground/ui-vedic-library-frontend-v2`, here is the architectural breakdown and problem assessment.

## 1. Folder Structure Overview

The project uses a standard `pnpm` monorepo structure:
- **`apps/api-gateway/`**: Node.js/TypeScript backend service handling API requests.
- **`apps/ingestion-service/`**: Background service containing data parsers and scripts.
- **`apps/web-portal/`**: Next.js frontend application.
- **`packages/`**: Shared libraries.
  - `data-access/`: Centralized Prisma client and database logic.
  - `text-engine/`: Shared text formatting and transliteration utilities.
  - `dharma-core/` & `search-domain/`: Shared domain primitives.

## 2. Domain Map & Responsibilities

### Core Domains Identified
1. **Wisdom & Library (Core)**: Scriptures, verses, text-engine, transliterations, library navigation.
2. **Identity & Access**: Authentication, user profiles, human capital.
3. **Financial & Dana**: Payments, donations (dana).
4. **Community & Education**: Academy, courses, lessons, practice, creator, events.
5. **Institutional Governance**: Compliance, broadcast, project management, task orchestrator.

### Service Responsibilities
- **`web-portal` (Frontend)**: Responsible for UI delivery across all domains. Contains feature modules for every domain under `apps/web-portal/features/` (e.g., `admin`, `library`, `payments`, `community`).
- **`api-gateway` (Backend)**: Processes all business logic directly. It contains 15 distinct domain services (e.g., `auth.service.ts`, `academy.service.ts`, `compliance.service.ts`, `wisdom-engine.service.ts`) and directly imports `@dharma/data-access`.
- **`ingestion-service` (Data Pipeline)**: Primarily designed to parse raw scriptures (e.g., `ShastraIngestor` for the Ramayana). However, it also appears to run batch operations for non-ingestion domains.
- **`packages/data-access` (Database Layer)**: The single source of truth for database interactions, encapsulating the Prisma Client for the entire system.

### Overloaded Modules
- **`api-gateway/src/services/`**: Extremely overloaded. It acts as a catch-all for all system capabilities instead of grouping them logically.
- **`packages/data-access`**: Overloaded by serving every domain. A change in any domain's schema forces a rebuild of this central package.

---

## 3. Architectural Issues (Ranked by Severity)

> [!CAUTION]
> **1. God Service Anti-Pattern (`api-gateway`) - SEVERITY: CRITICAL**
> Despite its name, the `api-gateway` is not actually a gateway. It is a monolithic application housing the business logic for over 15 distinct domains. A true API Gateway should merely route, authenticate, and rate-limit requests, delegating the actual business logic to downstream microservices (e.g., an Auth Service, a Library Service, a Payment Service).

> [!WARNING]
> **2. Shared Database / Tight Coupling - SEVERITY: HIGH**
> The `api-gateway` directly imports the `PrismaClient` from `@dharma/data-access`. This means all domains share the exact same database schema and connection. A change in the "Community" schema can inadvertently impact the "Financial" or "Wisdom" domains. There are no isolated databases or bounded contexts at the data layer.

> [!WARNING]
> **3. Mixed Responsibilities (`ingestion-service`) - SEVERITY: HIGH**
> The `ingestion-service` is conceptually designed for text parsing (`core/ingestor.ts`). However, the presence of `finance_error.log`, `compliance_error.log`, and `vault_error.log` in its root directory strongly indicates it is being used as a generic worker/cron environment for all domains. This mixes immutable data pipeline tasks with operational business background jobs.

> [!NOTE]
> **4. Monolithic Frontend Lack of Bounded Contexts - SEVERITY: MEDIUM**
> `web-portal/features/` contains 13 separate domain folders. While a monolithic frontend is typical for Next.js, this large surface area tightly couples disparate administrative (e.g., `admin`, `compliance`) and consumer (e.g., `library`, `practice`) interfaces into one deployment unit, which could lead to massive bundle sizes and deployment bottlenecks.
