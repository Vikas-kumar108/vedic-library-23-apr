# Frontend Audit Report: User & Identity Integration

This audit evaluates the alignment between the newly implemented **User & Identity Backend** and the current **Web Portal** frontend.

## 🏁 Summary of Findings

The frontend remains largely "Vedic-unaware," relying on static data or limited identity fields. While the authentication mechanism (JWT) is functioning, the rich seeker attributes (Life Stage, Inner State, Guided Focus) are not yet fully integrated into the UI.

---

## 📺 Screen Audit

### 1. Seeker Profile (`/profile`)
| Issue | Severity | Description |
| :--- | :--- | :--- |
| **Hardcoded Life Stage** | **CRITICAL** | Uses `user.roles.includes('student')` to guess "Brahmacari" instead of using `user.spiritual_profile.life_stage`. |
| **Static Seeker Level** | **CRITICAL** | Displays "Level 2" as a hardcoded string instead of `user.spiritual_profile.eligibility_level`. |
| **Missing Inner State** | **MODERATE** | The bio section is a hardcoded placeholder; should be populated by `inner_state` or a persistent bio field. |
| **Unused Realization Index** | **MINOR** | The "Growth Tree" percentage (64%) is static and disconnected from `user_statistics`. |

### 2. Seeker Dashboard (`/dashboard`)
| Issue | Severity | Description |
| :--- | :--- | :--- |
| **Missing Primary Guide** | **CRITICAL** | The dashboard does not highlight the `PRIMARY_GUIDE` node. It treats all recommendations as a generic list. |
| **Incorrect Field Naming** | **MODERATE** | Uses `user.stage` in props, which does not exist in the backend schema (should be `inner_state`). |
| **Static Learning Cards** | **MODERATE** | "Continue Learning" displays hardcoded Gita lessons instead of the seeker's actual `current_primary_node_id`. |

### 3. Discovery Vault (`/explore`)
| Issue | Severity | Description |
| :--- | :--- | :--- |
| **Static Content Pool** | **CRITICAL** | The entire page uses a local `ALL_CONTENT` array. It does NOT call the backend search or recommendation APIs. |
| **Client-side Filtering** | **MODERATE** | Filtering by "Level" (Beginner/Advanced) is purely client-side and doesn't respect the seeker's shastric eligibility. |

### 4. Library Catalog (`/library`)
| Issue | Severity | Description |
| :--- | :--- | :--- |
| **Hardcoded History** | **MODERATE** | "Pick up where you left off" shows static verses instead of fetching the seeker's actual `READ_NODE` history from `audit_logs`. |
| **Static Catalog** | **MINOR** | The list of shastras and their "Nodes count" is hardcoded and not synchronized with the database. |

---

## 🛠️ Technical Gaps

### 1. Identity Orchestration (`useAuth` hook)
- **Gap**: The `User` interface only includes `id`, `name`, `email`, and `roles`.
- **Missing**: `life_stage`, `inner_state`, `eligibility_level`, `current_focus`.
- **Impact**: Child components cannot make "Seeker-Aware" rendering decisions.

### 2. API Contract Mismatch (`DiscoveryService`)
- **Gap**: The frontend `Recommendation` interface is missing `category` and `reason`.
- **Impact**: The UI cannot distinguish between a "Primary Guide" and a "Supporting Recommendation," losing the "Guided Path" experience.

### 3. Session Restoration (`/api/auth/me`)
- **Gap**: The gateway's `validateToken` method only returns base user fields and profile name.
- **Missing**: No join with `spiritual_profiles` or `user_statistics`.
- **Impact**: The frontend is "blind" to the seeker's spiritual state until they manually refresh or specific data is requested.

---

## 🚀 Recommended Fixes

1. **Backend**: Update `AuthService.validateToken` to include the `spiritual_profiles` data in the session payload.
2. **Frontend**: Update `useAuth` types to reflect the full seeker profile.
3. **Frontend**: Refactor `WisdomRecommendation` to detect and highlight `PRIMARY_GUIDE` nodes with the provided `reason`.
4. **Frontend**: Connect `ExplorePage` and `LibraryPage` to the real backend APIs instead of using static mock data.


Viewed git_commit_plan.md:96-139
Edited git_commit_plan.md
Listed directory app
Listed directory auth
Listed directory portal
Listed directory explore
Listed directory library
Listed directory profile
Listed directory dashboard
Viewed page.tsx:1-43
Listed directory components
Viewed LoginForm.tsx:1-138
Viewed useAuth.ts:1-115
Listed directory me
Viewed route.ts:1-25
Viewed auth.service.ts:180-250
Searched for "async me(userId: string) {"
Searched for "me"
Viewed auth.service.ts:350-404
Viewed page.tsx:1-183
Viewed page.tsx:1-115
Viewed use-recommendations.ts:1-25
Viewed discovery-service.ts:1-20
Viewed page.tsx:1-310
Viewed page.tsx:1-190
Viewed SignupForm.tsx:1-191
Edited frontend_audit_report.md

I have completed a comprehensive **Frontend Audit** of the Web Portal to identify gaps in User & Identity integration.

### 🔍 Key Audit Findings:

1.  **Identity Data Blindness**: The `useAuth` hook and its `User` interface are currently missing the rich seeker attributes (e.g., `life_stage`, `inner_state`, `eligibility_level`). This is a **Critical** issue as it forces screens like the **Seeker Profile** to use hardcoded placeholders or inaccurate logic.
2.  **Disconnected Guided Path**: The **Dashboard** does not yet distinguish between a primary "Next Step" and generic suggestions. Because the `Recommendation` interface is missing the `category` and `reason` fields from the backend, the "Guided Path" experience is invisible to the user.
3.  **Static Vault Content**: The **Explore** page is currently running on a static mock array. It does not call the real backend Discovery API, meaning search results do not reflect the actual shastric corpus or the seeker's eligibility.
4.  **Broken Session Context**: The `/api/auth/me` endpoint in the gateway only returns base user data. It lacks the necessary join with `spiritual_profiles`, preventing the frontend from knowing the seeker's current focus and progress upon login.
5.  **Hardcoded Progress History**: The **Library History** section uses static verse entries rather than fetching the seeker's actual `READ_NODE` events from the audit logs.

The full report, including a screen-by-screen breakdown and a prioritized list of technical debt, is available in the [frontend_audit_report.md](file:///Users/ppublications/.gemini/antigravity/brain/a6ab3836-c1c4-4efe-a2aa-4802cc899460/frontend_audit_report.md) artifact. This provides a clear roadmap for aligning the frontend with your new backend capabilities.