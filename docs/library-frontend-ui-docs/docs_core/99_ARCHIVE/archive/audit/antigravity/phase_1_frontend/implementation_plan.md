# Phase 1: Frontend Design Implemenation Plan

## Goal
Transform the current basic prototype into a premium, immersive reading experience ("Phase 1"). This involves establishing a design system, building the missing navigation layers (Home, Table of Contents), and strictly purely frontend changes without modifying the backend `data/` structure.

## User Review Required
> [!IMPORTANT]
> **Data Constraint**: Strictly **not touching** the backend `data/` folder. All structural data (Chapter titles, summaries) will be hardcoded in a frontend `constants.ts` file.

## Proposed Changes

### 1. Foundation & Design System (`phase_1_frontend`)
- **Typography**: Integrate **Geist Sans** (UI) and **Crimson Pro** (Verse Text).
- **Theming**: Implement CSS Variables for a "Paper/Ink" and "Night Mode" aesthetic in `globals.css`.
- **Data Layer**: Create `src/lib/constants.ts` to bridge the gap of missing chapter index data in the backend.

### 2. Component Architecture
- **Header**: Glassmorphism semi-transparent sticky header.
- **ChapterCard**: Visual entry point for chapters on the home page.
- **VerseNavigation**: Floating previous/next controls.

### 3. Page Implementation
- **Landing Page (`/`)**: A proper entrance to the library with a hero section and chapter grid.
- **Chapter Detail (`/bg/[chapter]`)**: A new intermediate page letting users select a specific verse from a grid.
- **Verse Detail Update**: Refactor the existing verse page to use the new typography and layout system.

## Verification Plan
- Manual verification of the new visual flows.
- Ensure all 18 chapters are accessible from the home page.
- Verify responsive mobile layout.
