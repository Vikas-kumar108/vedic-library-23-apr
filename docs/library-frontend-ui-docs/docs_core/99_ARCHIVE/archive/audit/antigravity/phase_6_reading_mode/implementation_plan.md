# Phase 6: Continuous Chapter Reading Mode

## Goal
Enable users to read an entire chapter continuously on the Chapter Page (`/bg/[chapter]`), rather than just seeing a grid of numbers.

## Requirements
1.  **Default View**: List of **Translations Only**.
    *   Design: Verse Number + Translation Text. Minimalist.
    *   Interaction: Clicking a verse goes to the detailed single-verse page.
2.  **Advanced View**: Link/Toggle to see "Whole chapter in advanced view".
    *   Design: Full text (Sanskrit, Synonyms, Translation, Purport) for every verse, stacked vertically.
    *   Note: The user specifically asked for "link to get to see the whole chapter in advance view".

## Implementation Strategy

### 1. Data Fetching (`bg/[chapter]/page.tsx`)
*   Currently, the page only has `CHAPTERS` metadata.
*   **Change**: We need to fetch *all* verses for the chapter server-side.
*   **Method**:
    *   Loop `1` to `verseCount`.
    *   Call `loadVerse(`bg.${chapterId}.${i}`)` for each.
    *   Use `Promise.all` for performance.

### 2. URL Strategy
*   We will use a Search Param: `?view=advanced`.
*   **Default**: `page.tsx` renders translation list.
*   **With Param**: `page.tsx` renders full verse cards.

### 3. UI Components
*   **ReadToggle**: A button in the Chapter Header: "Read Full Chapter" or "Advanced View".
*   **TranslationList**: The simple list view.
*   **AdvancedList**: The stacking full-detail view.

## Constraints
*   **Performance**: Fetching 70+ verses (Chapter 18) might be heavy but should be acceptable for SSG/ISR or even per-request on a fast file system.
*   **Design**: Maintain the "Parchment/Academic" aesthetic of Phase 4.
