# FEATURES IMPLEMENTATION – VEDIC LIBRARY

---

# 1. PURPOSE

This document defines how **each frontend feature is implemented** and connected to:

- State system
- API layer
- Database (future)

---

# 2. CORE PRINCIPLE

> Every UI element must be connected to real data or action.

---

# 3. FEATURE CATEGORIES

---

## 3.1 Content Features

- Navigation (Tree)
- Content display
- Tabs (shloka, translation, commentary)

---

## 3.2 Interaction Features

- Copy
- Save (bookmark)
- Share
- Ask question

---

## 3.3 Media Features

- Audio playback
- Video playback

---

## 3.4 Context Features

- Related verses
- Courses
- Guidance
- Seva domains

---

# 4. TREE NAVIGATION

---

## Feature

Click node → load content

---

## Implementation

```ts
onClick(node) {
  setCurrentNode(node.id)
  loadNode(node.id)
}

Connected To
* Store (state)
* API (/api/node/[id])


5. CONTENT DISPLAY

Source
const node = useAppStore(s => s.currentNode)

Behavior
* Render based on content_type
* Show relevant sections only


6. TAB SYSTEM

Feature
Switch between:
* Shloka
* Transliteration
* Synonyms
* Translation
* Commentary

Implementation
setActiveTab(tab)

Data Source
* NodeData (API response)


7. COMMENTARY SWITCHER

Feature
Switch sampradaya

Implementation
setActiveSampradaya(sampradaya)

Data Source
node.commentaries.filter(...)


8. COPY BUTTON

Feature
Copy verse text

Implementation
navigator.clipboard.writeText(text)

UX
* Show toast: "Copied"


9. SAVE (BOOKMARK)

Feature
Save verse

Implementation
POST /api/bookmark

Payload
{
  "user_id": "...",
  "node_id": "bg.1.1"
}

State Update
* Update bookmark list


10. SHARE BUTTON

Feature
Share verse link

Implementation
navigator.share({
  title,
  url
})

Fallback
* Copy link


11. ASK QUESTION

Feature
User asks question on verse

Implementation
POST /api/questions

Data
* question
* node_id


12. AUDIO FEATURE

Feature
Play recitation

Source
node.canonical.audio_url

Implementation
* HTML audio player
* Custom player (future)


13. VIDEO FEATURE

Feature
Watch discourse

Source
node.media.video_url


14. RELATED VERSES

Feature
Show related verses

Source
relations.related_verses

Interaction
onClick → loadNode(relatedId)


15. COURSES

Feature
Display relevant courses

Source
relations.courses


16. GUIDANCE

Feature
Life application topics

Source
relations.guidance


17. SEVA DOMAINS

Feature
Show domains of application

Source
relations.seva_domains


18. FILTER SYSTEM

Feature
Filter by:
* Age group
* Category
* Seva domain

Implementation
setFilters({...})

Affects
* Right panel
* Search
* Recommendations


19. SEARCH

Feature
Search verses

Implementation
GET /api/search?q=karma

Future
* Semantic search


20. NAVIGATION (NEXT / PREVIOUS)

Feature
Move between verses

Implementation
getNextNode(currentId)
getPrevNode(currentId)

Source
* corpus_tree ordering


21. BREADCRUMB

Feature
Show navigation path

Source
selectedPath


22. LOADING STATE

Feature
Show loading UI

Implementation
isLoading = true

UI
* Skeleton loader


23. ERROR STATE

Feature
Handle failures

UI
* Error message
* Retry button


24. STATE CONNECTION

All features must connect through:
useAppStore()


25. CURRENT VS TARGET

Current
❌ UI only

Target
UI → Store → API → Data → Store → UI


26. IMPLEMENTATION PRIORITY

Phase 1
* Tree → loadNode
* Content rendering

Phase 2
* Copy
* Bookmark
* Commentary switching

Phase 3
* Audio/video
* Related verses

Phase 4
* Search
* Questions


27. FINAL INSIGHT
Features are not isolated.
They are:
🌿 Expressions of the data system

When connected properly:
* UI becomes meaningful
* System becomes interactive
	•	Knowledge becomes usable
---

# ❤️ Why This Is Important for You

This document directly fulfills your request:

✔ “Each and every function must be workable”  
✔ “How does each UI element connect to system?”  
✔ “How does frontend become real?”  
