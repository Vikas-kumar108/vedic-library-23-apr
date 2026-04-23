# Platform Implementation Details

The Vedic Library Platform has been migrated from a file-based JSON corpus to a normalized, high-performance PostgreSQL 17 architecture. This migration ensures scalability, strict data integrity, and support for advanced linguistic features.

## Core Stack
- **Framework**: Next.js 15 (Web Portal), Fastify (API Gateway)
- **Database**: PostgreSQL 17 with `ltree`, `pgvector`, and `uuid-ossp` extensions.
- **ORM**: Prisma (via `@dharma/data-access`)
- **Language Logic**: Custom transliteration engine in `@dharma/text-engine`.

## System Architecture

### 1. Data Access Layer (`@dharma/data-access`)
- **Normalized Schema**: Uses `shastras`, `nodes`, and `texts` tables to handle the hierarchical nature of Vedic literature.
- **Hierarchical Navigation**: Implemented using the `ltree` extension for O(1) path-based queries (e.g., `itihasa.gita.ch1.v1`).
- **Version Control**: Manual PostgreSQL triggers track every change to the `texts` table.

### 2. Text Engine (`@dharma/text-engine`)
- **Bi-directional Transliteration**: High-fidelity conversion between IAST and Devanagari, handling Sanskrit-specific rules like halanta and inherent vowels.
- **Dynamic Reference System**: Standardizes verse references across different shastras.

### 3. Service Layer (API Gateway)
Centralized access to all dharma data.
- **Library Service**: Navigation, verse retrieval, and dynamic script generation.
- **Tag Service**: Hierarchical taxonomy for personalized study (Rasas, Life Stages).
- **User Service (NEW)**: Progress tracking, bookmarks, and mentorship assignments.

### 4. Educational & Community Layer (NEW)
Models the social and educational dimensions of Vedic study.
- **Mentorship**: Direct guru-shishya or teacher-student assignments.
- **Learning Curves**: Structured syllabi mapped to library nodes.
- **Content Access Rules**: Permission-based reading paths based on life stage or guidance level.

### 5. Search Domain (`@dharma/search-domain`)
- **Full-Text Search**: Optimized using the `simple` dictionary to prevent English-centric stemming.
- **Semantic Search (Planned)**: Integration with `pgvector` for embedding-based similarity search.

## Key Features Implemented
- [x] Hierarchical Tree Navigation
- [x] Multi-author Translation/Commentary support
- [x] Dynamic Script Generation (Fallback for missing scripts)
- [x] Professional Ingestion Pipeline
- [x] Hierarchical Tagging (Kama Sutra Corpus)
- [x] Guidance & Mentorship Models
