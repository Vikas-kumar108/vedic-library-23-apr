# 🧭 Vedic Library Navigation & UX Blueprint

This guide defines the user's journey through the platform, from first landing to deep personalization. It serves as the reference for routing, component behavior, and access control.

## 🚀 1. The Core Philosophy
> **"Don't lock knowledge. Lock personalization."**

The platform is an open library first. We invite users to experience the wisdom before asking for their identity.

---

## 🗺️ 2. User Journey (The Five Phases)
1. **Visit**: Landing on the Homepage (`/`).
2. **Explore**: Browsing the discovery hub (`/explore`).
3. **Experience**: Reading a Shastra or watching a lesson (`/library/[id]`).
4. **Trigger**: Attempting to save progress, take a note, or bookmark.
5. **Onboard**: Signup/Login followed by personalized setup (`/onboarding`).
6. **Integrate**: Personalized journey via the Dashboard (`/dashboard`).

---

## 🏗️ 3. Layered Content Hierarchy
| Level | Page | Purpose | Access |
| :--- | :--- | :--- | :--- |
| **Level 1** | Homepage | Entry point & Value Proposition | Public |
| **Level 2** | Explore | Topic discovery & Category browsing | Public |
| **Level 3** | Course/Topic | Curated collections of Shastras | Public |
| **Level 4** | Lesson/Article | Atomic units of wisdom | Public (Partial/Limited) |

---

## 🔐 4. Access Control Rules

### 🟢 Public (Unauthenticated)
- **Browse Library**: Yes
- **Read Basic Content**: Yes (Limited preview for sensitive texts)
- **Watch Lessons**: Yes (Introductory lessons)
- **Search**: Yes

### 🟡 Private (Authenticated - Free)
- **Full Library Access**: Yes (Subject to Adhikāra level)
- **Personalization**: Save Notes, Highlights, Bookmarks.
- **Progress Tracking**: "Mark as Complete", "Continue Journey".
- **Dashboard**: Personalized recommendations.

---

## 🎨 5. UI Components & Behavior

### 🚪 Conversion Triggers (Soft Prompts)
Instead of blocking a page, we show "Conversion Point" components:
- **"Save Progress to continue your journey."**
- **"Login to add your personal notes to this Shastra."**

### 🧭 Breadcrumbs & Navigation
- Always show clear paths: `Library > Ethics > Relationship Harmony > Verse 1.1`.
- Navigation should feel like a **sequential expansion**, not a confusing maze.

### 🏠 Homepage Layout
1. **Navbar**: Clean, unobtrusive.
2. **Hero Section**: High impact, "Start Your Journey" CTA.
3. **Value Section**: Why this platform matters.
4. **Explore Preview**: Teaser of practical categories.
5. **Featured Learning**: Top trending courses/shastras.
6. **How It Works**: The Step-by-Step journey.
7. **Final CTA**: "Your path begins here."
