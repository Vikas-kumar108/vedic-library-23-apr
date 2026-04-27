# DYNAMIC TREE SYSTEM – VEDIC LIBRARY

---

# 1. PURPOSE

This document defines how the **Tree Navigation system (left panel)** becomes dynamic, scalable, and data-driven.

---

# 2. PROBLEM

---

## 2.1 Current System

- Tree is hardcoded (`data/vedic-corpus.ts`)
- Entire structure loaded at once
- Not scalable

---

## 2.2 Limitations

- Cannot support 20 lakh nodes
- Requires manual updates
- Not connected to real data

---

# 3. CORE PRINCIPLE

> Tree must be generated from data, not hardcoded.

---

# 4. TREE ARCHITECTURE

---

## 4.1 Node Model

```ts
type TreeNode = {
  id: string
  name: string
  type: string
  hasChildren: boolean
  children?: TreeNode[]
}

4.2 Source of Truth
Current
* JSON file (vedic-corpus.ts)

Future
* Database (corpus_tree table)

5. LOADING STRATEGY

5.1 Do NOT load entire tree
❌ Bad:
load all nodes at once

5.2 Correct Approach
👉 Load only what is needed

5.3 Levels
Level	Example
Root	Shruti, Smriti
Level 1	Itihasa
Level 2	Mahabharata
Level 3	Bhisma Parva
Level 4	Bhagavad Gita
Level 5	Chapter
Level 6	Verses

6. API DESIGN FOR TREE

6.1 Endpoint
GET /api/tree

6.2 Lazy Loading Endpoint
GET /api/tree/[parentId]

6.3 Example
GET /api/tree/mahabharata

Response
[
  {
    "id": "bhisma-parva",
    "name": "Bhisma Parva",
    "hasChildren": true
  }
]

7. TREE LOADING FLOW

Step-by-Step
User opens app
   ↓
Load root nodes
   ↓
User expands node
   ↓
Fetch children via API
   ↓
Store children
   ↓
Render UI


8. FRONTEND IMPLEMENTATION

8.1 Initial Load
useEffect(() => {
  fetch('/api/tree')
}, [])

8.2 Expand Node
onExpand(nodeId) {
  fetch(`/api/tree/${nodeId}`)
}


9. STATE MANAGEMENT

Store Structure
tree: TreeNode[]
expandedNodes: Set<string>

Add Children
updateTree(nodeId, children)


10. PERFORMANCE STRATEGY

10.1 Lazy Loading
Only load expanded nodes

10.2 Caching
Do not re-fetch already loaded nodes

if (node.children) return

10.3 Virtualization (Future)
Use for large lists


11. DATABASE QUERY (FUTURE)

Using LTREE
SELECT * FROM corpus_tree
WHERE parent_id = $1
ORDER BY sort_order;


12. NODE TYPES HANDLING

Different types:
* corpus
* work
* chapter
* verse
* mantra
* sutra

UI Behavior
if (node.type === 'verse') {
  loadNode(node.id)
}


13. VERSE GRID SYSTEM

Current
* Hardcoded grid

Future
generate from verse_count


14. SCALING STRATEGY

20 LAKH NODES
Must use:
* Pagination
* Lazy loading
* Indexed queries


15. ERROR HANDLING

* Node not found
* Empty children
* API failure


16. FUTURE EXTENSIONS

* Search inside tree
* Favorites tree
* Recently viewed nodes
* AI navigation


17. FINAL INSIGHT
Tree is not UI.
It is:
🌿 Navigation Engine of Knowledge

If done correctly:
* Infinite scale
* Instant navigation
* Structured exploration

If done wrong:
* System collapse
	•	Performance issues
---

# ❤️ Why This Document Matters

This solves your earlier questions:

✔ “How will tree become dynamic?”  
✔ “How to scale beyond Bhagavad Gita?”  
✔ “How to handle 20 lakh nodes?”  
