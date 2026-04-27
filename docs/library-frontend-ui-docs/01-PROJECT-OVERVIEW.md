# NIKHIL - Vedic Library Project Overview

## National Initiative for Knowledge Heritage of Indic Literature

### Vision
A unified, scholarly-grade digital platform to preserve, present, and propagate the entire Vedic corpus - from the Vedas to the Upanishads, Itihasas to Puranas, Sutras to Shastras - making ancient wisdom accessible to modern seekers across all age groups and backgrounds.

---

## Current State (v1.0 - Frontend Prototype)

### What Has Been Built
1. **3-Column Responsive Layout**
   - Left: Tree Navigation (Corpus Browser)
   - Center: Content Engine (Verse Viewer)
   - Right: Application Panel (Learning & Context)

2. **Tree Navigation**
   - Hierarchical corpus structure (Shruti → Smriti → Itihasa → etc.)
   - Expandable chapters with verse number grids
   - Visual icons per node type

3. **Content Engine (Purana Tilakam Style)**
   - Collapsible accordion sections
   - Multi-script support (Devanagari, Roman/IAST, Telugu)
   - Multi-language support (Sanskrit, Hindi, English, Telugu)
   - Commentary with Sampradaya selection (Gaudiya, Advaita, Madhva, Sri Vaishnava)
   - Word analysis tabs (Segmentation, Word-to-word, Prose Order, Prose Meaning)

4. **Application Panel**
   - Recitation/Discourse video section
   - Ask a Question feature
   - Related Verses
   - Courses with difficulty levels
   - Life Guidance topics
   - Seva Domains

5. **State Management**
   - Zustand store for global state
   - Filter system (age groups, categories, languages)

### What Is Currently Static/Mock
- Verse content is hardcoded sample data
- Tree structure is predefined in `data/vedic-corpus.ts`
- No database connection
- No user authentication
- No admin panel
- Buttons (Copy, Save, Share, Audio, Video) are UI-only

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16 | React Server Components, App Router |
| UI Components | shadcn/ui | Accessible, customizable components |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| State Management | Zustand | Lightweight global state |
| Fonts | Inter + Noto Serif | UI + Sanskrit/Devanagari support |
| Icons | Lucide React | Consistent iconography |

---

## Target Users

1. **Kids (6-12)** - Simplified stories, moral teachings
2. **Students (13-25)** - Academic study, exam preparation
3. **Professionals (26-55)** - Life application, daily wisdom
4. **Elders (55+)** - Deep study, spiritual practice

---

## Content Categories

- **Dharma** - Ethical principles
- **Vedanta** - Philosophy
- **Yoga** - Practice
- **Ayurveda** - Health sciences
- **Jyotisa** - Vedic astrology
- **Nyaya** - Logic & reasoning

---

## Next Steps (See Roadmap Document)

1. Database Integration (Supabase recommended)
2. Dynamic data loading from your JSON files
3. Admin Dashboard for content management
4. User authentication and personalization
5. Search functionality
6. Audio/Video integration
7. Scaling to full Vedic corpus (20 lakh+ texts)
