# MASTER FRONTEND ARCHITECTURE

## Vedic Knowledge System (VKOS)

---

# 1. INTRODUCTION

This system is not being designed as a conventional web application.

It is being designed as a **knowledge interface to a civilizational corpus** — a system that allows a user to:

* Navigate the entire Vedic corpus structurally
* Read canonical knowledge deeply
* Understand through commentary
* Apply knowledge in life
* Connect learning to community

This creates a fundamental shift:

> From “content consumption” → to “knowledge interaction”

---

# 2. THE CORE PROBLEM WE ARE SOLVING

Modern platforms suffer from several structural limitations:

### 1. Fragmentation

* Books are separate
* Courses are separate
* Guidance is separate

There is no unified system.

---

### 2. Linear Navigation

* Users move page-to-page
* No hierarchical understanding

But Vedic knowledge is **not linear**, it is **hierarchical and interconnected**

---

### 3. Lack of Context

* A verse is shown
* But its application is missing
* Its relationships are hidden

---

### 4. No Personalization

* Same content for a child and a leader
* No contextual filtering

---

# 3. THE SOLUTION: A THREE-AXIS SYSTEM

The entire frontend is designed around **three simultaneous axes**.

---

## AXIS 1: CANONICAL TREE (STRUCTURE)

This is derived from:

vedic_corpus_registry.json

It represents:

* Sruti
* Smrti
* Itihasa
* Purana
* Vedanga
* etc.

---

### Why this matters:

Vedic knowledge is inherently hierarchical.

So instead of:

* search-first interface

We build:

> **structure-first navigation**

---

### UX implication:

This becomes:
👉 **LEFT SIDEBAR TREE**

---

## AXIS 2: CONTENT ENGINE (KNOWLEDGE DISPLAY)

This is the **heart of the system**.

Each node (verse, sutra, text) is displayed with layers:

* Shloka
* Transliteration
* Synonyms
* Translation
* Commentary

---

### Why layered?

Because knowledge unfolds progressively.

If everything is shown at once:

* user gets overwhelmed

So we use:

> **tab-based layered revelation**

---

### UX implication:

This becomes:
👉 **CENTER CONTENT PANEL**

---

## AXIS 3: APPLICATION LAYER (LIVING KNOWLEDGE)

This is where your system becomes unique.

Each verse is not isolated.

It connects to:

* Courses (Education)
* Guidance (Life decisions)
* Seva domains (Community application)

---

### Why this matters:

Without application:

* knowledge remains theoretical

With application:

* knowledge becomes lived experience

---

### UX implication:

This becomes:
👉 **RIGHT PANEL**

---

# 4. THE THREE-COLUMN LAYOUT (CORE UX DECISION)

---

## WHY THREE COLUMNS?

Because user must never lose context.

| Column | Purpose                   |
| ------ | ------------------------- |
| Left   | Where am I in the corpus? |
| Center | What am I reading?        |
| Right  | How does this apply?      |

---

If you remove any one:

* Without left → user is lost
* Without center → no knowledge
* Without right → no application

---

## RESULT:

> This layout becomes the **permanent mental model of the system**

---

# 5. THE USER EXPERIENCE FLOW

Let’s walk through a real experience.

---

## STEP 1: Entry

User enters through:

* Tree navigation
* Search
* Course
* Guidance

---

## STEP 2: Selection

User selects a node (example: Bhagavad Gita 1.1)

---

## STEP 3: State Update

System updates:

* currentNode

---

## STEP 4: Content Load

Center shows:

* Sanskrit
* Tabs

---

## STEP 5: Context Expansion

Right panel shows:

* Related verses
* Courses
* Guidance

---

## RESULT:

User moves from:

> reading → understanding → applying

---

# 6. FILTER LAYER (PERSONALIZATION)

This sits above everything.

---

## Why filters are necessary:

A child and a leader should not see the same entry point.

---

## Filters include:

* Age group
* Category
* Seva domain

---

## What they affect:

* Recommendations
* Right panel
* Search

---

# 7. DESIGN PHILOSOPHY (IMPORTANT)

The interface must feel:

* Calm (not busy)
* Deep (not shallow)
* Sacred (not commercial)

---

## This leads to:

* Soft colors (saffron, beige)
* Serif Sanskrit
* Minimal UI noise

---

# 8. DATA FLOW (SIMPLIFIED)

User Action
→ State Update
→ Data Fetch
→ Store
→ UI Render

---

This ensures:

* Predictability
* Scalability
* Maintainability

---

# 9. SCALABILITY THINKING

You are working with:

* 20 lakh+ nodes
* Multi-language
* Multi-commentary

---

So system must support:

* Lazy loading
* Caching
* Modular services

---

# 10. FINAL INSIGHT

This system is not:

* A website
* A CMS
* A course platform

---

It is:

> A **Vedic Knowledge Operating Interface**

---

Where:

* Structure = Dharma
* Content = Śāstra
* Application = Life

---
