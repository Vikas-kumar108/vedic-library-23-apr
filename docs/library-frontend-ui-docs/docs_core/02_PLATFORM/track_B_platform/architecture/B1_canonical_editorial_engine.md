# B1 — Canonical + Editorial Composition Engine

## Context

Initial implementation rendered only canonical Sanskrit verses.

Translations, synonyms, and purports were separate JSON files but not
architecturally composed.

Grouped verses (e.g., 16.1–3) caused data resolution issues.

---

## Architectural Goal

Separate:

- Canonical immutable spine
- Editorial layer (author-specific)
- Derivative layers (synonyms, translation, exposition)

Enable:

- Range-aware editorial resolution
- Multi-ācārya support (future)
- Static generation compatibility

---

## Key Concepts

Canonical Unit:
Immutable structural text layer.

Editorial Unit:
Author-defined grouping over canonical verses.

Derivative Layers:
- Synonyms
- Translation
- Exposition

---

## Core Implementation

Introduced:

    loadVerseComposition()

This function:

1. Loads canonical verse
2. Resolves editorial unit by range
3. Loads derivative layers conditionally
4. Returns a composed structure

---

## Architectural Benefit

- Clean separation of concerns
- Future comparative commentary support
- No duplication of canonical text
- Fully SSG-compatible
