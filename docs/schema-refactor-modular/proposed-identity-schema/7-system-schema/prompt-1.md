You are acting as a senior system architect working within this codebase.

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
Current focus: System / Infrastructure Domain (system)
Scope of System / Infrastructure Domain

This domain includes:

Audit logs and activity tracking
Permissions and access control (system-level, not identity roles)
Feature flags and toggles
Configuration and settings (system-wide or environment-specific)
Background jobs / queues / schedulers
Webhooks (incoming/outgoing events)
External integrations (third-party services, APIs)
Task

Design a production-grade PostgreSQL system schema.

Requirements
1. Schema Design
Define all tables with:
Clear responsibilities
Proper normalization
Logical grouping (audit, config, jobs, webhooks, integrations)
Ensure:
Support for high-volume logging
Flexibility for feature toggling
Extensibility for integrations and event-driven systems
2. Enum Strategy
Define all required enums, such as:
Audit action types
Feature flag status
Job status
Webhook event types
Integration types
Specify:
Enum values
Where and how they are used
3. Relationships
Define:
Audit logs ↔ users (via identity domain)
Jobs ↔ processing status
Webhooks ↔ events ↔ delivery logs
Integrations ↔ configuration
Include foreign keys and constraints
4. Mapping from Existing Schema
Based on current public schema:
Identify relevant tables
Suggest:
Move / Split / Merge / Remove
5. Boundaries
Clearly define:
What belongs in system
What should NOT be included (e.g., business domain logic, user profiles, content)
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

Produce a clean, scalable, and migration-safe system schema that supports:

Core infrastructure and observability
Configuration and feature control
Background processing and integrations