# Vedic Library – Track B Platform Bootstrap

## Current Deployment State

- Framework: Next.js (App Router)
- Hosting: Vercel
- Production URL: https://library.vedicskills.com
- GitHub → Vercel auto-deploy enabled
- Root directory on Vercel: frontend/

---

## Current Frontend Structure

src/
  app/
  components/
  features/
    scripture/
      components/
        atoms/
        molecules/
        organisms/
      mode/
      scripture.loader.ts
  lib/
  types/

---

## Current Capabilities

✔ Dynamic routing for BG chapter/verse  
✔ Mode context (script toggle, translation toggle)  
✔ Scripture loader abstraction  
✔ Atomic scripture component structure  
✔ Live production deployment  
✔ Domain + SSL configured  

---

## What Is Missing

❌ Translation content not visible  
❌ No commentary system  
❌ No Purport layer  
❌ No multi-commentary support  
❌ No Supabase integration  
❌ No user system  
❌ No bookmark / notes  
❌ UI not visually differentiated yet  
❌ No media placeholders  
❌ No report / metadata panel  
❌ No scholarly mode panel  

---

## Objective of Next Chat

Advance Track B from B2 → B5 in accelerated mode:

B2 – UI Stabilization  
B3 – Feature Completion (translation, commentary UI)  
B4 – Supabase Integration  
B5 – Production-Ready Scholar Platform  

---

## Design Direction Decision

We will implement:

☐ Minimal scholarly mode  
☐ Sacred green classical mode  
☐ Premium scripture app mode  
☐ Hybrid toggle-based mode  

(Decision to be made in next chat)

---

## Architectural Constraints

- Do not break routing
- Do not break scripture.loader
- Do not hardcode BG-specific logic
- Preserve UID integrity
- Supabase integration must remain abstracted

---

## Fast-Track Mandate

Goal: Reach B5 within this sprint.

This includes:
- Multi-layer verse rendering
- Commentary tabs
- Translation rendering
- Purport rendering
- User authentication
- Bookmark system
- Supabase connection
- Deployment pipeline verified

---

## This Chat Should Assume

- Track A canonical ingestion is ongoing separately.
- Track C civilization layer is parallel and not blocking.
- We are focusing only on Track B execution.
