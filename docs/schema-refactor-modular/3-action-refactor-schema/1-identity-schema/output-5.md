Edited prompt-4.md
Edited output-4.md
Edited prompt-5.md
Viewed prompt-5.md:13-60
Viewed schema.prisma:1-100
Viewed schema.prisma:1250-1400
Viewed schema.prisma:1066-1086

I have generated the **PHASE 1: Backfill** scripts for the identity migration. These scripts are designed to safely mirror data from the `public` schema to the `identity` schema while ensuring idempotency and data integrity.

### 📂 `database/migrations/identity/backfill/`

#### 001__backfill__users.sql
```sql
-- PHASE 1: Backfill
-- Entity: users
-- Responsibility: Copy base user credentials and status

INSERT INTO identity.users (
    id, 
    email, 
    password, 
    is_online, 
    email_verified, 
    roles, 
    status, 
    failed_login_attempts, 
    account_locked_until, 
    verification_token, 
    reset_token, 
    reset_token_expires, 
    deleted_at, 
    is_anonymized, 
    anonymized_at, 
    created_at, 
    updated_at, 
    last_active
)
SELECT 
    id, 
    email, 
    password, 
    is_online, 
    email_verified, 
    roles::text[]::identity.user_role_enum[], 
    status::text::identity.user_status_enum, 
    failed_login_attempts, 
    account_locked_until, 
    verification_token, 
    reset_token, 
    reset_token_expires, 
    deleted_at, 
    is_anonymized, 
    anonymized_at, 
    created_at, 
    updated_at, 
    last_active
FROM public.users
ON CONFLICT (id) DO NOTHING;

-- Observability Check
SELECT COUNT(*) as backfilled_users_count FROM identity.users;
```
*Copies core authentication and account metadata, performing cross-schema casting for the `roles` (array) and `status` enums.*

---

#### 002__backfill__user_profiles.sql
```sql
-- PHASE 1: Backfill
-- Entity: user_profiles
-- Responsibility: Copy PII and contact information

INSERT INTO identity.user_profiles (
    user_id, 
    full_name, 
    phone_number, 
    whatsapp_number, 
    avatar_url, 
    gender, 
    date_of_birth, 
    village, 
    city, 
    state, 
    pin_code, 
    created_at, 
    updated_at
)
SELECT 
    user_id, 
    full_name, 
    phone_number, 
    whatsapp_number, 
    avatar_url, 
    gender::text::identity.gender_enum, 
    date_of_birth, 
    village, 
    city, 
    state, 
    pin_code, 
    created_at, 
    updated_at
FROM public.user_profiles
ON CONFLICT (user_id) DO NOTHING;

-- Observability Check
SELECT COUNT(*) as backfilled_profiles_count FROM identity.user_profiles;
```
*Syncs personal profile data, including names and addresses, while preserving the user's primary identity key.*

---

#### 003__backfill__user_preferences.sql
```sql
-- PHASE 1: Backfill
-- Entity: user_preferences
-- Responsibility: Copy notification settings and metadata

INSERT INTO identity.user_preferences (
    user_id, 
    notification_prefs, 
    metadata, 
    notes, 
    created_at, 
    updated_at
)
SELECT 
    user_id, 
    notification_prefs, 
    metadata, 
    notes, 
    created_at, 
    updated_at
FROM public.user_preferences
ON CONFLICT (user_id) DO NOTHING;

-- Observability Check
SELECT COUNT(*) as backfilled_preferences_count FROM identity.user_preferences;
```
*Mirrors JSONB notification settings and system metadata to ensure UI consistency post-migration.*

---

#### 004__backfill__spiritual_profiles.sql
```sql
-- PHASE 1: Backfill
-- Entity: spiritual_profiles
-- Responsibility: Copy seeker-specific spiritual metadata

INSERT INTO identity.spiritual_profiles (
    user_id, 
    age_group, 
    life_stage, 
    eligibility_level, 
    primary_focus, 
    inner_state, 
    nature, 
    created_at, 
    updated_at
)
SELECT 
    user_id, 
    age_group::text::identity.age_group_enum, 
    life_stage::text::identity.life_stage_enum, 
    eligibility_level, 
    primary_focus::text::identity.purushartha_enum, 
    inner_state::text::identity.inner_state_enum, 
    nature::text::identity.svabhava_enum, 
    created_at, 
    updated_at
FROM public.spiritual_profiles
ON CONFLICT (user_id) DO NOTHING;

-- Observability Check
SELECT COUNT(*) as backfilled_spiritual_count FROM identity.spiritual_profiles;
```
*Transfers domain-specific spiritual data, filtering out legacy `subscription_tier_id` which has moved to the `institution` domain.*

---

#### 005__backfill__user_statistics.sql
```sql
-- PHASE 1: Backfill
-- Entity: user_statistics
-- Responsibility: Copy engagement metrics and points

INSERT INTO identity.user_statistics (
    user_id, 
    nodes_read_count, 
    courses_completed, 
    contribution_points, 
    updated_at
)
SELECT 
    user_id, 
    nodes_read_count, 
    courses_completed, 
    contribution_points, 
    updated_at
FROM public.user_statistics
ON CONFLICT (user_id) DO NOTHING;

-- Observability Check
SELECT COUNT(*) as backfilled_stats_count FROM identity.user_statistics;
```
*Preserves user progress metrics and gamification points to ensure no loss in seeker achievements.*

---

**Phase 1 scripts are ready for execution. Standing by for Phase 2: Sync instructions.**