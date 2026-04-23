# Architectural Vision: The Vedic Skills Platform

## 1. Introduction
The **Vedic Skills Platform** is an evolution of the Vedic Library into a holistic educational and community ecosystem. It aims to bridge the gap between ancient wisdom and modern application by providing structured learning paths, mentorship, and community-driven service.

## 2. The Four Pillars of the Ecosystem

### 🏛️ Pillar 1: The Library (Knowledge Base)
- **Status**: Core infrastructure complete.
- **Goal**: Expand from Bhagavad Gita and Kama Sutra to the full Vedic corpus (Sruti, Smriti, Puranas, etc.).
- **Key Feature**: Semantic search and tag-based discovery (e.g., finding all verses related to "Social Authority").

### 🎓 Pillar 2: Education (Structured Learning)
- **Concept**: Moving from "Reading" to "Learning."
- **Mechanism**: **Learning Curves**. These are curated paths that combine content from multiple shastras into a logical sequence.
- **Personalization**: Curves are targeted based on a user's `LifeStage` (e.g., a "Student Life" curve vs. a "Vanaprastha" curve).

### 🤝 Pillar 3: Guidance (Mentorship)
- **Concept**: Traditional Guru-Shishya parampara in a digital age.
- **Mechanism**: **Guidance Assignments**. Users can be assigned a Mentor, Teacher, or Coordinator.
- **Interaction**: **Guidance Sessions** allow for deep dives into specific topics, with structured notes and progress tracking.

### 🏘️ Pillar 4: Community Life (Social & Outreach)
- **Concept**: Translating knowledge into action.
- **Mechanism**: **Contribution Points** and **Village Outreach**.
- **Governance**: Using traditional roles like **Karta** or **Shakha Head** to coordinate local community efforts.

## 3. Data Integration Strategy
The platform utilizes a **unified relational schema** in PostgreSQL:
- **`nodes` & `texts`**: Content layer.
- **`tags`**: Semantic layer.
- **`users` & `statistics`**: Personalization layer.
- **`learning_curves` & `guidance_*`**: Educational & Mentorship layer.

## 4. User Experience (The "Scholar" Journey)
A researcher or scholar uses the platform as a **NIKHIL Knowledge OS**:
- They cross-reference verses across different traditions (Sampradayas).
- They highlight and bookmark complex sutras for their own research.
- They eventually become **Mentors** or **Teachers**, creating their own **Learning Curves** for the next generation.

## 5. Implementation Roadmap
- **Phase 1**: Core User & Progress Tracking.
- **Phase 2**: Learning Curve Engine.
- **Phase 3**: Guidance & Mentorship Portal.
- **Phase 4**: Community Coordination Tools.
