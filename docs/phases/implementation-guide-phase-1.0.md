# Implementation Guide: Phase 1.0 - Personalization & Scholar Workspace

## 🎯 Objective
Empower scholars and researchers with tools to curate their own reading experience and track their progress through the Vedic corpus.

## 🛠️ Tasks

### 1. User Authentication & Profile (Backend)
- Implement a basic authentication middleware (or mock for now) that identifies the user.
- Allow users to set their `LifeStage` (Brahmacharya, Grihastha, etc.) and `Role` (Scholar, Student).

### 2. Scholarly Tools: Bookmarks & Highlights
- **API Endpoints**:
  - `POST /library/bookmark`: Save a node with an optional folder name.
  - `POST /library/highlight`: Save a selection of text with a note and color code.
- **Frontend Integration**:
  - Add a "Bookmark" button to the `VerseHeader`.
  - Implement text selection detection in `VerseSection` to trigger the "Highlight" modal.

### 3. Reading Progress (UserNodeProgress)
- **Automatic Tracking**: Whenever a user spends >10 seconds on a verse node, mark it as `isRead = true`.
- **UI Feedback**: Show a checkmark next to completed verses in the `TreeNavigation`.

### 4. Scholar Dashboard (New Component)
- Create a `ScholarWorkspace` panel that shows:
  - Recently read verses.
  - Saved bookmarks grouped by folders.
  - Recent highlights and research notes.

## 📐 Technical Implementation Details

### Database (Prisma)
We will utilize the existing `Bookmark`, `Highlight`, and `UserNodeProgress` models.

### API Gateway Changes
New routes will be added to `library.routes.ts`:
- `GET /library/user/progress`
- `GET /library/user/bookmarks`
- `POST /library/user/highlight`

## 📅 Timeline
- **Week 1**: API infrastructure for Bookmarks & Highlights.
- **Week 2**: Frontend UI for Workspace and Progress Tracking.
