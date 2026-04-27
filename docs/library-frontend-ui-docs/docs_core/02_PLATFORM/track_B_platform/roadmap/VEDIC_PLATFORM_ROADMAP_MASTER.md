# VEDIC_PLATFORM_ROADMAP_MASTER.md
Vedic Library — Master Platform Development Roadmap

---

# 1. Purpose

This document defines the **long-term development roadmap** of the Vedic Library platform.

It organizes the platform evolution into structured phases and explains
how the project will grow from a **scripture reading interface**
into a **complete Vedic knowledge infrastructure**.

The roadmap integrates:

• architecture  
• frontend systems  
• canonical registry evolution  
• commentary infrastructure  
• education systems  
• community systems  

---

# 2. Platform Vision

The Vedic Library is designed to become a **civilizational knowledge platform**
for the study and exploration of the Vedic tradition.

The platform will eventually support:

• the entire Vedic corpus  
• multiple commentarial traditions  
• concept exploration  
• educational curricula  
• guided learning  
• community study systems  

The platform must remain **scholarly, stable, and respectful to canonical texts**.

---

# 3. Platform Pillars

The platform is organized around five primary domains.

Home Library Education Guidance Community
### Library

The scripture reading environment.

### Education

Structured learning paths and courses.

### Guidance

Life-stage guidance rooted in śāstra.

### Community

Study groups and collective learning.

### Home

The public entry point to the platform.

---

# 4. Development Phases

The platform evolves through major phases.

Phase A — Canonical Content Preparation Phase B — Scripture Rendering Engine Phase C — Canonical Metadata Registry Phase D — Commentary Infrastructure Phase E — Knowledge Graph Phase F — Education Platform Phase G — Community Platform
Each phase builds upon the previous one.

---

# 5. Phase A — Canonical Content Preparation

Goal:

Prepare structured scripture content.

Tasks:

• extract canonical text  
• structure verse JSON files  
• define canonical identifiers  
• verify Sanskrit integrity  
• validate editorial layers  

Outputs:

Verse JSON files Canonical identifiers Editorial layer separation
Status:

Completed for initial Bhagavad-gītā corpus.

---

# 6. Phase B — Scripture Rendering Engine

Goal:

Create a stable scripture reading environment.

Major components:

Next.js frontend Corpus navigation Verse rendering system Reading mode controls
Key systems:

| System | Purpose |
|------|--------|
| CorpusTree | canonical navigation |
| VerseDisplay | verse rendering |
| ReadingModeContext | study state |
| LayoutShell | reading environment |

Status:

Active.

---

# 7. Phase C — Canonical Metadata Registry

Goal:

Create a scalable structural registry for the Vedic corpus.

Current version:

Registry B (TypeScript metadata)
Future version:

Registry C (JSON canonical registry)
Capabilities:

• multi-text support  
• commentary compatibility mapping  
• curriculum eligibility flags  
• concept tagging  

Registry C will enable dynamic corpus expansion.

---

# 8. Phase D — Commentary Infrastructure

Goal:

Support multiple commentarial traditions.

Features:

• commentary database  
• commentary selector  
• multi-pane comparison  
• acharya metadata  

Example:

Verse → Prabhupāda commentary → Rāmānuja commentary → Madhva commentary
UI impact:

Right-side commentary pane.

---

# 9. Phase E — Knowledge Graph

Goal:

Connect concepts across the entire Vedic corpus.

Entities:

Verse Concept Commentary Acharya Educational Module
Capabilities:

• concept navigation  
• cross-text discovery  
• philosophical mapping  

Example:

karma-yoga ↕ bg.2.47 ↕ bg.3.7
This phase transforms the platform into a **knowledge exploration system**.

---

# 10. Phase F — Education Platform

Goal:

Provide structured Vedic education.

Systems:

• curriculum builder  
• guided study paths  
• concept explorer  
• lesson modules  

Example course:

Introduction to Karma Yoga
Connected elements:

• verses  
• concepts  
• commentary excerpts

---

# 11. Phase G — Guidance Platform

Goal:

Provide life guidance rooted in Vedic wisdom.

Topics may include:

• brahmacarya  
• gṛhastha life  
• leadership  
• dharma decision frameworks  

Content will be anchored in canonical scripture.

---

# 12. Phase H — Community Platform

Goal:

Enable collaborative learning.

Features:

• study groups  
• community discussions  
• temple network integration  
• live courses

Community systems must maintain a **scholarly tone**.

---

# 13. Platform Infrastructure Evolution

Backend systems will gradually be introduced.

Frontend (Next.js) │ ▼ Supabase / PostgreSQL │ ▼ Content Registry │ ▼ Knowledge Graph Layer
These systems must not break the frontend rendering architecture.

---

# 14. Immediate Development Priorities

Current focus areas:

1. Footer system
2. Library landing pages
3. Header improvements
4. Canonical metadata registry evolution
5. Commentary pane infrastructure
6. Homepage architecture
7. Education framework foundation

---

# 15. Long-Term Platform Vision

When complete, the Vedic Library will function as:

• a scripture reading platform  
• a philosophical knowledge graph  
• a structured educational system  
• a global community learning environment  

The platform will serve both:

• scholars  
• students  
• practitioners  
• general readers  

---

# 16. Final Principle

The Vedic Library must always remain **scripture-centered**.

Technology exists to illuminate śāstra, not replace it.

All future features must respect the integrity of the canonical texts.
