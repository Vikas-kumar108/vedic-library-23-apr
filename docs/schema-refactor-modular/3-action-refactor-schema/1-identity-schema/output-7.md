# Implementation Plan: Toggle-Based Identity Read Strategy

This plan outlines the steps to introduce a safe, toggle-based read strategy for user identity data, allowing the application to transition from the legacy `public` schema to the new `identity` schema using the `IDENTITY_SCHEMA_ENABLED` environment variable.

## User Review Required

> [!IMPORTANT]
> The migration strategy relies on PostgreSQL triggers keeping the two schemas in sync. We are only switching the **Read/Write target** in the application layer.

## Proposed Changes

### [Component] API Gateway (AuthService)

#### [MODIFY] [auth.service.ts](file:///Users/ppublications/Workspace/system/sastra/core/vedic-skills-institute/apps/api-gateway/src/services/auth.service.ts)

We will introduce a private getter `userStore` that dynamically returns either `this.prisma.users` or `this.prisma.identity_users`.

```typescript
// Proposed helper in AuthService
private get userStore() {
  const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
  return isIdentityEnabled 
    ? (this.prisma as any).identity_users as typeof this.prisma.users
    : this.prisma.users;
}
```

**Affected Methods:**
- `register`: Use `this.userStore` for checks and creation.
- `verifyEmail`: Use `this.userStore` for lookup and updates.
- `forgotPassword`: Use `this.userStore` for lookup and updates.
- `resetPassword`: Use `this.userStore` for lookup and updates.
- `login`: Use `this.userStore` for credential verification and lockout logic.
- `validateToken`: Use `this.userStore` for session hydration.

### [Component] Environment Configuration

#### [MODIFY] [.env](file:///Users/ppublications/Workspace/system/sastra/core/vedic-skills-institute/.env)

Add the toggle variable:
```env
IDENTITY_SCHEMA_ENABLED=false
```

---

## Step-by-Step Execution Plan

### Phase 1: Preparation
1.  Add `IDENTITY_SCHEMA_ENABLED=false` to `.env`.
2.  Add a type-safe getter to `AuthService` that abstracts the choice of schema.

### Phase 2: Refactoring
1.  Systematically replace all direct calls to `this.prisma.users` with `this.userStore` within `AuthService`.
2.  Ensure all `include` patterns (e.g., `user_profiles`) are maintained as they are identical in both schemas.

### Phase 3: Validation
1.  Run the application with `IDENTITY_SCHEMA_ENABLED=false` (Source of Truth: `public`).
2.  Verify login and registration.
3.  Flip to `IDENTITY_SCHEMA_ENABLED=true` (Source of Truth: `identity`).
4.  Verify that existing users (synced via triggers) can still log in and new users are created in the correct schema.

## Verification Plan

### Automated Tests
- Run existing Auth integration tests.

### Manual Verification
1.  Register a new user while `IDENTITY_SCHEMA_ENABLED=false`.
2.  Verify the record exists in `public.users`.
3.  Flip the toggle to `true`.
4.  Login with the same user.
5.  Verify the session works (fetching from `identity.users`).


Edited output-6.md
Edited 001__sync__users_insert.sql
Edited 002__sync__users_update.sql
Edited 003__sync__users_delete.sql
Edited 004__sync__user_profiles_insert.sql
Edited 005__sync__user_profiles_update.sql
Edited 006__sync__user_preferences_insert.sql
Edited 007__sync__user_preferences_update.sql
Edited 008__sync__spiritual_profiles_insert.sql
Edited 009__sync__spiritual_profiles_update.sql
Edited 010__sync__user_statistics_insert.sql
Edited 011__sync__user_statistics_update.sql
Viewed prompt-7.md:2-49
Edited prompt-7.md
Searched for "prisma.users"
Searched for "users\.find"
Searched for "users\.find"
Searched for "users\.find"
Searched for "prisma\.(user_profiles|user_preferences|spiritual_profiles|user_statistics)"
Searched for "user_profiles|user_preferences|spiritual_profiles|user_statistics"
Viewed auth.service.ts:1-286
Listed directory src
Searched for "prisma\.users"
Viewed index.ts:1-65
Viewed auth.ts:1-130
Listed directory middlewares
Listed directory auth
Viewed auth.middleware.ts:1-39
Listed directory authorization
Viewed role.middleware.ts:1-64
Edited identity_toggle_implementation_plan.md

I have analyzed the `AuthService` and the user-fetching patterns within the API Gateway. Since the `identity` schema is currently a live replica of `public` (maintained by triggers), we can safely introduce a toggle to switch the application's source of truth.

I have created a detailed [identity_toggle_implementation_plan.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/identity_toggle_implementation_plan.md) which outlines the strategy.

### 🔑 Key Findings:
1.  **Usage Hub**: 100% of user-fetching logic is centralized in `apps/api-gateway/src/services/auth.service.ts`.
2.  **Relational Consistency**: User-related tables (`user_profiles`, `user_preferences`) are fetched via Prisma `include` blocks, which are structurally identical in both schemas.
3.  **Middleware Status**: Current auth middlewares are bypassed or mocked, meaning `AuthService.validateToken` is the single gatekeeper that needs modification.

### 🚀 Proposed Toggle Snippet (for `AuthService`):

```typescript
private get userStore() {
  const isIdentityEnabled = process.env.IDENTITY_SCHEMA_ENABLED === 'true';
  return isIdentityEnabled 
    ? (this.prisma as any).identity_users as typeof this.prisma.users
    : this.prisma.users;
}
```

### 📋 Next Steps:
1.  **Modify `AuthService`**: Implement the `userStore` getter and replace all `this.prisma.users` calls.
2.  **Update `.env`**: Add `IDENTITY_SCHEMA_ENABLED=false` as the default.
3.  **Canary Test**: Flip the toggle to `true` to verify reading from the new `identity` domain.

**Please review the [implementation plan](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/identity_toggle_implementation_plan.md) and let me know if you approve these changes.**