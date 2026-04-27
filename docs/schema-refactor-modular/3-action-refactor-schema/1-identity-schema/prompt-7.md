We are performing a production-grade identity migration.

Current State:
- PostgreSQL now has TWO schemas:
  1. public (legacy)
  2. identity (new domain)

- Both contain:
  users
  user_profiles
  user_preferences
  spiritual_profiles
  user_statistics

- Data is fully synced using PostgreSQL triggers:
  public → identity (real-time)

- UUIDs are identical across both schemas.

Prisma Configuration:
- public.users → prisma.users (unchanged for compatibility)
- identity.users → prisma.identity_users

IMPORTANT:
- Application is STILL using public schema
- identity schema is shadow/live replica

STRICT CONSTRAINTS:
- DO NOT rename existing Prisma models
- DO NOT suggest global refactors
- DO NOT modify database schema
- DO NOT introduce breaking changes

Objective:
1. Identify ALL locations where `prisma.users` is used
2. Identify all user-fetching patterns (AuthService, middleware, services)
3. Propose a SAFE toggle-based read strategy using environment variable:
   IDENTITY_SCHEMA_ENABLED=true/false

Focus ONLY on:
- AuthService
- User fetching logic
- Middleware (auth / RBAC)

Output Requirements:
- Step-by-step plan (minimal changes only)
- Exact code snippets for toggle-based reads
- Clearly mark which files to modify
- No large rewrites