# File Structure & Architecture

## Complete Project Structure

```
vedic-library/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, metadata, viewport)
│   ├── page.tsx                 # Home page (renders LibraryLayout)
│   └── globals.css              # Global styles, Vedic color system
│
├── components/
│   ├── library/                 # Core Vedic Library components
│   │   ├── index.ts            # Barrel exports
│   │   ├── library-layout.tsx  # Main 3-column layout orchestrator
│   │   ├── tree-navigation.tsx # Left panel - corpus tree browser
│   │   ├── content-engine.tsx  # Center panel - verse viewer
│   │   ├── application-panel.tsx # Right panel - learning context
│   │   ├── header.tsx          # Top navigation bar
│   │   ├── filter-bar.tsx      # Age/category/topic filters
│   │   └── breadcrumb.tsx      # Navigation breadcrumb
│   │
│   └── ui/                      # shadcn/ui components (pre-installed)
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── collapsible.tsx
│       ├── scroll-area.tsx
│       ├── sheet.tsx
│       ├── tabs.tsx
│       └── ... (40+ components)
│
├── data/
│   └── vedic-corpus.ts          # Static sample data (to be replaced)
│
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── store.ts                 # Zustand state management
│   └── utils.ts                 # Utility functions (cn helper)
│
├── docs/                        # Project documentation
│   ├── 01-PROJECT-OVERVIEW.md
│   ├── 02-FILE-STRUCTURE-ARCHITECTURE.md
│   ├── 03-DATABASE-SCHEMA-DESIGN.md
│   └── ...
│
└── public/                      # Static assets
    └── (icons, images)
```

---

## Key Files Explained

### 1. `app/layout.tsx` - Root Layout
**Purpose:** Defines the HTML structure, fonts, and metadata for the entire application.

