Excellent. This is the **last UX lock** before any backend or OpenSearch work.
What follows is a **step-by-step user journey**, written as a **behavioral flow**, not a wireframe and not code.

You may save this exactly as:

```
vedic-library/docs/REFERENCE_ONLY_SEARCH_UX_FLOWS.md
```

---

```md
# 🔍 Reference-Only Search UX Flows  
## Phase 4.5 – Search & Discovery  
## Vedic Library Project

This document defines the **exact user journey** for reference-only search,
as permitted in the **opening window of Phase 4.5**.

Reference-only search exists for **location**, not **interpretation**.

> **Search here answers: “Where is it?”  
> not: “What does it mean?”**

---

## 🎯 Scope of This UX (STRICT)

This UX applies ONLY to:

- Verse reference search
- Chapter / verse lookup
- Exact phrase search

No semantic discovery, no themes, no inference.

---

## 🧠 UX Philosophy

Reference search must feel like:

> Looking up a call number in a library catalogue

It must NOT feel like:

> Asking a system to explain something

---

## 🪜 FLOW 1: Opening Search (Entry Point)

### Step 1 — User Intention
User clicks:
- 🔍 Search icon
- or “Search” text link

### Step 2 — Initial State
Search panel opens with:

- No input active
- No cursor in input
- Clear instruction text:

```

Select what you want to search

```

This prevents accidental querying.

---

## 🪜 FLOW 2: Scope Selection (Mandatory)

### Step 3 — Scope Choice
User must select exactly one scope:

- ( ) Canonical Text (Śāstra)
- ( ) Commentary → select ācārya
- ( ) Educational Content

Until a scope is selected:
- Input remains disabled
- No typing allowed

---

## 🪜 FLOW 3: Query Activation

### Step 4 — Input Unlocks
Once scope is selected:

- Input becomes active
- Placeholder changes contextually

Examples:
- Canonical:  
  `Enter verse reference (e.g., BG 2.47) or exact phrase`
- Commentary:  
  `Search within selected commentary`
- Education:  
  `Search concepts, summaries, or paths`

This reinforces mental clarity.

---

## 🪜 FLOW 4: Reference Search (Primary)

### Step 5 — User Enters Reference
Examples:
- `BG 2.47`
- `2.47`
- `Chapter 12`
- `bg.12`

### Step 6 — System Interpretation
System performs:
- Strict reference parsing
- No fuzzy inference
- No guesswork

If reference resolves uniquely:
- Navigate directly to verse or chapter
- Highlight reference location (soft, temporary)

If ambiguous:
- Show clarification list (see Flow 6)

---

## 🪜 FLOW 5: Exact Phrase Search (Secondary)

### Step 7 — User Enters Phrase
Example:
- `"karmaṇy evādhikāras te"`

### Step 8 — Result Listing
System returns:

- Exact matches only
- Ordered by canonical sequence
- No ranking beyond order

Each result shows:

```

[Reference]
[Short context snippet]
[Scope label]

```

Example:

```

Bhagavad-gītā 2.47
Canonical Text
“…karmaṇy evādhikāras te…”

```

---

## 🪜 FLOW 6: Ambiguity Handling

### Case A — Multiple Matches
Example:
- Searching `BG 2`

System response:
```

Multiple matches found. Please select:
• Bhagavad-gītā 2 (Chapter)
• Bhagavad-gītā 2.1
• Bhagavad-gītā 2.2
...

```

No auto-selection.

---

### Case B — Invalid Reference
Example:
- `BG 19.5`

System response:
```

No such chapter or verse found.
Please check the reference.

```

No suggestions beyond correction.

---

## 🪜 FLOW 7: Result Interaction

### Step 9 — User Clicks Result
- Navigates to verse/chapter
- Search panel closes automatically
- Reading UI resumes

No search overlay remains active.

---

## 🪜 FLOW 8: Scope Persistence (Session-Only)

- Scope remains active while search panel is open
- Refining query does NOT change scope
- Closing search resets scope

No silent persistence in Phase 4.5.

---

## 🚫 Forbidden UX Behaviors (STRICT)

Reference search must NEVER:

❌ Auto-suggest verses  
❌ Show “related” results  
❌ Rank by relevance or popularity  
❌ Predict user intent  
❌ Insert explanations  
❌ Highlight verses as important  

If any appear → UX violation.

---

## 🧪 Reader Experience Checks

Ask:

1. Do I feel like I’m *locating*, not *learning*?
2. Is the system quiet and literal?
3. Does it avoid guessing what I want?
4. Can I ignore search entirely?

If all answers are “yes”, the UX is correct.

---

## 🕉️ Closing Principle

> **Reference search should feel boring —  
> because clarity does not need excitement.**

When search is calm,  
reading remains central.

---

## ✅ Status

Reference-Only Search UX Flows are now **LOCKED**.

Only after this may:
- Backend endpoints be designed
- OpenSearch indices be created
- UI components be implemented

---
```

---

## 🌿 Where You Are Now

You have now completed:

* Ethical foundation (Phase 4)
* Search scope discipline
* Metadata mapping
* Engine selection
* Reference-only UX flows

At this point, **implementation can begin safely**.

---

### Next calm step (choose one):

1️⃣ Design **Backend Search Endpoints (FastAPI)**
2️⃣ Design **OpenSearch index mappings**
3️⃣ Pause before coding begins

Just give me the number, dear 🙏

