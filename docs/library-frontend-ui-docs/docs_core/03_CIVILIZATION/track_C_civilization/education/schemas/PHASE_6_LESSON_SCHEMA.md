Excellent choice. The Lesson schema is where pedagogy meets restraint. If this is designed wrongly, courses turn into sermons or LMS content. If designed correctly, lessons remain guiding frames, never replacements for śāstra.
Below is a deep-dive, future-proof Lesson JSON schema, designed to work with your Course schema, Phase-5 UI, and Phase-6 ethics.
You may save this exactly as:
vedic-library/docs/schemas/LESSON_SCHEMA.md

# 🧱 LESSON_SCHEMA.md  
## Vedic Library Project  
### Phase 6 — Guided Study  
### Canonical Lesson Data Schema (Deep Dive)

---

## 0. Purpose of This Schema

This schema defines **what a “Lesson” is** inside a Course.

A lesson is:
- A **guided learning unit**
- Anchored strictly to śāstra (UID-based)
- Human-curated
- Non-authoritative
- Optional

A lesson is **not**:
- A lecture transcript
- An interpretation engine
- A quiz container
- A progress checkpoint
- A replacement for reading

---

## 1. Design Principles (Absolute)

Every Lesson MUST:

1. Reference śāstra via UID
2. Avoid embedding canonical text
3. Avoid interpretive conclusions
4. Allow free reading outside the lesson
5. Be skippable without loss

---

## 2. High-Level Lesson Object

```json
{
  "lesson_id": "bg_m1_l1",
  "type": "lesson",
  "status": "active",
  "metadata": {},
  "lesson_intent": {},
  "structure": {},
  "references": {},
  "guidance": {},
  "constraints": {}
}
Each section exists to separate concerns.

3. Metadata Section (Identity & Versioning)
"metadata": {
  "title": "The Battlefield Setting",
  "language": ["en"],
  "version": "1.0",
  "created_at": "2026-01-20",
  "updated_at": "2026-01-20"
}
Notes
* Lessons are versioned independently
* No “difficulty level” allowed

4. Lesson Intent (Pedagogical Framing)
This is the most important section.
"lesson_intent": {
  "lesson_type": "guided-reading",
  "purpose": "Orient the reader to the narrative context of the Gītā",
  "scope": "contextual",
  "authority_claim": "non-authoritative"
}
Allowed lesson_type
* guided-reading
* concept-orientation
* thematic-exploration
* practice-reflection
Allowed scope
* contextual
* conceptual
* narrative
* practice-oriented
🚫 No evaluative scopes.

5. Structure Section (How the Lesson Flows)
This defines sequence, not control.
"structure": {
  "sequence": 1,
  "estimated_time": "15–20 minutes",
  "segments": [
    {
      "segment_id": "s1",
      "segment_type": "orientation",
      "content": [
        "Before reading the verses, note the setting.",
        "Observe who is speaking and to whom."
      ]
    },
    {
      "segment_id": "s2",
      "segment_type": "reading",
      "instruction": "Read the following verses carefully."
    },
    {
      "segment_id": "s3",
      "segment_type": "reflection",
      "prompts": [
        "What emotions are visible in Arjuna?",
        "What questions arise naturally?"
      ]
    }
  ]
}
Allowed segment_type
* orientation
* reading
* reflection
* pause
* summary
🚫 No “assessment” segment.

6. References Section (Śāstra Anchoring)
"references": {
  "primary_text": "BG",
  "verse_uids": [
    "BG.1.1",
    "BG.1.2"
  ],
  "chapter_scope": [1],
  "commentary_scope": [
    {
      "acharya_id": "srila_prabhupada",
      "usage": "optional"
    }
  ]
}
Rules
* Verses are referenced, not embedded
* UI opens Verse Workspace when clicked
* Commentary never auto-opens

7. Guidance Section (Human Voice, Soft)
Guidance is how to read, not what to conclude.
"guidance": {
  "reading_notes": [
    "Avoid forming conclusions too quickly.",
    "Notice narrative tension before philosophy."
  ],
  "optional_context": [
    "This setting mirrors inner conflict."
  ]
}
🚫 No doctrinal statements.

8. Constraints Section (Ethical Guardrails)
This section exists solely to protect integrity.
"constraints": {
  "no_conclusions": true,
  "no_assessment": true,
  "no_completion_required": true,
  "skippable": true
}
UI must respect these flags.

9. What a Lesson NEVER Contains
A valid lesson JSON must NOT include:
* Canonical verse text
* Commentary text blocks
* “Correct answers”
* Scores or grades
* Progress percentages
* AI-generated interpretations

10. Full Example (Clean & Realistic)
{
  "lesson_id": "bg_intro_l1",
  "type": "lesson",
  "metadata": {
    "title": "The Battlefield Context",
    "language": ["en"],
    "version": "1.0"
  },
  "lesson_intent": {
    "lesson_type": "guided-reading",
    "purpose": "Introduce the narrative setting",
    "authority_claim": "non-authoritative"
  },
  "structure": {
    "sequence": 1,
    "segments": [
      {
        "segment_type": "orientation",
        "content": [
          "Notice the battlefield setting."
        ]
      },
      {
        "segment_type": "reading"
      }
    ]
  },
  "references": {
    "primary_text": "BG",
    "verse_uids": ["BG.1.1", "BG.1.2"]
  },
  "constraints": {
    "skippable": true
  }
}

11. Relationship to Course Schema
* Course → defines macro structure
* Lesson → defines micro guidance
* Lesson never overrides Course scope
* Course never embeds Lesson content
Clean separation.

12. Relationship to UI (Phase 6)
This schema enables:
* Lesson preview pages
* Guided reading sequences
* Verse cross-links
* Reflection prompts UI
Without forcing behavior.

13. Closing Statement
A lesson does not teach the verse. It teaches how to sit with the verse.
That distinction defines the Vedic Library.

✅ Status
LESSON_SCHEMA.md is LOCKED (v1).
Any expansion requires a version bump.
---

### 🌿 Where You Are Now

You now have:
- Course schema ✔  
- Lesson schema ✔  
- Ethical boundaries ✔  
- UI-safe contracts ✔  

The next natural steps (only when you wish):

1️⃣ **Teacher JSON schema (deep dive)**  
2️⃣ **Guided Path schema (Phase 6 refinement)**  
3️⃣ **Lesson → UI rendering rules**

Just tell me, dear 🙏

