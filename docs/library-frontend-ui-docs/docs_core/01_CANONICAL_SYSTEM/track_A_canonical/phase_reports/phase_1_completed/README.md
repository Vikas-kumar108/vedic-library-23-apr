# Phase 1 — Bhagavad-gītā Pilot (Reading Interface)

Phase 1 marks the **first visible manifestation** of the Vedic Library project.

After the architectural foundations were fully established and locked in Phase 0,
Phase 1 focuses on a single, disciplined objective:

> **To enable faithful, calm, uninterrupted reading of the Bhagavad-gītā.**

This phase introduces a frontend interface, but **only as a reader** — not as a platform.

---

## Purpose of Phase 1

Phase 1 exists to answer one question only:

> *Can a reader sit with the Bhagavad-gītā and read it properly, without distraction,
> distortion, or premature complexity?*

Everything in Phase 1 serves this purpose.
Anything that does not serve this purpose is explicitly excluded.

---

## Scope (Strictly Limited)

Phase 1 includes:

- Bhagavad-gītā only (pilot text)
- Verse-by-verse rendering
- Vedabase-style content order:
  1. Verse header (BG X.Y)
  2. Sanskrit śloka (Devanāgarī)
  3. Transliteration (IAST)
  4. Word-for-word synonyms
  5. Translation
  6. Purport
- English (default) and Hindi language toggle
- Previous / Next verse navigation
- Graceful handling of invalid verses
- Minimal typography for readability
- JSON-driven rendering using canonical and derivative layers

---

## Explicit Exclusions (Non-Negotiable)

The following are **not permitted** in Phase 1:

- ❌ User accounts or authentication
- ❌ Backend APIs
- ❌ Databases
- ❌ Search
- ❌ Donations
- ❌ AI-assisted features
- ❌ Multiple ācāryas
- ❌ Commentary toggles
- ❌ Analytics or tracking
- ❌ Visual theming or animations

If any of the above appear, Phase 1 is considered **violated**.

---

## Relationship to Phase 0

Phase 1 **does not modify** anything produced in Phase 0.

It strictly consumes:

- Canonical verses
- Editorial Units
- Derivative layers
- Verse Index
- Pipeline rules
- Schema contracts

All Phase-0 artifacts are treated as **immutable law**.

---

## Outcome of Phase 1

When Phase 1 is complete:

- The Bhagavad-gītā can be read peacefully, end to end
- The interface feels calm, dignified, and trustworthy
- The architecture proves itself viable for expansion
- A clear version boundary exists: **v1.0-pilot**

---

## Status & Governance

- Phase 1 begins only after Phase 0 is formally closed
- Phase 1 ends only when its success definition is met
- No feature creep is allowed
- All work is local and reviewable

For formal declarations, see:

- `PHASE_1_STATUS.md`
- `PHASE_1_TASKLIST.md`
- `PHASE_1_SUCCESS_DEFINITION.md`

---

🕉️ *Phase 1 is not about building features.*  
*It is about protecting the act of reading.*

## Related Architecture:

See `docs/architecture/DATA_LOADING_ABSTRACTION_STRATEGY.md`
for the system-wide data abstraction contract.


Early frontend bootstrap notes are preserved in the archive
for historical context.

