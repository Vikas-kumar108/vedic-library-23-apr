🧠 SECOND PART (VERY IMPORTANT)
🔍 Components that INTERACT WITH DATA

You asked:

“Which UI components interact with data and should be marked?”

This is critical architecture clarity.

🧩 DATA-AWARE COMPONENTS (SMART)

These must be tracked & stabilized

🔴 CORE DATA FLOW COMPONENTS
1. content-engine.tsx ⭐ MOST IMPORTANT
TreeNode → useVerse → render sections

👉 This is your UI ↔ Data bridge

2. tree-navigation.tsx
User click → emits TreeNode

👉 Drives entire system

3. library-layout.tsx
Holds selected node
Connects navigation + content
📦 CONTENT CONSUMER COMPONENTS

These directly consume Verse

4. verse-section.tsx
Uses verse.text
5. translation-section.tsx
Uses verse.translations
6. meaning-section.tsx
Uses verse.meanings
7. commentary-section.tsx
Uses verse.commentaries

👉 Most complex data UI