# 🧩 Frontend Structure – Vedic Library (Next.js)

This document defines the **frontend architecture, folder structure, and design discipline**
for the **Vedic Library** project.

The frontend is built using **Next.js (App Router)** and **React components**.

This document is binding for Phase 1 and expandable for future phases.

---

## 1. Frontend Philosophy

The frontend of Vedic Library follows these principles:

1. **Text-first UI**
   - Scripture readability is more important than visual effects
2. **Component discipline**
   - One component = one responsibility
3. **Predictable routing**
   - URL structure mirrors śāstra structure
4. **Static by default**
   - Dynamic features are added only when required
5. **Language-aware, not language-bound**
   - UI supports multiple languages without duplicating pages

---

## 2. Frontend Root Location

All frontend code lives inside:

```text
vedic-library/frontend/
Nothing outside this folder should contain UI logic.

3. High-Level Folder Structure
text
Copy code
frontend/
├── app/                     ← Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── bg/
│   │   └── [chapter]/
│   │       └── [verse]/
│   │           └── page.tsx
│   └── api/                 ← API routes (later)
│
├── components/              ← React UI components
│   ├── verse/
│   │   ├── Verse.tsx
│   │   ├── Sloka.tsx
│   │   ├── Transliteration.tsx
│   │   ├── Synonyms.tsx
│   │   ├── Translation.tsx
│   │   └── Purport.tsx
│   │
│   ├── language/
│   │   └── LanguageToggle.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/                     ← Frontend helper logic
│   ├── loadVerse.ts
│   ├── languages.ts
│   └── uids.ts
│
├── styles/
│   └── globals.css
│
├── public/
│   └── assets/
│
├── next.config.js
├── package.json
└── tsconfig.json
4. Routing Design (Vedabase-style)
Example URL
bash
Copy code
/bg/1/1
Meaning
bg → Bhagavad-gītā

1 → Chapter 1

1 → Verse 1

App Router Mapping
text
Copy code
app/bg/[chapter]/[verse]/page.tsx
This mirrors the UID:

Copy code
bg.1.1
5. Root Layout (app/layout.tsx)
Purpose:

Global HTML structure

Shared header/footer

Language context (later)

Responsibilities:

<html> and <body>

Global styles

Persistent navigation

No scripture logic allowed here.

6. Home Page (app/page.tsx)
Purpose:

Entry point

Simple navigation to Bhagavad-gītā

Phase 1 rules:

Minimal content

No marketing

No login prompts

7. Verse Page (app/bg/[chapter]/[verse]/page.tsx)
This is the core page of Phase 1.

Responsibilities:

Load verse JSON

Pass data to components

Handle language toggle

It must NOT:

Contain styling logic

Contain translation logic

Contain AI logic

8. Verse Components (Core UI Units)
Each component has one responsibility only.

Sloka.tsx
Displays Devanāgarī Sanskrit

Transliteration.tsx
Displays Roman transliteration

Synonyms.tsx
Displays word-by-word meanings

Translation.tsx
Displays verse translation (EN / HI)

Purport.tsx
Displays commentary text (EN / HI)

Each component:

Receives data via props

Has no knowledge of UID or routing

9. Language Handling
Language Toggle
Component:

text
Copy code
components/language/LanguageToggle.tsx
Rules:

Language selection is UI state

Canonical text is language-independent

Translations are selected by language key

No duplicated pages for languages.

10. Frontend lib/ Folder
This folder contains pure helper logic, no UI.

Examples
loadVerse.ts
Loads verse JSON based on UID

uids.ts
Converts route params to UID (bg.1.1)

languages.ts
Defines supported languages

No React code allowed here.

11. Styling Rules
Phase 1
Minimal CSS

Focus on readability

Black text on light background

Phase 2+
Typography improvements

Optional Tailwind CSS

Avoid:

Animations

Visual noise

Distractions

12. What Is Explicitly NOT in Frontend (Yet)
❌ Authentication logic
❌ Donations logic
❌ Database access
❌ AI translation calls
❌ Search engine
❌ Analytics

These belong to later phases.

13. TypeScript Usage
Use TypeScript (.ts, .tsx)

Strong typing for:

Verse data

Language keys

UID handling

Avoid:

Complex generics

Advanced patterns

14. Version Discipline
Frontend versions:

v0.x → Experimental

v1.0 → Stable Bhagavad-gītā library

v2.x → Multi-commentary

v3.x → Users & support

15. Guiding Principle
The frontend is a window to śāstra,
not a place to interpret it.
