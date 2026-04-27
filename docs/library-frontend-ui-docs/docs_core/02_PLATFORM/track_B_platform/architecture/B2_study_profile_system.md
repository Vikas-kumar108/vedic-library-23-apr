# B2 — Study Profile System

## Context

Initial UI exposed individual toggles for script and translation.

As the platform evolved to support:

- Devotional reading
- Scholarly study
- Comparative analysis

A macro-level reading mode system became necessary.

---

## Architectural Decision

Introduce StudyProfile:

    devotional
    scholarly
    comparative

Stored in:

    ScriptureMode

Persisted using:

    React state + localStorage

---

## Behavior Philosophy

Devotional:
- Translation visible
- Purport collapsed

Scholarly:
- Translation visible
- Purport visible

Comparative:
- Reserved for multi-ācārya rendering

---

## Why Not Only Toggles?

Without a macro profile:

- UI becomes cluttered
- Mode logic spreads across components
- Reading experience lacks cohesion

StudyProfile provides:
- Coherent reading philosophy
- Extensible system
- Future URL sharing support
