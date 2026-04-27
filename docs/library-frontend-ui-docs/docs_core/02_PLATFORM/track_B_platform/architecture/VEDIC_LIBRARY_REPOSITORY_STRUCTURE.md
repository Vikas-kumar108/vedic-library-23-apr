# VEDIC_LIBRARY_REPOSITORY_STRUCTURE.md
Vedic Library — Repository Structure

---

# 1. Purpose

This document describes the **overall repository structure** of the Vedic Library project.

It explains:

• major directories  
• their responsibilities  
• how code and documentation are organized  
• where new files should be added  

This ensures the repository remains **organized and scalable** as the platform evolves.

---

# 2. Repository Philosophy

The repository is structured around three major concerns:

1. **Platform Code**
2. **Canonical Data**
3. **Architectural Documentation**

These layers are kept separate to ensure clarity.

---

# 3. Top-Level Repository Structure

Example high-level structure:

vedic-library/ │ ├── frontend/ ├── docs_src/ ├── data/ ├── scripts/ └── README.md
---

# 4. frontend/

The **frontend directory** contains the Next.js application that powers the user interface.

frontend/
Primary technologies:

• Next.js (App Router)  
• React  
• TypeScript  
• Tailwind CSS  

---

## frontend/src/

Most application code lives inside:

frontend/src/
Structure example:

src/ ├── app/ ├── components/ ├── context/ ├── features/ ├── lib/ └── styles/
---

### src/app/

Defines **Next.js routing** and page structure.

Example:

app/ ├── layout.tsx ├── page.tsx └── library/ └── [canon]/ └── [chapter]/ └── [verse]/ └── page.tsx
This structure enables routes such as:

/library/bg/2/47
---

### src/components/

Contains reusable UI components.

Example:

components/ ├── layout/ ├── ui/ └── navigation/
Examples:

| Component | Purpose |
|----------|--------|
GlobalHeader | global site navigation |
LayoutShell | reading environment layout |
CorpusTree | scripture navigation tree |

---

### src/context/

Contains React context providers.

Example:

context/ └── ReadingModeContext.tsx
Responsible for managing:

• study mode  
• script mode  
• translation visibility  

---

### src/features/

Contains feature-specific modules.

Example:

features/ └── scripture/
This directory includes components and logic specific to scripture rendering.

---

### src/lib/

Contains shared utilities and configuration.

Example:

lib/ ├── corpus.structure.ts ├── constants.ts └── helpers.ts
Important file:

corpus.structure.ts
This file defines the **canonical metadata registry** for the corpus hierarchy.

---

### src/styles/

Contains global styles and design system definitions.

Example:

styles/ └── globals.css
---

# 5. docs_src/

This directory contains **architectural documentation** for the platform.

docs_src/
It includes:

• architecture documentation  
• development plans  
• design system documentation  
• platform roadmap  

Example structure:

docs_src/ └── track_B_platform/ ├── architecture/ ├── roadmap/ └── vision/
---

## docs_src/track_B_platform/

This directory documents the **Track B platform development phase**.

Subdirectories include:

| Directory | Purpose |
|----------|--------|
architecture | technical architecture documents |
roadmap | development roadmap |
vision | platform philosophy and design |

---

### architecture/

Contains technical architecture documents.

Examples:

FRONTEND_DATA_FLOW.md CANONICAL_DATA_MODEL.md VEDIC_LIBRARY_ARCHITECTURE_DIAGRAM.md VEDIC_LIBRARY_UI_COMPONENT_REGISTRY.md
These documents explain the system's internal structure.

---

### roadmap/

Contains development planning documents.

Example:

VEDIC_PLATFORM_ROADMAP_MASTER.md
This document describes the long-term development plan.

---

### vision/

Contains product philosophy and design documentation.

Examples:

VEDIC_LIBRARY_PRODUCT_VISION.md VEDIC_LIBRARY_DESIGN_SYSTEM.md
These define the conceptual goals of the platform.

---

# 6. data/

The **data directory** stores scripture content.

Example structure:

data/ └── bg/ ├── 1/ │ ├── 1.json │ ├── 2.json │ └── ...
Each JSON file contains a verse and its editorial layers.

Example:

bg/2/47.json
Data includes:

• Sanskrit verse  
• transliteration  
• synonyms  
• translation  
• commentary  

---

# 7. scripts/

The scripts directory contains utilities for working with the data.

Examples:

scripts/ ├── text_extractors/ ├── converters/ └── data_validators/
These scripts help:

• convert source texts  
• validate JSON structure  
• process canonical content

---

# 8. Configuration Files

Common configuration files exist at the root or inside the frontend directory.

Examples:

package.json tsconfig.json next.config.js
These configure:

• dependencies  
• TypeScript  
• Next.js behavior

---

# 9. Deployment

The platform is deployed using **Vercel**.

Deployment workflow:

git push → GitHub → Vercel → Production
Build command:

npm run build
---

# 10. Documentation Discipline

Every major architectural decision should be documented.

New documentation should be placed under:

docs_src/track_B_platform/
Documentation categories:

| Category | Purpose |
|--------|--------|
architecture | system design |
roadmap | development planning |
vision | platform philosophy |

---

# 11. Adding New Features

When adding a new feature:

1. Create feature folder inside `src/features`
2. Add UI components if needed
3. Update architecture documentation if necessary

Example:

features/ └── commentary/
---

# 12. Repository Evolution

As the platform grows, new directories may be introduced:

• backend/  
• api/  
• knowledge_graph/  

However the separation between:

• frontend code  
• canonical data  
• architecture documentation  

should remain consistent.

---

# 13. Guiding Principle

The repository structure exists to ensure that the project remains:

• understandable  
• maintainable  
• scalable  

Clear organization is essential for a project that aims to preserve and present
a large body of traditional knowledge.

---

# 14. Summary

The Vedic Library repository is organized into:

Frontend Application Canonical Data Architectural Documentation Development Utilities
This structure supports both:

• current development  
• long-term expansion of the platform.
