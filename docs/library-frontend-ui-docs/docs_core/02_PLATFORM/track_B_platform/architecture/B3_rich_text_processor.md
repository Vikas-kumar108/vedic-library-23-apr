# B3 — Rich Text Processor Layer

## Context

Up to B2, Purport and textual content are rendered as plain paragraphs
derived directly from JSON.

Example rendering:

    exposition.content.split("\n\n")

This works but does not support:

- Automatic italicization of Sanskrit titles
- Internal linking to corpus entries
- Cross-text references
- Footnotes
- Highlighting Sanskrit terms

To evolve toward a scholarly-grade scripture platform,
we introduce a centralized Rich Text Processor Layer.

---

## Architectural Principle

Data remains canonical and pure.

No HTML stored in JSON.

All formatting transformations occur in a rendering layer.

    Raw JSON
        ↓
    Text Processor
        ↓
    JSX Rendering

This preserves:
- Data integrity
- Static generation compatibility
- Future migration flexibility

---

## Phase 1 — Automatic Sanskrit Detection (B3.1)

We begin with:

- Regex detection of Sanskrit diacritics
- Wrapping detected words in styled spans
- Italicization of known scripture titles

Example transformation:

    Bhagavad-gītā → <em>Bhagavad-gītā</em>

    dharma-kṣetre → <span class="sanskrit">dharma-kṣetre</span>

This is purely presentational.

---

## Phase 2 — Title Recognition

Introduce dictionary-based detection of canonical works:

- Bhagavad-gītā
- Mahābhārata
- Vedas
- Upaniṣads
- Śrīmad-Bhāgavatam (future)

Later these will become internal links.

---

## Phase 3 — Structured Hybrid Mode (Future B3.3)

Eventually we evolve toward:

Hybrid mode:
- Regex detection
- Structured tagging in data (optional)

Example:

    {
      "content": "...",
      "entities": [
        { "type": "text", "ref": "mahabharata" }
      ]
    }

Processor then resolves entity → internal link.

This allows:
- Cross-text references
- Commentary linking
- Citation support

---

## Why Centralized Processor?

Without a processor:

- Formatting logic spreads across components
- Linking becomes inconsistent
- Refactoring becomes expensive

With a processor:

- All textual intelligence lives in one file
- Future enhancements are isolated
- UI components remain clean

---

## Current Status

Phase B3.1 begins:
Automatic detection layer implementation.
