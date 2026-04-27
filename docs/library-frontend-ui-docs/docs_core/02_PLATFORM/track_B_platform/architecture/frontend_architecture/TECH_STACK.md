⚙️ TECHNOLOGY STACK
Vedic Library Project
Status: AUTHORITATIVE Applies From: Phase-1 onward Design Goal: Canonical longevity over tooling fashion

0. Foundational Principle (Unchanging)
Technology serves the text. The text never serves technology.
All tooling decisions are subordinate to:
* canonical integrity
* auditability
* long-term survivability (decades, not startups)
* low operational cost
* phase-wise evolution without rewrites

1. Architectural Philosophy
The Vedic Library follows six non-negotiable principles:
1. Data-first Canonical data exists independently of UI, backend, or AI.
2. Phase isolation Each phase may add capabilities but must never rewrite earlier phases.
3. Publish ≠ Ingest Data ingestion and public availability are separate concerns.
4. Framework independence Data must outlive frontend frameworks and hosting providers.
5. Offline-first pipelines Canonical processing must not depend on live services.
6. Human-auditable at every stage Raw → normalized → canonical → published must always be inspectable.

2. System Layers (Mental Model)
The project operates across three parallel systems:
Layer	Purpose	Visibility
Canonical Data System	Truth storage	Private
Publishing Surface	Reader experience	Public
Processing Pipelines	Ingestion, AI, normalization	Private
These layers must never be collapsed into one.

3. Frontend Stack
3.1 Next.js (Primary Frontend Framework)
Status: ACTIVE from Phase-1
Why
* Static + dynamic rendering
* SEO-friendly scripture pages
* File-based routing maps naturally to śāstra structure
* Works with GitHub Pages, Vercel, or self-hosting
Implementation Rules
* Frontend reads published registry only
* Frontend never scans raw directories
* Frontend never infers corpus completeness
Phase Usage
* Phase-1: Static canonical reading
* Phase-2: Multi-śāstra canonical reading
* Phase-3+: Editorial layers (no rewrite)

3.2 React (UI Paradigm)
Status: CORE (via Next.js)
Usage Pattern
* CanonicalUnit components
* Stateless rendering by default
* UI reacts to data availability, not assumptions
Explicit Avoidance
* No global state libraries
* No complex hook systems
* No speculative abstractions

3.3 Styling
Phase-1 / Phase-2
* Plain CSS or CSS modules
Phase-3+ (Optional)
* Tailwind CSS for typography discipline
Styling must never encode:
* interpretation
* pedagogy
* hierarchy of meaning

4. Publishing & Visibility Model (CRITICAL)
4.1 Published Registry (MANDATORY)
Introduce a visibility boundary:

data/
└── _published/
    ├── registry.json
    └── manifests/
Purpose
* Define what is safe for public consumption
* Decouple ingestion from visibility
* Allow massive private work without breaking UI
registry.json example

{
  "published_texts": ["bg"],
  "last_updated": "2026-02-01",
  "phase": "phase-2"
}
Frontend Rule
Frontend MUST render only what appears in _published/registry.json.
No registry entry → invisible to users.

4.2 Promotion Rule
Canonical data becomes visible only when:
1. Canonical schema validation passes
2. UID registry updated
3. Entry added to _published/registry.json
No exception.

5. Backend Stack (Deferred by Design)
5.1 Python (Core Logic Language)
Status: ACTIVE from Phase-0
Primary Uses
* Raw scraping
* Text normalization
* UID generation
* Canonical structuring
* AI batch pipelines
* Validation scripts
Execution Model
* CLI tools
* Batch scripts
* No long-running services in Phase-2

5.2 FastAPI (Deferred)
Status: NOT REQUIRED in Phase-2
Introduced When
* Dynamic APIs are required
* Authenticated requests exist
* AI services need gating
Phase Target
* Phase-3 minimum
* Phase-4 likely
No FastAPI scaffolding should exist prematurely.

6. Data Layer
6.1 JSON (Primary Storage)
Status: AUTHORITATIVE
Why
* Human-readable
* Git-versioned
* Framework-agnostic
* Easy to validate
Rules
* Canonical JSON is immutable
* Extended JSON is additive
* AI JSON is sandboxed

6.2 Data Zones (MANDATORY SEPARATION)

data/
├── _raw/          # untouched sources
├── _staging/      # normalized, experimental
├── _canonical/    # validated canonical truth
├── _ai/           # AI-generated, unreviewed
├── _published/    # visibility registry
No file may skip a zone.

7. AI & Language Processing
7.1 Gemini APIs
Status: ALLOWED from Phase-2 (sandboxed)
Permitted Outputs
* Translation drafts
* Synonyms drafts
* Expository drafts
Forbidden
* Overwriting canonical text
* Direct publication without review

7.2 AI Output Lifecycle (MANDATORY)

_raw → _ai → (review) → derivatives → published
AI files MUST include:

{
  "generated_by": "gemini-2.5",
  "review_status": "unreviewed"
}
AI is assistant, not authority.

8. Authentication & Users (Deferred)
8.1 Auth.js
Phase Target: Phase-3 Reason: Requires backend + persistence
No auth code should exist in Phase-2.

8.2 Databases
PostgreSQL
* Phase-4+
* User data, bookmarks, analytics
Phase-2 Rule
JSON only. No DB assumptions.

9. Hosting & Deployment
9.1 GitHub (Mandatory)
* Version control
* Documentation
* Canonical archive

9.2 Frontend Hosting
Allowed
* GitHub Pages (static)
* Vercel (Next.js native)
* Self-hosted VPS (later)
Hosting choice must not affect data layout.

10. Explicitly NOT Used (Phase-2)
The following are intentionally excluded:
* Docker
* Kubernetes
* CI/CD pipelines
* GraphQL
* Paid cloud services
* Realtime APIs
* Background workers
These add cost and fragility prematurely.

11. Phase-Wise Capability Map
Phase	Capabilities
Phase-1	Single corpus reading
Phase-2	Multi-śāstra canonical hosting
Phase-2.5	AI sandbox, unpublished
Phase-3	Editorial layers
Phase-4	Search & education
Phase-5+	Community, courses
12. Final Operational Rule
If a feature requires explanation to justify its existence, it does not belong in Phase-2.

13. Closing Principle
Technology will change. Texts will remain.
This stack exists to ensure that when frameworks disappear, the Vedas do not.

