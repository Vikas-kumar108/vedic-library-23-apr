You are a senior backend architect specializing in PostgreSQL, Prisma ORM, and large-scale authentication systems.

I am working on a production system with the following architecture:

DATABASE:

* PostgreSQL with multi-schema setup:

  * public (legacy system)
  * identity (new domain-isolated schema)

Both schemas contain equivalent identity-related tables:

* users
* user_profiles
* user_preferences
* spiritual_profiles
* user_statistics

And corresponding enums (user_role_enum, user_status_enum, etc.)

IMPORTANT:

* Tables are NOT renamed in the database
* Same table names exist in both schemas

---

PRISMA STATE:

Prisma is configured as:
schemas = ["public", "identity"]

After introspection, Prisma generated:

* public_users → maps to public.users
* identity_users → maps to identity.users

This applies across ALL models and enums.

---

APPLICATION ARCHITECTURE:

* Next.js BFF handles cookies and frontend auth
* API Gateway (Fastify) handles auth logic
* Prisma is used inside AuthService
* JWT-based authentication
* RBAC enforced in both frontend and backend

Auth flows include:

* login, register, refresh, logout
* password reset, email verification

---

PROBLEM:

Application code expects:

* prisma.users
* prisma.user_profiles
* prisma.user_role_enum

But Prisma now exposes:

* prisma.public_users
* prisma.identity_users

This creates a system-wide mismatch.

---

TASK:

First, do NOT suggest solutions.

Instead:

1. Analyze the architecture deeply

2. Identify ALL layers that will break due to this mismatch:

   * ORM layer
   * Auth service
   * Middleware
   * RBAC
   * API routes
   * Frontend

3. Explain the impact clearly and systematically

Focus on understanding the system before proposing changes.
