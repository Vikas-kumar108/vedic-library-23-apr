Create a high-level dependency map of api-gateway:

- Which services depend on which
- Which services use Prisma directly
- Which services call each other

Output as:
Service → Dependencies list

Listed directory services
Searched for "@dharma/data-access"
Searched for "import.*from '\.\/"
Viewed payment.service.ts:1-68
Viewed env-hardener.service.ts:1-58
Viewed index.ts:1-62
Viewed library.routes.ts:1-49
Searched for "from '.*service'"
Viewed task-orchestrator.service.ts:1-88
Viewed institutional.service.ts:1-109
Viewed academy.service.ts:1-117
Viewed discovery.service.ts:1-192

I have analyzed the `api-gateway` service layer and mapped the dependencies for each service.

### Summary Findings
*   **Prisma Usage:** 13 out of 15 services (87%) depend on `PrismaClient` directly for database operations. This confirms the "Shared Database" coupling identified in the architectural audit.
*   **Inter-Service Calls:** No services call each other directly. They are architected as isolated "silos" that are instantiated and coordinated by the route handlers.
*   **External Coupling:** Several services depend on shared packages within the monorepo (`@dharma/search-domain`, `@dharma/text-engine`).

---

### Dependency Map: `api-gateway`

| Service | Dependencies | Calls Other Services? |
| :--- | :--- | :--- |
| **AcademyService** | `PrismaClient` | No |
| **AssetService** | `PrismaClient` | No |
| **AuthService** | `PrismaClient`, `InstitutionalEmailService` (Adapter) | No |
| **BroadcastService** | `PrismaClient` | No |
| **ComplianceService** | `PrismaClient` | No |
| **DiscoveryService** | `PrismaClient`, `@dharma/search-domain` | No |
| **EnvHardener** | `IntegrationRegistry` (Internal) | No |
| **HumanCapitalService** | `PrismaClient` | No |
| **InstitutionalService** | `PrismaClient` | No |
| **IntegrationService** | `PrismaClient` | No |
| **LibraryService** | `PrismaClient`, `@dharma/text-engine` | No |
| **PaymentService** | `Razorpay` (External SDK) | No |
| **ProjectService** | `PrismaClient` | No |
| **TaskOrchestrator** | `PrismaClient` | No |
| **WisdomEngine** | `PrismaClient` | No |

---

### Key Architectural Observations
1.  **Strict Isolation:** The lack of inter-service calls suggests that any complex business logic spanning multiple domains is likely handled at the **Route level** or simply doesn't exist yet, leading to potential logic duplication.
2.  **Prisma as the "Glue":** Since every service takes a `PrismaClient` in its constructor, the database schema is the only thing binding these domains together.
3.  **Third-Party Heavy:** `PaymentService` and `AuthService` are the primary gateways to external systems (Razorpay, Email providers), while others are purely internal data-management services.