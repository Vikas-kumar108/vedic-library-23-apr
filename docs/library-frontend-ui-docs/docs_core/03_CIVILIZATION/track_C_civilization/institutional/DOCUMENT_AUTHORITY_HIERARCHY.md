① DOCUMENT_AUTHORITY_HIERARCHY.md (FULL & FINAL)
This document is missing but absolutely necessary in a project of this scale. It prevents exactly the confusion you just encountered.
You should place this at:

docs/constitution/DOCUMENT_AUTHORITY_HIERARCHY.md
Below is a ready-to-save, final version.


# Document Authority Hierarchy
## Vedic Library Project

Authority is determined by document classification, lock status,
 and declared scope, not by usage frequency or convenience.
 
 ---

All authority within this hierarchy operates under the **Reference-Based Authority Principle** defined in **PROJECT_CONSTITUTION.md §11.3**.


## 0. Purpose (Normative)

This document defines the **binding authority order** of all documents
within the Vedic Library project.

It answers one critical question:

> **When multiple documents appear to conflict, which one governs?**

This hierarchy is **constitutional**, not advisory.
All contributors, tools, and future phases must conform to it.

---

## 1. Core Principle (Non-Negotiable)

> **Higher-authority documents constrain lower-authority documents.
Lower-authority documents may never override higher-authority ones.**

If a conflict exists:
- the lower document is considered **invalid**
- execution must stop until reconciliation occurs

---

## 2. Authority Tiers (Highest → Lowest)

### 🔴 Tier 1 — Constitutional Authority (Absolute)

**Location**
docs/constitution/

**Documents**
- `PROJECT_CONSTITUTION.md`
- `CANONICAL_IDENTITY_PRINCIPLES.md`
- `CANONICAL_IDENTITY_DECISION_FRAMEWORK.md`
- `CANONICAL_TEXT_POLICY.md`
- `DOCUMENT_AUTHORITY_HIERARCHY.md`

**Role**
- Defines *what the project is*
- Defines *what is forbidden*
- Defines immutability rules
- Defines identity philosophy

**Rules**
- Rarely changed
- Changes require explicit justification
- Applies across all phases

---

### 🟠 Tier 2 — Phase Status Authority (Locking Authority)

**Location**
docs/phases/phase-X/PHASE_X_STATUS.md

**Role**
- Declares a phase complete
- Locks scope and outcomes
- Prevents retroactive edits

**Rules**
- Written once
- Immutable
- Past tense only
- Overrides all plans and tasklists for that phase

---

### 🟡 Tier 3 — Phase Planning Authority (Intent)

**Location**
docs/phases/phase-X/

**Documents**
- `PHASE_X_MASTER_PLAN.md`
- `PHASE_X_CANONICAL_EXPANSION_PLAN.md`
- `PHASE_X_OVERVIEW.md`

**Role**
- Defines *what will be attempted*
- Constrained by Constitution and prior Status docs
- May evolve **until phase is locked**

**Rules**
- Cannot contradict Tier 1 or Tier 2
- Becomes historical once phase is closed

---

### 🟢 Tier 4 — Task & Execution Authority (Operational)

**Location**
docs/phases/phase-X/

**Documents**
- `PHASE_X_TASKLIST.md`
- `STEP_*.md`
- execution notes

**Role**
- Breaks plans into actionable steps
- Can be updated during execution

**Rules**
- Must never expand scope
- Must trace directly to a plan
- Invalidated once phase closes

---

### 🔵 Tier 5 — Architecture & Schema Authority (Technical Enforcement)

**Location**
docs/architecture/ docs/schemas/

**Role**
- Enforces how rules are implemented
- Converts philosophy into constraints
- Enables validation and tooling

**Rules**
- Must obey Constitution
- Must not redefine project intent
- May evolve carefully across phases

---

### ⚪ Tier 6 — Informational & Explanatory Documents

**Location**
docs/ui-ux/ docs/governance/ README files

**Role**
- Explains decisions
- Assists contributors
- Has no governing power

**Rules**
- Never authoritative
- Never used to resolve conflicts

---

## 3. Conflict Resolution Rule (Strict)

When two documents conflict:

1. Identify their authority tiers
2. The **higher tier automatically wins**
3. The lower-tier document must be:
   - corrected
   - archived
   - or deleted (if draft)

No discussion overrides this rule.

---

## 4. Status vs Plan Rule (Critical)

> **A STATUS document always outranks a PLAN document.**

Once a phase status is written:
- all plans become historical
- no plan may reopen scope
- no task may contradict the status

---

## 5. Archival Rule

Superseded or outdated documents must be moved to:

docs/_archive/

They must:
- remain readable
- never be cited as authoritative
- never be modified

---

## 6. Why This Hierarchy Exists

Without a hierarchy:
- plans conflict with outcomes
- execution leaks scope
- history becomes ambiguous
- contributors argue instead of building

With this hierarchy:
- identity remains stable
- phases close cleanly
- expansion is safe
- the corpus can scale indefinitely

---

## 7. Final Declaration

This hierarchy is **binding** across all phases, present and future.

Violating it is a structural error, not a stylistic choice.

---

**End of Document**
✅ This document should now be considered Tier-1 constitutional authority.

