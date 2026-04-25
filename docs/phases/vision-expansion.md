Vedic Skills Platform - Vision & Expansion Plan
🧭 The Vision
The Vedic Library is the foundational layer of a broader ecosystem: the Vedic Skills Platform. This platform transforms passive scripture reading into active, personalized learning and community-driven application.

The Four Pillars
Library (Foundational): The "NIKHIL Knowledge OS" — a massive, structured repository of Vedic texts.
Education (Structured): Personalized "Learning Curves" that guide users through the library based on their life stage and goals.
Guidance (Mentorship): Connecting students with mentors (Gurus/Teachers) to resolve doubts and receive personalized instruction.
Community Life (Application): Gamified outreach and service coordination, translating knowledge into "Contribution Points."
🛠️ Proposed Data Architecture Expansion
We will integrate the new schema provided by the USER into the existing Prisma architecture.

1. User & Personalization Layer
User: Expanded to include gender, life_stage, and guidance_level.
UserStatistics: Performance cache for tracking progress and "Contribution Points."
Bookmark & Highlight: Core tools for researchers and scholars.
2. Education Layer (Syllabus)
LearningCurve: A collection of structured steps (courses).
LearningCurveStep: Individual units of learning linked to specific Node (Library) content.
UserCurveProgress: Tracking enrollment and completion.
3. Guidance Layer (Mentorship)
GuidanceAssignment: Formalizing relationships between mentors (guides) and students.
GuidanceSession: Tracking interactions, topics discussed, and notes.
4. Access & Community
ContentAccessRule: Gating library content based on progress or role (e.g., advanced commentaries reserved for scholars).
Social Lineage: Integrating relationship_type_enum (Guru-Shishya, Pitara-Matara) to model traditional kinship and spiritual lineages.
🚀 Phased Roadmap
Phase 1: Infrastructure & User Layer
 Update schema.prisma with all new models.
 Implement User Profile management (Life Stage, Roles).
 Deploy Bookmark and Highlight API endpoints.
Phase 2: Learning Engine
 Implement LearningCurve management.
 Build the "Library to Step" linking logic.
 Create UI for tracking progress on the frontend.
Phase 3: Guidance & Mentorship
 Implement Mentor-Student assignment logic.
 Build the GuidanceSession tracking system.
 Add real-time guidance requesting features.
Phase 4: Community & Gamification
 Implement Contribution Points and outreach tracking.
 Build "Village Coordination" modules.
🎨 Creative Imagination: "The NIKHIL Knowledge OS Experience"
Imagine a user, a Grihastha (Householder), seeking guidance on "Domestic Dynamics."

Discovery: They browse the Library's Kama Sutra section, specifically tags like DOMESTIC_DYNAMICS.
Education: The system suggests a Learning Curve titled "Harmonious Household," which curated verses from the Gita, Manu Smriti, and Kama Sutra.
Guidance: As they study, they hit a complex sutra. They click "Ask a Mentor," which creates a Guidance Assignment with a senior teacher.
Community: After completing the curve, they earn Contribution Points and are invited to mentor others or participate in local community service.
📂 Documentation Plan
I will maintain the following structure in docs/phases/:

implementation-guide-phase-1.0.md
walkthrough-phase-1.0.md
architectural-vision.md