# Architectural Strategy: Extended Domains

This document provides architectural guidance and conceptual roadmap planning for transitioning the specialized **Extended Domains** into modular PostgreSQL schemas.

---

## Domain 7: Media & Digital Asset Management (DAM)

### 1. High-Level Roadmap
- Extract all file references into a unified `media` schema.
- This domain acts as the "Storage Proxy" for the entire system.

### 2. Schema Design Thinking
- **`file_assets`**: The core registry of every binary in the system (PDFs, Images, Audio).
- **Polymorphic Metadata**: Separate tables for `image_metadata` (dimensions) and `video_metadata` (duration) to keep the core table lean.

### 3. Boundaries & Separation
- **Include**: `file_assets`, metadata tables, `storage_providers`.
- **Exclude**: The *business records* that use the assets (e.g., `donation_receipts`). Those live in the Institution schema and hold a `file_asset_id`.

### 4. Dependencies
- **Inbound**: Every domain (Institution, Knowledge, Identity, Education) points to `media.file_assets.id`.
- **Outbound**: None. This is a foundational utility.

---

## Domain 8: Family & Genealogy Graph

### 1. High-Level Roadmap
- Refactor the lineage data into a `genealogy` or `family` schema.
- Specifically handle the `ltree` indexing for bloodlines.

### 2. Schema Design Thinking
- **`family_nodes`**: The entities (Living or Ancestral). Uses `ltree` for efficient lineage traversal.
- **`family_links`**: Defines the nature of relationships (Paternal, Maternal, Discipleship).

### 3. Boundaries & Separation
- **Include**: `family_nodes`, `family_links`, `gotras`, `vashams`.
- **Exclude**: `users`. A family node might *point* to a system user, but many ancestors will be "offline" entities.

### 4. Dependencies
- **Inbound**: Identity (to show a user's tree).
- **Outbound**: Identity (points to `identity.users.id`).

---

## Domain 9: Events & Calendar System

### 1. High-Level Roadmap
- Centralize all scheduling into an `events` schema.
- Transition from "Static Content" to "Time-Bound Interactions."

### 2. Schema Design Thinking
- **`events`**: The core schedule record.
- **`event_registrations`**: Bridges Users to Events.
- **`venues`**: Physical or Virtual locations.

### 3. Boundaries & Separation
- **Include**: `events`, `registrations`, `venues`, `calendars`.
- **Exclude**: `marketing_campaigns`. Campaigns might promote events, but the event lifecycle is distinct.

### 4. Dependencies
- **Inbound**: Communications (for reminders).
- **Outbound**: Identity (for registrants), Institution (if events are paid).

---

## Domain 10: Search, AI Discovery & Analytics

### 1. High-Level Roadmap
- Move all "Derived Data" (Embeddings, Logs) into a `discovery` or `analytics` schema.
- Ensure the `pgvector` extension is accessible.

### 2. Schema Design Thinking
- **`text_embeddings`**: Vector representations of scriptural texts.
- **`analytics_events`**: High-volume clickstream/usage data.

### 3. Boundaries & Separation
- **Include**: `text_embeddings`, `search_logs`, `recommendations`.
- **Exclude**: The source `texts`. This schema only stores the *mathematical projection* of the text.

### 4. Dependencies
- **Inbound**: None.
- **Outbound**: Knowledge (points to `texts.id`), Identity (points to `users.id` for personalization).

---

## Risks & Design Pitfalls (Extended Domains)

1.  **The "Gravity Well" of Media:** Every schema depends on `media`. If the Media schema is down or its primary keys change, the entire UI (avatars, receipts, shastra images) breaks instantly.
2.  **Lineage Complexity:** Genealogy using `ltree` is powerful but fragile. If the `path` string becomes corrupted, the entire tree structure is lost. Validation must be strict.
3.  **Vector Performance:** Storing `pgvector` data (`Unsupported("vector")` in Prisma) alongside core relational data can impact backup sizes. Moving it to its own schema allows for different maintenance schedules.
4.  **Analytics Bloat:** `analytics_events` will grow faster than any other table. It should ideally be partitioned by time (e.g., monthly tables) from the very beginning.

> [!IMPORTANT]  
> **User Review Required:** Do you approve of these specialized domain boundaries, specifically the isolation of the Genealogy Graph and the separation of AI Search from the Knowledge Layer? If approved, we have completed the full 10-domain architectural blueprint. Shall we proceed to the **Final Consolidation & Refactoring Checklist**?
