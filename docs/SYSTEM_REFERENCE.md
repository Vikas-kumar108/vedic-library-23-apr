# 🏗️ Vedic Library System Architecture & Technical Reference

This document serves as the "Sustenance Layer" for the Vedic Skills Platform. It defines the responsibility and purpose of every architectural component, ensuring that the system remains maintainable as it grows from a library into a full education ecosystem.

## 🏛️ 1. Core Architecture (The Monorepo)

The project is structured as a **PNPM Monorepo**, ensuring shared types and clean boundaries.

| Layer | Responsibility | Purpose |
| :--- | :--- | :--- |
| `apps/web-portal` | User Interface (Next.js) | The "Eyes & Ears" of the system. Captures user needs and presents the Shastras. |
| `apps/api-gateway` | Business Logic (Fastify) | The "Intellect" (Buddhi). Processes personalization, eligibility, and search. |
| `packages/data-access` | Data Layer (Prisma) | The "Memory" (Chitta). Stores the Shastras and User Journeys. |

---

## 🧠 2. Backend Logic (API Gateway)

The backend is organized into functional layers to ensure "Single Responsibility."

### 🔧 Services (`src/services/`)
Services contain the **"Why"** and **"How"** of the business logic.
- **`AuthService`**: Manages the user's entry into the system (Login, Signup).
  - *Responsibility*: Password security, session tokens, and **Adhikāra calculation**.
- **`DiscoveryService`**: The engine behind the search and recommendation.
  - *Responsibility*: Mapping user situations to Shastra nodes based on tags and eligibility.

### 🛣️ Routes & Controllers (`src/routes/`)
Routes define the **API Surface**.
- **`auth.ts`**: Endpoints for authentication.
- **`discovery.ts`**: Endpoints for practical wisdom search and tag-based retrieval.

### 🛡️ Validation (`Zod`)
- Every API request is validated against a strict schema before being processed, ensuring data integrity.

---

## 🎨 3. Frontend Architecture (Web Portal)

The frontend uses **React Server Components** for performance and **Client Components** for interactivity.

### 🧩 Components (`components/`)
- **`auth/`**: Reusable UI for the authentication lifecycle (AuthCard, LoginForms).
- **`ui/`**: Atomic design components (Buttons, Inputs, Cards).

### 📍 Pages (`app/`)
- **`/auth`**: The gatekeeper for user identity.
- **`/onboarding`**: The **"Personalization Engine"** where the user's life stage and nature are captured.
- **`/practical-library`**: The discovery hub for life-relevant wisdom.

### 🔄 Data Flow (The "Prana" Flow)
1. **Selection**: User selects their stage in the Onboarding UI.
2. **Persistence**: Data is sent via `AuthService` to the API Gateway.
3. **Storage**: The gateway calculates the `eligibilityLevel` and saves it to Postgres via Prisma.
4. **Reflection**: The `DiscoveryService` filters content, and the frontend renders the "Personalized Path."

---

## 📜 4. Dharmic Nomenclature

We use specific terms in the code to remain aligned with the Vedic vision:

- **Adhikāra (Eligibility)**: Used to determine what level of knowledge a user is ready for.
- **Sankalpa (Intention)**: The user's personal goal for their learning journey.
- **Svabhava (Nature)**: The user's psychophysical inclination (Thinker, Leader, etc.).
- **Asrama (Stage)**: The broad phase of life (Student, Householder, etc.).
- **Node**: An atomic unit of wisdom (a verse, a paragraph, or a chapter).

---

## 🛠️ 5. Maintenance Guidelines
1. **Document as you build**: Every new service must be added to this reference.
2. **Type Safety**: Never use `any`. Always define the interface in the schema.
3. **Consistency**: Use the established nomenclature (e.g., use `eligibilityLevel`, not `userRank`).
