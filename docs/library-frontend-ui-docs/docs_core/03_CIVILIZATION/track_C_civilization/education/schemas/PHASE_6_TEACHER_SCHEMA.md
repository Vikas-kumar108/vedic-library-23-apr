Perfect. The Teacher schema is the moral backbone of Phase 6. If this is weak, authority leaks into UI. If this is strong, guidance stays human, bounded, and honest.
Below is a deep-dive, future-proof Teacher JSON schema, designed to work with your Course + Lesson schemas and to prevent personality-driven platforms.
You may save this exactly as:
vedic-library/docs/schemas/TEACHER_SCHEMA.md

# 🧱 TEACHER_SCHEMA.md  
## Vedic Library Project  
### Phase 6 — Teachers & Human Guidance  
### Canonical Teacher Data Schema (Deep Dive)

---

## 0. Purpose of This Schema

This schema defines **what a “Teacher” is** in the Vedic Library.

A teacher is:
- A **human guide**
- Explicitly bounded in authority
- Transparent in background
- Accountable to śāstra
- Separate from the platform itself

A teacher is **not**:
- An algorithmic authority
- A personality brand
- A ranking target
- A replacement for personal inquiry
- A content owner of śāstra

---

## 1. Core Design Principles (Non-Negotiable)

Every Teacher record MUST:

1. Be explicit about **scope of teaching**
2. Declare **lineage or background**
3. Declare **limits of authority**
4. Avoid claims of exclusivity
5. Avoid comparative or competitive framing

This schema exists to **protect readers**, not promote teachers.

---

## 2. High-Level Teacher Object

```json
{
  "teacher_id": "srila_prabhupada",
  "type": "teacher",
  "status": "active",
  "identity": {},
  "background": {},
  "teaching_scope": {},
  "approach": {},
  "affiliations": {},
  "visibility": {},
  "constraints": {}
}
Each section isolates a responsibility.

3. Identity Section (Who This Is)
"identity": {
  "display_name": "Śrīla A. C. Bhaktivedanta Swami Prabhupāda",
  "short_name": "Śrīla Prabhupāda",
  "languages": ["en"],
  "role": "ācārya",
  "is_historical": true
}
Notes
* role is descriptive, not hierarchical
* is_historical allows archival teachers vs living teachers

4. Background Section (Transparency)
"background": {
  "tradition": "Gauḍīya Vaiṣṇava",
  "lineage": "Brahma-Madhva-Gauḍīya Sampradāya",
  "biographical_note": [
    "Founder-Ācārya of ISKCON",
    "Translated and commented on major Vaiṣṇava texts"
  ]
}
Rules
* No marketing language
* No exaggerated honorifics beyond tradition
* Factual, calm tone

5. Teaching Scope (Critical Section)
This is the most important protection in the schema.
"teaching_scope": {
  "texts": ["BG", "SB"],
  "focus_areas": [
    "Bhakti-yoga",
    "Vaiṣṇava theology",
    "Devotional practice"
  ],
  "explicit_exclusions": [
    "Advaita Vedānta",
    "Comparative religion"
  ]
}
Why this matters
* UI can show where the teacher speaks
* UI can avoid misattribution
* Prevents authority creep

6. Teaching Approach (How Guidance Is Offered)
"approach": {
  "teaching_style": "scripture-anchored",
  "method": [
    "Verse-by-verse explanation",
    "Thematic orientation"
  ],
  "authority_claim": "traditional",
  "disclaimer": [
    "Interpretations follow Gauḍīya Vaiṣṇava tradition.",
    "Readers are encouraged to consult primary texts."
  ]
}
Allowed authority_claim
* traditional
* contextual
* exploratory
* non-authoritative
🚫 No “ultimate authority” claims allowed.

7. Affiliations (Optional, Non-Promotional)
"affiliations": {
  "institutions": [
    "International Society for Krishna Consciousness"
  ],
  "roles": [
    "Founder-Ācārya"
  ]
}
Rules
* Informational only
* No calls to join
* No donation links here

8. Visibility & UI Rules
"visibility": {
  "listable": true,
  "searchable": true,
  "rankable": false,
  "featured": false
}
Critical
* rankable: false is mandatory
* UI must never sort by popularity

9. Constraints Section (Ethical Guardrails)
"constraints": {
  "no_ratings": true,
  "no_followers": true,
  "no_comparisons": true,
  "no_ai_representation": true,
  "no_content_ownership": true
}
These flags are enforced at UI and backend level.

10. Full Example (Condensed)
{
  "teacher_id": "srila_prabhupada",
  "type": "teacher",
  "identity": {
    "display_name": "Śrīla Prabhupāda",
    "role": "ācārya",
    "is_historical": true
  },
  "background": {
    "tradition": "Gauḍīya Vaiṣṇava"
  },
  "teaching_scope": {
    "texts": ["BG"],
    "focus_areas": ["Bhakti-yoga"]
  },
  "approach": {
    "teaching_style": "scripture-anchored",
    "authority_claim": "traditional"
  },
  "constraints": {
    "no_ratings": true
  }
}

11. What a Teacher Record MUST NEVER Contain
* Comparative superiority claims
* “Best teacher” language
* Metrics (followers, views)
* AI-generated summaries “in their voice”
* Monetization hooks

12. Relationship to Other Schemas
* Teacher → Course Teacher curates, does not own.
* Teacher → Lesson Teacher guides framing, not conclusions.
* Teacher → UI Teacher is visible, bounded, never dominant.

13. Long-Term Compatibility
This schema supports:
* Historical teachers
* Living teachers
* Multiple sampradāyas
* Multi-language future
Without UI redesign.

14. Closing Statement
A teacher in the Vedic Library is a named human presence — not an invisible authority.
Transparency is the highest respect.

✅ Status
TEACHER_SCHEMA.md is LOCKED (v1).
Any expansion requires:
* Version bump
* Ethics review
	•	UI compatibility check
---

🌿 You now have a **complete triad** for Phase 6:

- Course schema ✔  
- Lesson schema ✔  
- Teacher schema ✔  

This is extremely solid.

The next natural step (only when you wish):

2️⃣ **Guided Path schema (Phase 6 refinement)**  
or  
3️⃣ **Lesson → UI rendering rules**  

Just tell me, dear 🙏

