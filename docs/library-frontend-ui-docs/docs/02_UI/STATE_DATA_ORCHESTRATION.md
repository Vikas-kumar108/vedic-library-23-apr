# STATE + DATA ORCHESTRATION LAYER

---

# 1. PURPOSE

## 1.1 Problem

Without orchestration:

* Components fetch data independently ❌
* State becomes inconsistent ❌
* Performance suffers ❌

---

## 1.2 Goal

Create a **single unified system** that:

* Controls all data flow
* Synchronizes UI state
* Prepares for backend scaling

---

## 1.3 Principle

> UI should NEVER control data.
> Data layer should drive UI.

---

# 2. STATE ARCHITECTURE

---

## 2.1 State Layers

| Layer        | Responsibility     |
| ------------ | ------------------ |
| Global State | App-wide data      |
| View State   | Current screen     |
| UI State     | Local interactions |

---

## 2.2 Global State Structure

```ts
type AppState = {
  currentNodeId: string | null

  language: string

  filters: {
    ageGroup?: string
    category?: string
    sevaDomain?: string
  }

  tree: TreeNode[]

  nodes: Record<string, Node>

  relations: Record<string, any>
}
```

---

# 3. STATE MANAGEMENT TOOL

---

## 3.1 Recommended: Zustand

Why:

* Lightweight
* No boilerplate
* Easy scaling

---

## 3.2 Store Setup

```ts
import { create } from "zustand"

export const useAppStore = create((set) => ({
  currentNodeId: null,
  language: "en",
  filters: {},

  setNode: (id) => set({ currentNodeId: id }),
  setLanguage: (lang) => set({ language: lang }),
  setFilters: (filters) => set({ filters })
}))
```

---

# 4. DATA LAYER

---

## 4.1 Data Sources

### Current

* JSON files in `/data`

### Future

* Supabase (PostgreSQL)

---

## 4.2 Data Services

All data access goes through services.

---

## `/services/node.service.ts`

```ts
export async function getNode(id: string) {
  const data = await fetch(`/data/nodes/${id}.json`)
  return data.json()
}
```

---

## `/services/tree.service.ts`

```ts
import registry from "@/data/vedic_corpus_registry.json"

export function getTree() {
  return registry
}
```

---

# 5. DATA FLOW

---

## 5.1 Node Selection Flow

1. User clicks tree node

2. Update state:
   setNode(id)

3. Trigger fetch:
   getNode(id)

4. Store data in state

5. UI re-renders

---

## 5.2 Flow Diagram

```text
Tree → setNode → fetchNode → store → render
```

---

# 6. STATE + COMPONENT CONNECTION

---

## 6.1 Tree Component

```ts
const setNode = useAppStore(state => state.setNode)

onClick={() => setNode(node.id)}
```

---

## 6.2 Content View

```ts
const nodeId = useAppStore(state => state.currentNodeId)
const node = useAppStore(state => state.nodes[nodeId])
```

---

## 6.3 Language

```ts
const language = useAppStore(state => state.language)
```

---

# 7. RELATIONS ENGINE

---

## 7.1 Purpose

Connect:

* Verse → Verse
* Verse → Course
* Verse → Guidance

---

## 7.2 Structure

```ts
relations: {
  [nodeId: string]: {
    related_verses: string[]
    courses: string[]
    guidance: string[]
  }
}
```

---

## 7.3 Usage

```ts
const related = relations[nodeId]?.related_verses
```

---

# 8. FILTER ENGINE

---

## 8.1 Purpose

Personalize content

---

## 8.2 Logic

Filters affect:

* Right panel
* Search results
* Recommendations

---

## 8.3 Example

```ts
function applyFilters(nodes, filters) {
  return nodes.filter(n =>
    (!filters.ageGroup || n.ageGroups.includes(filters.ageGroup)) &&
    (!filters.category || n.categories.includes(filters.category))
  )
}
```

---

# 9. CACHING STRATEGY

---

## 9.1 Why

Avoid repeated fetches

---

## 9.2 Strategy

```ts
if (!state.nodes[id]) {
  fetchNode(id)
}
```

---

## 9.3 Future

* React Query or SWR
* Redis cache

---

# 10. ASYNC DATA HANDLING

---

## 10.1 Loading States

* Show skeleton loader
* Avoid blank screen

---

## 10.2 Error Handling

* Fallback UI
* Retry option

---

# 11. ROUTING INTEGRATION

---

## 11.1 URL Structure

```bash
/library/[...slug]
```

---

## 11.2 Example

```bash
/library/itihasa/mahabharata/gita/1/1
```

---

## 11.3 Sync with State

On route change:

* update currentNodeId

---

# 12. FUTURE: SUPABASE INTEGRATION

---

## Replace service layer only

```ts
export async function getNode(id) {
  return supabase.from("nodes").select("*").eq("id", id)
}
```

---

## No UI change needed

---

# 13. PERFORMANCE STRATEGY

---

## Must implement:

* Lazy loading
* Memoization
* Virtualized tree

---

# 14. FINAL DATA FLOW SUMMARY

```text
User Action
   ↓
State Update
   ↓
Service Fetch
   ↓
Store Update
   ↓
UI Re-render
```

---

# 15. FINAL INSIGHT

This layer ensures:

* Stability
* Scalability
* Maintainability

---

Without this:

System = fragile

With this:

System = **living architecture**

---
