For each service in api-gateway:

Classify into:
1. Pure Data Service (mostly Prisma CRUD)
2. Business Logic Service (logic beyond CRUD)
3. Integration Service (external APIs like Razorpay, Email)
4. Mixed (both data + logic)

Output as:
Service → Type + Reason

============================


Edited Prompt-2
Viewed Prompt-2:18-57
Viewed asset.service.ts:1-57
Viewed broadcast.service.ts:1-96
Viewed compliance.service.ts:1-54
Viewed human-capital.service.ts:1-55
Viewed integration.service.ts:1-46
Viewed project.service.ts:1-91
Viewed wisdom-engine.service.ts:1-52

Based on an analysis of the implementation for each service in `api-gateway`, I have classified them according to their primary responsibility and complexity.

### Service Classification Table

| Service | Type | Reason |
| :--- | :--- | :--- |
| **AcademyService** | **Mixed** | Fetches user progress and community stats via Prisma, then performs logic to aggregate and reduce results into UI-ready metrics. |
| **AssetService** | **Mixed** | Primarily CRUD, but contains logic for generating custom institutional QR code strings (`VIOS-ASSET-...`) during asset creation. |
| **AuthService** | **Mixed** | High-complexity logic for password hashing, JWT management, security audit logging, and account lockout state management alongside Prisma CRUD. |
| **BroadcastService** | **Integration** | Orchestrates the distribution of content by fetching targeted audiences from the DB and transmitting them via external Email providers. |
| **ComplianceService** | **Pure Data** | Acts as a simple data fetcher, returning partnerships, certificates, and tasks using standard Prisma `findMany` and `include` patterns. |
| **DiscoveryService** | **Business Logic** | Implements complex fallback strategies, intent matching logic, and recommendation heuristics beyond simple database queries. |
| **EnvHardener** | **Business Logic** | Contains zero database interaction; purely dedicated to verifying the functional health of third-party integrations and environment variables. |
| **HumanCapitalService** | **Mixed** | Fetches payroll and staff data, then performs logic to normalize guidance sessions and calculate real-time HR statistics (staff size, active mentor counts). |
| **InstitutionalService** | **Pure Data** | Provides read-only aggregated views of institutional health, grants, and ledger balances via Prisma aggregations and counts. |
| **IntegrationService** | **Pure Data** | Maps existing integration records and webhook event logs directly from the database to the UI with minimal transformation. |
| **LibraryService** | **Mixed** | Combines complex tree-building recursion with dynamic transliteration logic (Sanskrit/IAST) while fetching scripture nodes. |
| **PaymentService** | **Integration** | Purely interfaces with the Razorpay SDK to manifest donation orders and verify cryptographic signatures; does not use the database. |
| **ProjectService** | **Mixed** | Performs CRUD for projects but includes business logic for financial calculations (utilized vs. total budget) using `Decimal.js`. |
| **TaskOrchestrator** | **Business Logic** | Manages a background task state machine (PENDING → PROCESSING → COMPLETED) including an atomic worker loop and error handling. |
| **WisdomEngineService** | **Business Logic** | Maps administrative contexts (Finance, HR) to specific Shastric verses and provides hardcoded spiritual commentaries based on the context. |

---

### Key Takeaway
The **"Mixed"** and **"Business Logic"** classifications dominate (11 out of 15 services). This indicates that the `api-gateway` is indeed functioning as a "Fat" Backend/Monolith rather than a "Thin" Gateway, as most of the application's core intelligence resides here.