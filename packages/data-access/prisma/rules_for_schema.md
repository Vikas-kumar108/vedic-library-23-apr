SYSTEM RULES:

1. Prisma schema is modular:

   * Source: prisma/modules/*
   * Generated: prisma/schema.prisma

2. NEVER edit schema.prisma directly

3. identity.prisma + identity.enums.prisma are the CORE domain

4. All changes must:

   * start in modules
   * rebuild via build-schema.ts

5. No legacy_* models allowed

6. No identity_* enum prefixes allowed

Goal:
Maintain strict identity-first architecture