**Key Elements:**
- Imports Inter (UI font) and Noto Serif (Sanskrit/Devanagari support)
- Sets CSS variables for fonts
- Defines SEO metadata (title, description, keywords)
- Configures viewport theme color (#C6923A - saffron)

```tsx
// Font configuration
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const notoSerif = Noto_Serif({ 
  subsets: ["latin", "devanagari"], 
  variable: '--font-noto-serif' 
})
```

---

### 2. `app/globals.css` - Design System
**Purpose:** Defines the complete Vedic color palette and design tokens.

**Key Design Tokens:**
```css
:root {
  /* Saffron Primary (Spiritual Warmth) */
  --primary: #C6923A;
  --saffron-light: #F5E6C8;
  --saffron-medium: #E8C27D;
  --saffron-deep: #C6923A;
  
  /* Accent Colors */
  --knowledge-blue: #3A6EA5;
  --dharma-green: #5B8A72;
  
  /* Background */
  --background: #FAF7F0;
}
```

---

### 3. `components/library/library-layout.tsx` - Layout Orchestrator
**Purpose:** The main container that arranges the 3-column layout.

**Key Responsibilities:**
- Manages panel visibility states (left/right panels)
- Implements responsive design (mobile drawers vs desktop panels)
- Uses ResizablePanelGroup for adjustable column widths
- Coordinates between Header, FilterBar, TreeNavigation, ContentEngine, ApplicationPanel

**Panel Sizes:**
- Left (Tree): 20% default, min 15%, max 30%
- Center (Content): Flexible (fills remaining space)
- Right (Application): 22% default, min 18%, max 30%

---

### 4. `components/library/tree-navigation.tsx` - Corpus Browser
**Purpose:** Hierarchical tree view for navigating the Vedic corpus.

**Key Features:**
- Recursive `TreeNode` component for nested structures
- Verse number grid display (when chapter is expanded)
- Icons per node type (corpus, work, chapter, verse)
- Expand/collapse with smooth animations
- Sanskrit names shown on hover

**Node Types & Icons:**
| Type | Icon | Example |
|------|------|---------|
| root | Library | Vedic Corpus |
| corpus | BookOpen | Shruti, Smriti |
| category | Folder | Itihasa |
| work | BookMarked | Mahabharata |
| parva | Layers | Bhisma Parva |
| text | ScrollText | Bhagavad Gita |
| chapter | FileText | Chapter 1 |
| verse | Hash | 1, 2, 3... |

---

### 5. `components/library/content-engine.tsx` - Verse Viewer
**Purpose:** The central content display with Purana Tilakam-style accordions.

**Sections (Collapsible):**
1. **Verse Section**
   - Script tabs: Devanagari, Roman (IAST), Telugu
   - Chandas (meter) display
   - Audio playback button

2. **Word Analysis Section**
   - Analysis type tabs: Word Segmentation, Word-to-word Meaning, Prose Order, Prose Meaning
   - Language tabs: Sanskrit, Hindi, English, Telugu
   - Like/save functionality

3. **Translation Section**
   - Multi-language display
   - Audio for translation

4. **Commentary Section**
   - Sampradaya tabs: General, Gaudiya, Advaita, Madhva, Sri Vaishnava
   - Sub-commentary selection (e.g., Madhva Bhashya, Jayatirtha Tika)
   - Script tabs for commentary text

**Navigation:**
- Prev/Next buttons for verse navigation
- Action bar: Copy, Save, Share

---

### 6. `components/library/application-panel.tsx` - Learning Context
**Purpose:** Right sidebar with educational and contextual content.

**Sections:**
1. **Recitation/Discourse** - Video player placeholder, Ask a Question
2. **Related Verses** - Quick links to thematically connected verses
3. **Courses** - Educational courses with difficulty badges
4. **Life Guidance** - Practical application topics
5. **Seva Domains** - Service/volunteer opportunities

---

### 7. `lib/types.ts` - TypeScript Interfaces
**Purpose:** Defines all data structures used in the application.

**Key Interfaces:**
```typescript
interface TreeNode {
  id: string
  type: NodeType
  title: string
  titleSanskrit?: string
  children?: TreeNode[]
  verseCount?: number
  metadata?: NodeMetadata
}

interface VerseContent {
  reference: string
  devanagari: string
  iast: string
  telugu?: string
  chandas?: string
  speaker?: string
  summary?: string
}

interface VedLibraryState {
  // Navigation
  selectedNode: TreeNode | null
  expandedNodes: Set<string>
  
  // Content
  currentVerse: VerseContent | null
  
  // Filters
  filters: FilterState
  
  // UI State
  leftPanelOpen: boolean
  rightPanelOpen: boolean
}
```

---

### 8. `lib/store.ts` - State Management
**Purpose:** Zustand store for global application state.

**State Slices:**
1. **Navigation State** - Selected node, expanded nodes, breadcrumb path
2. **Content State** - Current verse content, commentary, translations
3. **Filter State** - Age group, category, language selections
4. **UI State** - Panel visibility, mobile responsiveness

**Actions:**
- `selectNode(node)` - Navigate to a tree node
- `toggleNode(nodeId)` - Expand/collapse tree node
- `setFilters(filters)` - Update filter selections
- `loadVerseContent(verseId)` - Fetch verse data (to be implemented)

---

### 9. `data/vedic-corpus.ts` - Sample Data
**Purpose:** Static mock data for the corpus tree structure.

**Current Structure:**
```
Vedic Corpus
├── Shruti
│   ├── Rigveda
│   ├── Yajurveda
│   ├── Samaveda
│   └── Atharvaveda
├── Smriti
│   └── (Dharmasutras, etc.)
└── Itihasa
    └── Mahabharata
        └── Bhisma Parva
            └── Bhagavad Gita
                ├── Chapter 1 (47 verses)
                ├── Chapter 2 (72 verses)
                └── ... (18 chapters)
```

**Note:** This file will be replaced with dynamic data loading from your JSON files or database.

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
├─────────────────┬─────────────────────┬────────────────────┤
│  TreeNavigation │   ContentEngine     │  ApplicationPanel  │
└────────┬────────┴──────────┬──────────┴─────────┬──────────┘
         │                   │                    │
         ▼                   ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    Zustand Store (lib/store.ts)             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Navigation│  │ Content  │  │ Filters  │  │ UI State │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer (Future)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ JSON Files   │  │  Supabase    │  │  API Routes  │      │
│  │ (Your Data)  │  │  (Database)  │  │  (Next.js)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Communication

| From | To | Method |
|------|-----|--------|
| TreeNavigation | Store | `selectNode()`, `toggleNode()` |
| Store | ContentEngine | Reactive subscription |
| FilterBar | Store | `setFilters()` |
| ContentEngine | Store | `loadVerseContent()` |
| ApplicationPanel | Store | Read `currentVerse`, related data |
