Edited frontend_audit_report.md
Viewed frontend_audit_report.md:82-106
Viewed schema.prisma:110-160
Viewed schema.prisma:1050-1150
Viewed schema.prisma:1350-1450
Viewed schema.prisma:1900-1987
Searched for "@@schema("identity")"
Viewed schema.prisma:1-105
Edited auth.service.ts
Edited useAuth.ts

I have enhanced the `/auth/me` endpoint and aligned the frontend `useAuth` hook to ensure the system is fully **"Seeker-Aware"** in a single call.

### 🛠️ Technical Enhancements:

1.  **Unified Seeker Context (Backend)**: I refactored `AuthService.validateToken` to perform a single, high-efficiency `include` query. This retrieves the seeker's root identity, profile details, spiritual state, and learning statistics simultaneously.
2.  **Rich Payload Delivery**: The `/auth/me` (and thus the session initialization) now delivers:
    -   **Identity & Personal**: `email`, `roles`, `full_name`, and `avatar_url`.
    -   **Spiritual Profile**: The core shastric attributes—`life_stage`, `inner_state`, `eligibility_level`, `current_focus`, and the persistent `current_primary_node_id`.
    -   **Learning Metrics**: Real-time stats including `nodes_read_count` and `courses_completed`.
3.  **Frontend Type Alignment**: The `User` interface in the `useAuth` hook has been updated to perfectly match the backend response. This enables UI components to immediately access the seeker's spiritual stage and level without additional API calls.
4.  **Optimized Performance**: By using a single Prisma query with nested includes, I've eliminated the "N+1" fetch pattern and reduced the time-to-first-render for the seeker's personalized dashboard.
5.  **Migration-Resilient**: I’ve maintained the shadow-read consistency checks to ensure that data remains synchronized during the transition to the new `identity` schema.

With these changes, the frontend now has the complete shastric context required to power the **Guided Path** and personalized profile screens accurately.