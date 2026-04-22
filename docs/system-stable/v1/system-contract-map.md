
---

# 🧭 MASTER INDEX — SYSTEM CONTRACT MAP

You need one **single source of truth** that answers:

* What exists?
* Where is it defined?
* Is it fixed or changeable?
* What is its responsibility?

---

## 📄 Save this as:

```bash
docs/system-stable/v1/system-contract-map.md
```

---

# 📘 SYSTEM CONTRACT MAP (v1)

---

# 🔒 1. CORE (IMMUTABLE CONTRACTS)

These MUST NOT change casually.

---

## 🧠 `lib/types.ts`

| Export       | Type | Stability | Responsibility        |
| ------------ | ---- | --------- | --------------------- |
| `TreeNode`   | type | 🔒 FIXED  | Navigation structure  |
| `Verse`      | type | 🔒 FIXED  | Universal data schema |
| `Commentary` | type | 🔒 FIXED  | Commentary structure  |

👉 If this changes → whole system breaks

---

## 🧠 `lib/data-resolver.ts`

| Export             | Type     | Stability | Responsibility   |
| ------------------ | -------- | --------- | ---------------- |
| `getVerseFromNode` | function | 🔒 FIXED  | TreeNode → Verse |

👉 Core pipeline — must stay deterministic

---

## 🧠 `lib/hooks/use-verse.ts`

| Export     | Type | Stability | Responsibility             |
| ---------- | ---- | --------- | -------------------------- |
| `useVerse` | hook | 🔒 FIXED  | Safe UI access to resolver |

---

## 🧠 `data/corpus/registry.ts`

| Export            | Type     | Stability | Responsibility       |
| ----------------- | -------- | --------- | -------------------- |
| `CORPUS_REGISTRY` | constant | 🔒 FIXED  | Global corpus access |

---

# 🟡 2. DATA ADAPTER LAYER (CONTROLLED)

These can evolve, but must respect schema.

---

## 🔄 `lib/normalizers/gita-relational.ts`

| Export            | Type     | Stability   | Responsibility               |
| ----------------- | -------- | ----------- | ---------------------------- |
| `buildGitaCorpus` | function | 🟡 FLEXIBLE | Raw JSON → structured corpus |

---

## 🔄 `lib/normalizers/verse.ts`

| Export           | Type     | Stability   | Responsibility            |
| ---------------- | -------- | ----------- | ------------------------- |
| `normalizeVerse` | function | 🟡 FLEXIBLE | Final Verse normalization |

---

## 🔄 `data/corpus/processed/gita.ts`

| Export | Type     | Stability     | Responsibility |
| ------ | -------- | ------------- | -------------- |
| `gita` | constant | 🟡 SEMI-FIXED | Final dataset  |

---

# 🟣 3. NAVIGATION SYSTEM (NOW LOCKED)

---

## 🌳 `tree-generator.ts` (NEW LOCKED)

| Export             | Type     | Stability | Responsibility |
| ------------------ | -------- | --------- | -------------- |
| `generateGitaTree` | function | 🔒 FIXED  | Corpus → Tree  |

---

## 🌳 `data/tree/vedic-tree.ts`

| Export      | Type     | Stability   | Responsibility  |
| ----------- | -------- | ----------- | --------------- |
| `vedicTree` | constant | 🟡 FLEXIBLE | Root navigation |

---

# 🔴 4. DATA-BOUND UI (CRITICAL COMPONENTS)

These depend on `Verse` schema.

---

## ⚙️ `content-engine.tsx`

| Type      | Stability  | Responsibility                 |
| --------- | ---------- | ------------------------------ |
| Component | 🔒 CAREFUL | Orchestrates content rendering |

---

## 🌲 `tree-navigation.tsx`

| Type      | Stability  | Responsibility |
| --------- | ---------- | -------------- |
| Component | 🔒 CAREFUL | Emits TreeNode |

---

## 🧱 `library-layout.tsx`

| Type      | Stability  | Responsibility                |
| --------- | ---------- | ----------------------------- |
| Component | 🔒 CAREFUL | Connects navigation + content |

---

## 📖 Content Sections

| File                      | Uses                 | Stability |
| ------------------------- | -------------------- | --------- |
| `verse-section.tsx`       | `verse.text`         | 🔴        |
| `translation-section.tsx` | `verse.translations` | 🔴        |
| `meaning-section.tsx`     | `verse.meanings`     | 🔴        |
| `commentary-section.tsx`  | `verse.commentaries` | 🔴        |

---

# 🧱 5. PURE UI COMPONENTS (SAFE ZONE)

---

## `/components/ui/*`

| Type       | Stability | Responsibility |
| ---------- | --------- | -------------- |
| Components | 🟢 SAFE   | Styling only   |

---

## `collapsible-section.tsx`

| Type      | Stability | Responsibility |
| --------- | --------- | -------------- |
| Component | 🟢 SAFE   | Layout wrapper |

---

# 🟢 6. CONFIG FILES (EASILY CHANGEABLE)

---

## `/data/config/*`

| File              | Purpose             |
| ----------------- | ------------------- |
| `languages.ts`    | UI language options |
| `meaning-tabs.ts` | Tabs                |
| `sampradaya.ts`   | Labels              |
| `scripts.ts`      | Script config       |

---

# 🧠 GLOBAL FLOW (FUNCTION CONTRACT)

---

## 🧩 FULL PIPELINE

```txt
TreeNode
   ↓ (useVerse)
getVerseFromNode()
   ↓
CORPUS_REGISTRY
   ↓
normalizeVerse()
   ↓
Verse
   ↓
UI Components
```

---

# 🚨 WHAT IS VARIABLE VS FIXED

---

## 🔒 FIXED (Never casually change)

* `TreeNode`
* `Verse`
* `getVerseFromNode`
* `useVerse`
* `CORPUS_REGISTRY`
* `generateGitaTree`

---

## 🟡 CONTROLLED

* Normalizers
* Corpus building logic

---

## 🟢 FREE

* UI
* Styles
* Layout

---

# 🧭 RULEBOOK (VERY IMPORTANT)

---

## Rule 1

> Schema drives everything

---

## Rule 2

> Resolver must never break

---

## Rule 3

> Tree must come from corpus

---

## Rule 4

> UI must never assume missing fields

---

## Rule 5

> If changing schema → create version

---

# 🧘‍♂️ Your Anxiety — Resolved

You were worried:

> “What if dynamic changes break everything?”

Now:

👉 You have **fixed contracts**
👉 You know **what can move**
👉 You know **what must not move**

---

# 🎯 Final clarity

You now have:

✔ A **sealed backbone**
✔ A **controlled transformation layer**
✔ A **safe UI system**
✔ A **data-driven navigation system**

---
