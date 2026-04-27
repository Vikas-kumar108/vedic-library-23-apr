# Vedic Library – Track B Platform Handoff (v1)

This file is the official bootstrap for starting a new focused Track B (Platform) execution chat.

The goal is to move rapidly from B2 → B5 without architectural confusion.

---

# 🔥 EXECUTION MODE

We are no longer reorganizing folders.
We are no longer discussing theory.

We are building forward aggressively.

Target: Reach B5 production-grade platform state.

---

# 🧭 COPY-PASTE THIS AS THE FIRST MESSAGE IN NEW CHAT

---

We are continuing Track B – Platform development.

Operate in accelerated B2 → B5 execution mode.

Context:

- Next.js (App Router)
- TypeScript
- Vercel deployment live
- Domain connected
- Scripture loader abstraction exists
- Atomic scripture components exist
- Mode context exists
- No Supabase yet
- Translation not fully visible
- No commentary layer
- No user system

Objective:

1. Implement translation rendering fully
2. Implement multi-commentary support (tabs system)
3. Implement Purport rendering
4. Introduce Supabase authentication
5. Implement bookmark system
6. Add user preference persistence
7. Reach B5 production-ready scripture platform

Constraints:

- Do NOT redesign routing
- Do NOT rewrite atomic architecture
- Preserve scripture.loader abstraction
- Preserve UID system integrity
- Keep BG-specific logic abstracted for future expansion

We are not discussing Track A or Track C here.
We are only executing Track B.

---

# 📦 FILES TO PASTE INTO NEW CHAT

Paste the following files completely:

1. src/types/scripture.types.ts
2. src/features/scripture/scripture.loader.ts
3. src/features/scripture/mode/mode.context.tsx
4. src/features/scripture/components/organisms/VerseDisplay.tsx
5. Folder tree of src/
   → run: tree src -L 4
6. package.json

Optional (if Supabase is introduced later):
7. .env.local (without exposing secrets publicly)

Do NOT paste:
- Archive folder
- Track A canonical ingestion files
- Track C civilization documents
- Old legacy pre-track documents

---

# 📊 CURRENT TRACK B STATUS

## B0 – Deployment Stabilized ✔
- GitHub → Vercel auto deploy
- Domain connected
- SSL active

## B1 – Routing Engine ✔
- Dynamic chapter/verse routing functional

## B2 – UI Base Polish ✔
- VerseDisplay stabilized
- ScriptBlock refined
- TranslationBlock refined
- VerseLabel refined

## B3 – Scripture Feature Completion (Next)
- Multi-commentary UI
- Purport rendering
- Metadata panel
- Scholar mode toggle
- Visual differentiation

## B4 – Supabase Integration
- Auth
- Session context
- Bookmark table
- Preferences
- Persistence layer

## B5 – Production Platform Mode
- Role-based features
- Performance tuning
- Admin moderation structure
- Final UI pass
- Deployment audit

---

# 🎯 DESIGN DECISION REQUIRED IN NEW CHAT

Choose one primary visual direction:

A) Minimal Scholarly Mode  
B) Sacred Green Classical Mode  
C) Premium Scripture App Mode  
D) Hybrid Toggle-Based Mode  

This decision must be made immediately in the new chat before UI expansion.

---

# 🧱 MANDATE

The new chat must:

- Produce structured step-by-step execution
- Avoid philosophical abstraction
- Move directly into implementation
- Deliver working Supabase integration
- Deliver working commentary system
- Deliver visible platform upgrade

---

# 🧘 STATE OF MIND

This is no longer exploratory architecture.

This is build mode.

We are finishing Track B.

---

End of Handoff.
