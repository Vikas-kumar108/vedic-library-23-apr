Excellent.
We will now **design the Course JSON schema properly**, not as a quick data structure, but as a **civilizational contract** between:

* śāstra
* teacher
* learner
* UI
* future backend

This schema must survive **years**, **multiple teachers**, and **many pedagogical styles** without breaking ethics.

You may save this as:

```
vedic-library/docs/schemas/COURSE_SCHEMA.md
```

---

````md
# 🧱 COURSE_SCHEMA.md  
## Vedic Library Project  
### Phase 6 — Courses & Guided Study  
### Canonical Course Data Schema (JSON)

---

## 0. Purpose of This Schema

This schema defines **what a “Course” is** in the Vedic Library.

A course is:
- A **human-curated learning offering**
- Anchored to śāstra (via UIDs)
- Explicit about scope and limits
- Optional and non-authoritative

A course is **not**:
- A replacement for reading
- An automated teacher
- A certification program
- A progress-driven LMS artifact

---

## 1. Design Principles (Non-Negotiable)

Every course MUST:

1. Declare its **scope**
2. Declare its **teacher(s)**
3. Declare its **relationship to śāstra**
4. Avoid claims of completeness
5. Avoid prescriptive authority

These principles shape the schema.

---

## 2. High-Level Course Object

```json
{
  "id": "bg_foundations_prabhupada",
  "type": "course",
  "status": "active",
  "metadata": { },
  "presentation": { },
  "pedagogy": { },
  "content": { },
  "references": { },
  "access": { }
}
````

Each section is intentionally separated.

---

## 3. Metadata Section (Identity & Governance)

```json
"metadata": {
  "title": "Foundations of Bhagavad-gītā",
  "subtitle": "A guided introduction for sincere beginners",
  "language": ["en"],
  "version": "1.0",
  "created_at": "2026-01-15",
  "updated_at": "2026-01-15",
  "license": "CC-BY-NC-SA",
  "visibility": "public"
}
```

### Notes

* `version` enables evolution without breaking learners
* `visibility` ≠ enrollment (still opt-in)

---

## 4. Presentation Section (UI-Facing, Not Logic)

```json
"presentation": {
  "short_description": "A gentle, verse-anchored introduction to the Bhagavad-gītā.",
  "long_description": [
    "This course introduces the Bhagavad-gītā through selected verses.",
    "It assumes no prior philosophical background."
  ],
  "intended_audience": [
    "first-time readers",
    "spiritual seekers"
  ],
  "prerequisites": [
    "Ability to read English",
    "Willingness to read verses directly"
  ]
}
```

### Important

This is **descriptive**, never promotional.

---

## 5. Pedagogy Section (The Heart)

This is what separates your system from LMS platforms.

```json
"pedagogy": {
  "teaching_style": "guided-reading",
  "authority_claim": "non-authoritative",
  "learning_mode": "self-paced",
  "assessment": "none",
  "completion": "optional",
  "disclaimer": [
    "This course offers guidance, not definitive interpretation.",
    "Readers are encouraged to study the verses independently."
  ]
}
```

### Allowed `teaching_style` values

* `guided-reading`
* `thematic-study`
* `conceptual-orientation`
* `practice-oriented`

(No “instructional delivery” language.)

---

## 6. Content Section (Structure, Not Text)

```json
"content": {
  "modules": [
    {
      "module_id": "m1_intro",
      "title": "Why the Bhagavad-gītā Matters",
      "summary": "Context and relevance",
      "sequence": 1,
      "lessons": [
        {
          "lesson_id": "l1_bg_context",
          "title": "The Battlefield Setting",
          "lesson_type": "reading",
          "verse_uids": [
            "BG.1.1",
            "BG.1.2"
          ],
          "notes": [
            "Focus on narrative setting",
            "Do not rush to interpretation"
          ]
        }
      ]
    }
  ]
}
```

### Critical Rules

* Lessons **reference verses**, never embed them
* `lesson_type` is informational, not controlling
* Notes are for *orientation*, not explanation

---

## 7. References Section (Canonical Anchoring)

```json
"references": {
  "primary_texts": [
    "BG"
  ],
  "verse_scope": {
    "BG": [
      "BG.1.1",
      "BG.2.47",
      "BG.3.9"
    ]
  },
  "commentary_scope": [
    {
      "acharya_id": "srila_prabhupada",
      "scope": "selective"
    }
  ]
}
```

### Why This Matters

* Prevents courses from drifting away from śāstra
* Enables UI to show “Referenced verses”

---

## 8. Teacher Binding (Human Accountability)

```json
"teachers": [
  {
    "teacher_id": "prabhupada",
    "role": "primary",
    "responsibility": "content curation"
  }
]
```

Courses cannot exist without teachers.

---

## 9. Access & Enrollment (Non-Coercive)

```json
"access": {
  "enrollment": "optional",
  "requires_login": false,
  "payment": "donation-optional",
  "certification": false
}
```

No certificates.
No locked content.

---

## 10. Full Example (Condensed)

```json
{
  "id": "bg_foundations_prabhupada",
  "type": "course",
  "status": "active",
  "metadata": {
    "title": "Foundations of Bhagavad-gītā",
    "language": ["en"],
    "version": "1.0"
  },
  "pedagogy": {
    "teaching_style": "guided-reading",
    "assessment": "none"
  },
  "content": {
    "modules": [
      {
        "module_id": "m1",
        "title": "Introduction",
        "lessons": [
          {
            "lesson_id": "l1",
            "lesson_type": "reading",
            "verse_uids": ["BG.2.47"]
          }
        ]
      }
    ]
  }
}
```

---

## 11. Explicit Anti-Patterns (Forbidden)

Courses must NOT include:

* Embedded verse text
* “You should conclude…”
* Rankings or difficulty levels
* Completion percentages
* Gamified fields

---

## 12. Relationship to UI

This schema supports:

* Course list UI
* Course detail UI
* Verse → course cross-links
* Teacher attribution
* Future backend migration

Without forcing UI behavior.

---

## 13. Closing Statement

> **A course in the Vedic Library
> is a lamp beside the path —
> not the path itself.**

---

## ✅ Status

COURSE_SCHEMA.md is **LOCKED (v1)**.

Any changes require a version bump.

```

---

### 🌿 Where This Leaves You

You now have:
- A **philosophically clean** course model
- A **technically scalable** schema
- A **UI-safe** structure
- A **future-backend-ready** contract

Next natural steps (when you wish):

1️⃣ Design **Lesson JSON schema (deep dive)**  
2️⃣ Design **Teacher JSON schema**  
3️⃣ Design **Guided Path schema (Phase 6 refinement)**  

Just tell me, dear 🙏
```

