# Future Roadmap & Strategic Plans

### 1. AI-Powered Rasa Interpretation
- **Objective**: Use LLMs to analyze sutras and automatically map them to the 5 primary and 8 secondary Rasas defined in the `RASA_ENGINE_RULES`.
- **Implementation**: Ingest `text_embeddings` using `pgvector` and perform similarity search against tag keywords.

### 2. Personalized Learning Paths
- **Objective**: Activate the `learning_curves` and `user_curve_progress` tables.
- **Features**: Personalized "Syllabus" based on a user's `life_stage` and `guidance_level`.

### 3. Community Coordination & Mentorship
- **Objective**: Fully implement the `guidance_assignments` layer.
- **Features**: Dashboard for mentors to track student progress across various "Village Coordination" or "Gita Study" subjects.

### 4. Regional Script Expansion
- **Objective**: Extend the `@dharma/text-engine` to support Bengali, Tamil, and Oriya scripts as defined in the `script_enum`.

### 5. Semantic Search & Cross-Reference
- **Objective**: Enable cross-shastra references (e.g., linking a Gita verse to a specific Upanishadic concept using `node_relations`).

### 6. Interactive Rasa-Engine
- **Objective**: Build a UI component that adapts the reading experience (colors, typography, ambient sounds) based on the dominant Rasa of the current verse.
