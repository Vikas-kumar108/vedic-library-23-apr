# 📘 Phase 2 Overview – Multi-Ācārya Commentary Layer

Phase 2 builds directly on the stable foundation established in **Phase 1 (v1.0-pilot)**.

If Phase 1 was about **faithful reading**,  
Phase 2 is about **faithful comparison**.

This phase introduces **multiple ācārya commentaries** on the Bhagavad-gītā,
without compromising textual integrity, calm reading, or architectural discipline.

---

## 🎯 Core Purpose of Phase 2

The purpose of Phase 2 is to:

- Present **multiple traditional commentaries** on the same verse
- Keep each commentary **distinct, attributable, and unmixed**
- Allow readers to **compare perspectives respectfully**
- Preserve the primacy of the canonical text

Phase 2 is **not** about interpretation, argument, or synthesis.
It is about **presentation**, not conclusions.

---

## 🧱 What Phase 2 ADDS (Scope)

### 1. Multiple Ācārya Commentaries

For each Bhagavad-gītā verse, support commentaries from:

- Śrīla Prabhupāda (Gauḍīya)
- Śaṅkarācārya
- Rāmānujācārya
- Madhvācārya  
*(Expandable later)*

Each commentary:
- Is stored separately
- References the same UID (`bg.x.y`)
- Is clearly attributed (ācārya + sampradāya)
- Is never merged with other commentaries

---

### 2. Commentary Selection UI (Toggle-Based)

Introduce a **commentary selector** that allows:

- Selecting **one ācārya at a time**
- Switching commentaries without page reload
- Maintaining the same verse URL

Rules:
- No comparison charts
- No side-by-side debate UI
- One commentary visible at a time

---

### 3. Commentary Language Support

For each commentary:

- Original language (where applicable)
- English translation
- Hindi translation (AI-assisted, clearly marked)

Language rules from Phase 1 still apply:
- Canonical text unchanged
- Language is a presentation layer
- AI translations are tagged and reviewable

---

### 4. Commentary Metadata

Each commentary includes metadata such as:

- Ācārya name
- Sampradāya
- Source text (if known)
- Translation source
- Review status (for AI-assisted content)

Metadata is **displayed modestly**, not prominently.

---

## 🚫 What Phase 2 DOES NOT Include (Boundaries)

Phase 2 explicitly excludes:

❌ User accounts  
❌ Donations  
❌ Likes, votes, or reactions  
❌ AI-generated commentary  
❌ Automated synthesis or summaries  
❌ Educational courses  
❌ Search or indexing  
❌ Cross-text references  
❌ Community discussion  

If any of the above are added, Phase 2 is violated.

---

## 🧠 Architectural Rules (Must Be Obeyed)

1. **Canonical text remains untouched**
2. **Each commentary is a separate data layer**
3. **No commentary logic inside components**
4. **Frontend consumes unified data shape**
5. **Backend may be introduced, but frontend stays stable**
6. **UID remains the sole identifier**

---

## 🗃️ Data Model Implications

Phase 2 introduces:

- Commentary folders per ācārya
- Commentary loader logic
- Commentary selection state

It does **not** change:
- Canonical JSON schema
- Verse routing
- Language toggle logic

---

## 🌐 Backend Status in Phase 2

Backend introduction is **optional but allowed**.

Possible uses:
- Serve commentary data
- Abstract file loading
- Prepare for future scaling

Backend is still **read-only**.

No authentication enforcement.

---

## 🧪 Phase 2 Success Criteria

Phase 2 is considered complete when:

- A verse supports multiple ācārya commentaries
- Commentary switching is stable
- Attribution is clear
- Reading remains calm and uncluttered
- Phase 1 functionality remains unchanged

---

## 🟢 Phase 2 Exit Condition

Phase 2 is complete only when:

> A reader can read **the same verse**  
> through **different traditional lenses**  
> without confusion, pressure, or distraction.

---

## 🕉️ Guiding Principle for Phase 2

> **Śāstra is one.  
> Explanations are many.  
> Respect lies in keeping them distinct.**

Only after Phase 2 stability may the project proceed to Phase 3
(users, support, and participation).

---

**Phase 2 begins only after Phase 1 is honored and preserved.**

