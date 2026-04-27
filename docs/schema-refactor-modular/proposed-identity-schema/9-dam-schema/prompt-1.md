ou are acting as a senior system architect working within this codebase.

Context
This is a monorepo application using:
React / Next.js (frontend)
Node.js (backend APIs)
PostgreSQL (database)
Current state:
Entire database exists in a single public schema (~4,000 lines)
APIs, business logic, and frontend are already implemented
Data is minimal, but existing logic must remain stable
Refactoring goal:
Move from public → domain-driven schemas
Current focus: Media & Digital Asset Management Domain (dam)
Scope of DAM Domain

This domain includes:

Media assets (images, videos, audio, documents, etc.)
File storage metadata (paths, URLs, storage providers)
Asset versions and transformations (resizing, compression, formats)
Metadata and tagging (titles, descriptions, categories, tags)
Access control (visibility, ownership, usage permissions)
Asset usage tracking (where assets are used across the system)
Upload processing pipelines (if tracked)
Task

Design a production-grade PostgreSQL dam schema.

Requirements
1. Schema Design
Define all tables with:
Clear responsibilities
Proper normalization
Logical grouping (assets, metadata, versions, usage, permissions)
Ensure:
Support for large-scale media libraries
Flexibility for multiple storage backends (S3, local, CDN, etc.)
Extensibility for future features (AI tagging, media processing)
2. Enum Strategy
Define all required enums, such as:
Asset type (image, video, audio, document)
Processing status
Visibility status
Storage provider type
Specify:
Enum values
Where and how they are used
3. Relationships
Define:
Assets ↔ versions
Assets ↔ metadata / tags
Assets ↔ usage references (other domains like knowledge, education, etc.)
Assets ↔ users (via identity domain)
Include foreign keys and constraints
4. Mapping from Existing Schema
Based on current public schema:
Identify relevant tables
Suggest:
Move / Split / Merge / Remove
5. Boundaries
Clearly define:
What belongs in dam
What should NOT be included (e.g., actual content logic, user auth, learning structure)
6. Migration Awareness (Design-Level Only)
Ensure the design supports:
Smooth migration from public
Minimal disruption to existing APIs and frontend
Constraints
Do NOT modify application code
Do NOT generate migration scripts
Do NOT refactor APIs

Focus only on:

Schema design
Structure
Clarity
Output Format

Provide:

Schema Overview
Table-by-Table Definitions
Enum Definitions
Relationship Mapping
Mapping from Current Schema
Key Design Decisions
Goal

Produce a clean, scalable, and migration-safe dam schema that supports:

Media storage and management
Asset reuse across domains
Future extensibility (AI processing, tagging, transformations)