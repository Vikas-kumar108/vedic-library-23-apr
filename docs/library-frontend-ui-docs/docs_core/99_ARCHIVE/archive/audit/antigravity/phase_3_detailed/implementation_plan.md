# Phase 3: Detailed Vedabase Replication Plan

## Goals
Faithfully recreate the Vedabase.io experience based on the specific "UI/UX Audit" provided by the user. The focus is on "Spiritual UX" — distraction-free, text-hero, temple-like atmosphere.

## Design Specs

### 1. Macro Layout
- **Structure**: Single-column, centralized.
- **Width**: ~760px for reading content.
- **Sidebar**: **REMOVE**. The audit explicitly states "No sidebars → distraction-free scripture reading".
- **Background**: Warm Parchment Beige.

### 2. Colors (Saffron & Ochre)
- **Header**: Warm Saffron / Light Ochre (darker than body).
- **Body**: Warm Parchment.
- **Text**: Deep Brown / Near Black.
- **Highlight**: Muted Red (for Sanskrit synonyms).

### 3. Components

#### [NEW] `TopBar.tsx` (Replaces Sidebar)
- **Container**: Full width, ~64px height.
- **Left**: "Bhaktivedanta VedaBase™" (Serif, Medium).
- **Center**: Library, Search, Support Us, Tools, Contact.
- **Right**: Settings, Language, User, Search Input (Rounded).

#### [MODIFY] `Breadcrumbs.tsx`
- Style: Smaller font, muted brown, inline chevrons (`»`).

#### [NEW] `ViewOptions.tsx`
- Buttons: "Default View", "Show in Advanced View", "Display Language View".
- Style: Soft rounded, light background, thin border.

### 4. Typography Rules (Verse Page)
- **Global**: Serif everywhere (`Crimson Pro`).
- **Verse Header**: "Bg. 1.1" (Large, Centered).
- **Sanskrit**: Devanagari, Medium weight, centered.
- **IAST**: Italic serif, centered.
- **Synonyms**:
    - Format: `sanskrit` (Red Italic) — `meaning` (Black);
    - Separator: Em dash (`—`).
- **Translation**:
    - "Narrator" style: **Start bold** ("Dhṛtarāṣṭra said:"), rest regular.
- **Purport**: Justified, 1.6-1.7 line height.

## Execution Steps
1.  **Global CSS**: Update variables to the exact Saffron/Ochre palette.
2.  **TopBar**: Build the new header.
3.  **Layout**: Switch `layout.tsx` from `Sidebar` to `TopBar`.
4.  **Verse Page**: Refactor the content rendering to match the typography rules strictly.

## Verification
- Check against the specific "Audit" list (e.g., Red Italic synonyms, Saffron header).
