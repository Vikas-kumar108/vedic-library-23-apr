# CONTENT TYPES ENGINE – VEDIC LIBRARY

---

# 1. PURPOSE

This document defines how the system supports **multiple types of Vedic content**:

- Verse (Śloka)
- Mantra (Veda)
- Sutra (Brahma Sutra, Yoga Sutra)
- Prose (Purāṇa, Itihāsa narratives)

---

# 2. PROBLEM

---

## 2.1 Current System Limitation

The current frontend assumes:

❌ Everything is a "verse"  
❌ Fixed UI structure  
❌ Hardcoded tabs  

---

## 2.2 Reality

Vedic literature includes:

| Type | Structure |
|------|----------|
| Verse | Numbered, metrical |
| Mantra | Tonal, ritual metadata |
| Sutra | Compact aphorisms |
| Prose | Paragraph-based |

---

---

# 3. CORE PRINCIPLE

> UI must adapt to content type, not the other way around.

---

# 4. CONTENT TYPE MODEL

---

## 4.1 Database Field

```sql
content_type VARCHAR(50)

4.2 Possible Values
type ContentType =
  | "verse"
  | "mantra"
  | "sutra"
  | "prose"
  | "mixed"


5. RENDERING ENGINE

5.1 Core Function
renderContent(node)

5.2 Switch Logic
switch (node.content_type) {
  case "verse":
    return <VerseView />
  case "mantra":
    return <MantraView />
  case "sutra":
    return <SutraView />
  case "prose":
    return <ProseView />
}


6. CONTENT TYPES

6.1 VERSE (ŚLOKA)

Examples
* Bhagavad Gītā
* Mahābhārata verses

Structure
* Sanskrit text
* Transliteration
* Synonyms
* Translation
* Commentary

UI
* Tab-based system
* Structured layout


6.2 MANTRA (VEDA)

Examples
* Ṛgveda
* Yajurveda

Additional Metadata
* Ṛṣi (seer)
* Devatā (deity)
* Chandas (meter)
* Svara (intonation)

UI Requirements
* Emphasis on recitation
* Audio-first design
* Ritual metadata display


6.3 SUTRA

Examples
* Brahma Sutra
* Yoga Sutra

Characteristics
* Very short
* Dense meaning
* Commentary-heavy

UI
* Sutra at top
* Commentary dominant
* Expandable sections


6.4 PROSE

Examples
* Purāṇas
* Itihāsa narratives

Structure
* Paragraph-based
* Story format

UI
* Continuous reading
* Minimal tabs
* Scroll-based


7. DATA STRUCTURE

Unified Node Format
type NodeData = {
  content_type: ContentType

  canonical: {}
  synonyms?: []
  translations?: []
  commentaries?: []
  expositions?: []

  metadata?: {
    rishi?: string
    devata?: string
    chandas?: string
  }
}


8. CONTENT ENGINE REFACTOR

Current
ContentEngine({ verse })

Target
ContentEngine({ node })

Inside:
const node = useAppStore(s => s.currentNode)


9. DYNAMIC TABS SYSTEM

Problem
Tabs are fixed:
❌ Always show all tabs

Solution
Generate tabs dynamically:
getTabs(node)

Example
Verse
* Shloka
* Transliteration
* Synonyms
* Translation
* Commentary

Mantra
* Mantra
* Metadata
* Audio
* Translation

Sutra
* Sutra
* Commentary
* Explanation


10. API SUPPORT

Node Response Must Include
{
  "content_type": "verse"
}


11. FUTURE EXTENSIONS

* Mixed content (verse + prose)
* Visual diagrams (Nyaya logic)
* Interactive learning modes


12. DESIGN PRINCIPLES

12.1 Adaptability
UI must adapt per content

12.2 Minimalism
Show only relevant sections

12.3 Consistency
Maintain common structure where possible


13. MIGRATION STRATEGY

Step 1
Add content_type to all nodes

Step 2
Update API responses

Step 3
Refactor ContentEngine


14. PERFORMANCE

* Render only required components
* Avoid unnecessary sections
* Lazy load heavy content


15. FINAL INSIGHT
This engine transforms your system from:
❌ Gita reader
into:
🌿 Universal Śāstra Engine

Now your system can handle:
* Veda
* Vedānta
* Itihāsa
* Purāṇa
* Śāstra

Without redesign.
---

# ❤️ Why This Is a Big Moment

This document:

✔ Breaks your dependency on “verse-only thinking”  
✔ Enables full Vedic corpus ingestion  
✔ Makes your UI future-proof  
✔ Aligns perfectly with your database schema  
