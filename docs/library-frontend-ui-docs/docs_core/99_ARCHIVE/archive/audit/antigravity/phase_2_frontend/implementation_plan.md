# Phase 2: Vedabase-style Refinement Implementation Plan

## Goal
Refine the frontend interface to match the professional, academic, and accessible presentation of **vedabase.io**. This involves shifting from a purely artistic "Glassmorphism" style to a more structured, reference-library layout with persistent navigation (sidebars) and clear hierarchical breadcrumbs.

## User Requirements
- **Documentation First**: All plans must be documented before execution.
- **Aesthetic**: "Just like vedabase.io presentable" (Clean, Sidebar-driven, Academic).
- **Data Constraints**: Continue to NOT touch `data/` folders; use `constants.ts` for structure.

## Proposed Changes

### 1. Layout Architecture
Vedabase is characterized by its "Always Available" navigation. We will implement a **Sidebar Layout**.

#### [NEW] `frontend/src/components/Sidebar.tsx`
- **Desktop**: A persistent left sidebar listing all 18 Chapters.
- **Mobile**: A collapsible drawer/hamburger menu.
- **Active State**: Highlights the current chapter being viewed.
- **Function**: Allows jumping to any chapter instantly without going back to Home.

#### [MODIFY] `frontend/src/app/layout.tsx`
- Update the global layout to grid/flex structure: `[Sidebar] [Main Content]`.

### 2. Navigation Enhancements
#### [NEW] `frontend/src/components/Breadcrumbs.tsx`
- Display the path: `Home > Bhagavad-gītā > Chapter 1 > Verse 1`.
- Critical for the "Reference Library" feel.

#### [MODIFY] `frontend/src/components/VerseNavigation.tsx`
- Refine to fit the new more compact/structured layout.

### 3. Content Presentation (Verse View)
Refine the `page.tsx` for verses to look more "Canonical".

- **Typography**: Switch to a highly readable serif for body text (already done with Crimson Pro, but will tune line-heights and spacing).
- **Structure**:
    1.  **Devanagari**: Bold, centered.
    2.  **Transliteration**: Italic, centered.
    3.  **Synonyms**: Distinct "Word-Meaning" block.
    4.  **Translation**: Bold, distinct block.
    5.  **Purport**: Justified text, wider reading area.

### 4. Visual Style (The "Vedabase" Look)
- **Color Palette**: Shift slightly from "Warm Paper" to "Clean Academic" (White/Off-white background, high contrast text).
- **Sidebar**: Light grey background, list items.
- **Remove**: Excessive "Glass" effects in favor of solid, clean lines and borders.

## Execution Steps
1.  **Document**: Create this plan.
2.  **Sidebar**: Build the Sidebar component using `CHAPTERS` constant.
3.  **Layout**: Refactor `layout.tsx` to include the Sidebar.
4.  **Breadcrumbs**: Create and insert Breadcrumbs component.
5.  **Refine Verse**: Polish the verse detail page to match the strict Vedabase layout.

## Verification Plan
- **Visual Check**: Does it look like a reference site?
- **Navigation**: Can I switch chapters from the sidebar?
- **Mobile**: Does the sidebar collapse correctly?
