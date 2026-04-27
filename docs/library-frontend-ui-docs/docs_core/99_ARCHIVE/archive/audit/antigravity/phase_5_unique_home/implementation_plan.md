# Phase 5: Unique Home Page "The Golden Portal"

## Goal
Transform the Home Page (`/`) from a simple list into a **"Best Style" unique presentation** of the Vedic Library. The internal pages will remain the "Reference/Study" design (Phase 3/4), but the Home Page will be the "Inspirational Entrance".

## Design Concept: "The Golden Portal"
*   **Aesthetic**: "Temple of Wisdom" meets "Modern Apple Design".
*   **Colors**: Deep Royal Saffron, Gold Foil gradients, Deep Brown voids.
*   **Texture**: Subtle paper grain + "Glowing Lamp" lighting effects.

## Proposed Features

### 1. Hero Section: "The Eternal Song"
*   **Visual**: Large, centered layout with a "Glowing" book or Sanskrit typography graphic.
*   **Typography**: Massive Serif display font (Crimson Pro Italic).
*   **Interaction**: Subtle float animation on scroll.

### 2. "Verse of the Moment"
*   A dedicated section showing a random or selected inspiring verse card that looks like a physical card resting on the page.

### 3. Interactive Chapter Mandala
*   Instead of a boring grid, a **"Masonry" or "Flowing" grid** of chapters.
*   **Cards**: Minimalist, high-end cards.
    *   *Hover*: The card glows gold and lifts slightly.
    *   *Content*: Sanskrit number, English title, subtle summary.

### 4. Footer "Offering"
*   A beautifully styled footer with "Vedic Library" branding in gold.

## Technical Changes

### Files to Modify
1.  `frontend/src/app/page.tsx`: Complete rewrite.
2.  `frontend/src/app/globals.css`: Add animation keyframes (fade-in, float) and "Gold" utility classes.
3.  `frontend/src/components/HomeHero.tsx` (New): Isolated hero component.
4.  `frontend/src/components/ChapterGrid.tsx` (New): Custom grid layout.

## Constraints
*   **DO NOT** break the internal pages (`/bg/...`).
*   **DO NOT** change the global `TopBar` (keep navigation consistent).
