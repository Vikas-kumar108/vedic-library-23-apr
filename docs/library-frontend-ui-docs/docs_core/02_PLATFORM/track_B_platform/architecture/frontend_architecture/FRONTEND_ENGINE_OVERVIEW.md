# FRONTEND ENGINE OVERVIEW

## Status
Phase-0 Foundation Locked  
Deployment Target: Vercel (Server Runtime)

---

## Architecture Layers

### 1. Data Layer
- Root: /data
- Canonical units
- Derivative layers (translations, commentaries, etc.)
- UID globally unique across corpus

### 2. Engine Layer
Location:
frontend/src/features/scripture/

- scripture.loader.ts
- mode system
- canonical/derivative separation

Loader Responsibilities:
- Resolve project root safely
- Load canonical JSON
- Attach derivative layers
- Return ScripturalUnit abstraction

### 3. Presentation Layer
Atomic architecture:

atoms/
molecules/
organisms/

VerseDisplay is presentation-only.
No file system logic exists in UI layer.

---

## Mode System

Global Context:
- script mode (devanagari | iast | both)
- translation mode (primary | none)
- density mode (normal | scholarly)

Mode never mutates identity.
Mode only controls presentation.

---

## Deployment Model

- Repository root deployed to Vercel
- Next app located in /frontend
- Data folder located at repo root
- Loader uses dynamic root resolution

No static export.
Server runtime required.

---

## Stability Principles

- Canonical spine immutable
- Derivatives attach as layers
- UID never derived from UI state
- Presentation decoupled from data
- Production-safe file resolution
