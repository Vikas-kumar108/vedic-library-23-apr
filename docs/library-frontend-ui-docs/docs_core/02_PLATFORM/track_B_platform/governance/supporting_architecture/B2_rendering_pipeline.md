# B2 — Rendering Pipeline

---

## 1. Entry Point

Route:
`/bg/[chapter]/[verse]`

page.tsx performs:

- Param extraction
- Chapter validation
- loadVerseComposition(uid, editor)

---

## 2. loadVerseComposition()

Returns:

{
  canonical,
  editorial?: {
    unit,
    layers: {
      synonyms?,
      translation?,
      exposition?
    }
  }
}

---

## 3. Canonical Layer

Provides:

- Devanagari
- Transliteration (IAST)

---

## 4. Editorial Layers

Optional, depending on availability:

### Synonyms
Array of structured items.

### Translation
Plain string content.

### Exposition
Purport text.

---

## 5. VerseDisplay Responsibility

VerseDisplay does NOT fetch data.

It:

- Receives props
- Applies UI state
- Renders sections conditionally

---

This separation allows:

- Multiple editors
- Range-based verses
- Commentary expansion
- Comparative view
