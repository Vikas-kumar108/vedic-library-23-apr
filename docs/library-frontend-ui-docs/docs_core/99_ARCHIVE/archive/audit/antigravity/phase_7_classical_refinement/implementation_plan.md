# Phase 7: Classical Scripture Reading Interface Refinement

## Goal
Transform the reading interfaces (`Verse Page` and `Chapter Advanced View`) into a strictly classical, book-like experience inspired by Vedabase.io. Remove all "modern" artifacts (cards, grids, borders, dividers).

## Design Rules (Strict)

### 1. Macro Layout
*   **Width**: Max 720px–760px.
*   **Margins**: Large empty horizontal margins.
*   **Column**: Single centered column.
*   **Banned**: Sidebars, Cards, Grids, Boxed Sections, Divider Lines (`<hr>` or `border-b`).
*   **Rhythm**: Use whitespace for separation (large vertical gaps).

### 2. Typography & Colors
*   **Font**: Serif everywhere (`Crimson Pro`).
*   **Colors**:
    *   Bg: Warm Parchment (`#f9f5e3`).
    *   Text: Near-black (`#2b2218`).
    *   Sanskrit Highlight: Muted Devotional Red (`#a63410`).
*   **Links**: No blue. Underscore or hover change only.

### 3. Content Hierarchy (Verse Block)
1.  **Verse Number**: Large, Bold, Serif, Centered.
2.  **Sanskrit**: Centered, generous line-height.
3.  **IAST**: Italic, Centered, smaller.
4.  **Synonyms**:
    *   Header: "Synonyms" (Centered Bold).
    *   Body: Red Italic Sanskrit — Black English. Em-dashes. Semicolons.
5.  **Translation**:
    *   Header: "Translation" (Centered Bold).
    *   Body: Book-like prose.
6.  **Purport**:
    *   Header: "Purport" (Centered Bold).
    *   Body: Generous spacing.

### 4. Components
*   **ViewOptions**: Soft rounded rectangles, muted saffron tone (`#e6a75a` opacity), text-only. Placed ABOVE content.

## Execution Steps

### 1. Refactor `ViewOptions.tsx`
*   Remove borders. Use soft background colors.

### 2. Refactor `bg/[chapter]/[verse]/page.tsx`
*   Ensure max-width 720px.
*   Remove any partial borders.
*   Enforce vertical rhythm (mb-8, mb-10, etc.).

### 3. Refactor `bg/[chapter]/page.tsx`
*   **Advanced Mode**:
    *   Remove `divide-y`.
    *   Ensure pure vertical stacking with whitespace.
    *   Max-width 720px.
*   **Header**: Remove `border-b`.

### 4. Global Tweaks
*   Ensure root container constraint matches the reading width.
