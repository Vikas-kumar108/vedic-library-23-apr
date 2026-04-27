Very good. This is the **right next step**, and we will do it **cleanly and canonically**, so that:

* Education stays **separate from śāstra**
* Data remains **machine-readable**
* Future search (Phase 4.5) becomes easy
* Human editors (Guides) remain accountable

Below are **educational content data schemas with concrete JSON examples**, ready to use.

You may later place these under:

```
vedic-library/data/education/
```

---

# 📘 Educational Content Data Schemas

*(Phase 4 – Canonical, JSON-first)*

---

## 🧱 Core Design Principles (Read First)

All educational schemas follow these rules:

1. **Never modify canonical verse JSON**
2. **Always reference verses via UID**
3. **Clearly labeled as educational**
4. **Attribution mandatory**
5. **Optional consumption**
6. **Search-ready metadata**

---

# 1️⃣ Chapter Introduction Schema

### Purpose

Give calm, high-level context **before reading a chapter**.

### File example

```
education/chapters/bg_chapter_01_intro.json
```

### JSON Schema Example

```json
{
  "uid": "edu.bg.chapter.01.intro",
  "type": "chapter_introduction",
  "text_id": "bg",
  "chapter": 1,

  "title": "Arjuna’s Dilemma on the Battlefield",
  "summary": "This chapter sets the emotional and ethical context of the Bhagavad-gītā, presenting Arjuna’s inner conflict as he faces war against his own relatives.",

  "key_themes": [
    "dharma",
    "conflict",
    "compassion",
    "duty"
  ],

  "related_concepts": [
    "dharma",
    "karma",
    "kṣatriya-dharma"
  ],

  "attribution": {
    "author": "Vedic Library Editorial",
    "role": "guide",
    "date": "2026-01-15"
  },

  "optional": true
}
```

---

# 2️⃣ Chapter Summary Schema

### Purpose

Provide a **retrospective overview** after finishing a chapter.

### File example

```
education/chapters/bg_chapter_01_summary.json
```

### JSON Schema Example

```json
{
  "uid": "edu.bg.chapter.01.summary",
  "type": "chapter_summary",
  "text_id": "bg",
  "chapter": 1,

  "summary_points": [
    "Arjuna surveys both armies and recognizes his relatives and teachers.",
    "He experiences grief, fear, and moral confusion.",
    "He questions the righteousness of fighting.",
    "He becomes unable to act and seeks guidance."
  ],

  "themes_reinforced": [
    "dharma",
    "compassion",
    "inner conflict"
  ],

  "linked_verses": [
    "bg.01.28",
    "bg.01.30",
    "bg.01.46"
  ],

  "attribution": {
    "author": "Vedic Library Editorial",
    "role": "guide"
  },

  "optional": true
}
```

---

# 3️⃣ Concept Explanation Schema

### Purpose

Explain **philosophical concepts** neutrally and repeatedly referenced.

### File example

```
education/concepts/dharma.json
```

### JSON Schema Example

```json
{
  "uid": "edu.concept.dharma",
  "type": "concept",

  "term": "Dharma",
  "language": "en",

  "definition": "Dharma refers to that which upholds order, duty, and harmony, both individually and socially. Its meaning varies according to context, role, and circumstance.",

  "notes": [
    "Dharma is not a single rule but a contextual principle.",
    "In the Bhagavad-gītā, dharma is often discussed in relation to action and responsibility."
  ],

  "related_terms": [
    "karma",
    "svadharma",
    "ṛta"
  ],

  "example_verses": [
    "bg.02.31",
    "bg.03.35",
    "bg.18.47"
  ],

  "attribution": {
    "author": "Vedic Library Editorial",
    "role": "guide"
  }
}
```

---

# 4️⃣ Glossary Term Schema

### Purpose

Clarify **short Sanskrit terms** without philosophical exposition.

### File example

```
education/glossary/svadharma.json
```

### JSON Schema Example

```json
{
  "uid": "edu.glossary.svadharma",
  "type": "glossary_term",

  "term": "Svadharma",
  "language": "en",

  "short_definition": "One’s own duty, determined by nature, role, and circumstance.",

  "usage_notes": [
    "Often contrasted with paradharma (another’s duty).",
    "Mentioned frequently in ethical discussions in the Gītā."
  ],

  "linked_concepts": [
    "dharma",
    "karma"
  ],

  "example_verses": [
    "bg.03.35",
    "bg.18.47"
  ]
}
```

---

# 5️⃣ Guided Reading Path Schema

### Purpose

Suggest **reading sequences** without enforcing interpretation.

### File example

```
education/paths/bg_bhakti_path.json
```

### JSON Schema Example

```json
{
  "uid": "edu.path.bg.bhakti",
  "type": "reading_path",

  "title": "Bhakti-Oriented Reading Path",
  "description": "A suggested sequence of chapters and verses highlighting devotion (bhakti) in the Bhagavad-gītā.",

  "sequence": [
    { "type": "chapter", "id": "bg.09" },
    { "type": "chapter", "id": "bg.12" },
    { "type": "chapter", "id": "bg.18" }
  ],

  "key_concepts": [
    "bhakti",
    "śraddhā",
    "grace"
  ],

  "attribution": {
    "author": "Vedic Library Editorial",
    "role": "guide"
  },

  "optional": true
}
```

---

# 6️⃣ Theme Metadata Schema (Search-Ready, No Search Yet)

### Purpose

Tag verses for **orientation**, not ranking.

### File example

```
education/themes/bhakti.json
```

### JSON Schema Example

```json
{
  "uid": "edu.theme.bhakti",
  "type": "theme",

  "label": "Bhakti (Devotion)",

  "description": "Verses emphasizing devotion, surrender, and loving service to the Supreme.",

  "linked_verses": [
    "bg.09.22",
    "bg.12.15",
    "bg.18.66"
  ],

  "related_themes": [
    "karma",
    "jñāna"
  ]
}
```

---

# 🧠 Why This Schema Set Is Strong

✅ Canonical text untouched
✅ Clear separation of layers
✅ Attribution enforced
✅ Optional consumption
✅ UID-aligned
✅ Search-ready (Phase 4.5)
✅ Multi-language expandable
✅ Multi-guide friendly

---

## 🕉️ Closing Principle

> **Education must always point back to śāstra,
> never stand in front of it.**

These schemas do exactly that.

---

### Next calm step (choose one):

1️⃣ Decide **which educational artifact to implement first**
(recommended: *Chapter 1 Introduction*)
2️⃣ Design **UI behavior for educational overlays** (no code yet)
3️⃣ Pause & reflect before writing content

Just tell me the number, dear 🙏

