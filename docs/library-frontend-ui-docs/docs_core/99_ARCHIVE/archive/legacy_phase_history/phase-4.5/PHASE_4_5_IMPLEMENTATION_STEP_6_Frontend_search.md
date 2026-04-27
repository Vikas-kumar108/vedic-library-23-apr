Beautiful. Now we do the **frontend search UI** in a way that **respects every rule you locked**.

What I’ll give you below is:

* ✅ Simple, calm UI
* ✅ Scope-first (input disabled until scope selected)
* ✅ No auto-suggestions
* ✅ No ranking tricks
* ✅ Works with your FastAPI endpoints
* ✅ Idiomatic **Next.js + React**

I’ll assume:

* **Next.js (App Router)**
* **TypeScript**
* Backend running at `http://localhost:8000`

You can adapt paths easily.

---

# 🔍 Phase 4.5 – Frontend Search UI (Next.js)

## 1️⃣ Folder Structure (Frontend)

Inside your Next.js project:

```text
src/
├── components/
│   └── search/
│       ├── SearchDialog.tsx
│       ├── SearchScopeSelector.tsx
│       ├── SearchInput.tsx
│       └── SearchResults.tsx
├── lib/
│   └── searchApi.ts
└── app/
    └── layout.tsx
```

---

## 2️⃣ Search API Client

### `src/lib/searchApi.ts`

```ts
const API_BASE = "http://localhost:8000/api/search";

export async function searchReference(scope: string, ref: string) {
  const res = await fetch(
    `${API_BASE}/reference?scope=${scope}&ref=${encodeURIComponent(ref)}`
  );
  return res.json();
}

export async function searchPhrase(scope: string, q: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams({
    scope,
    q,
    ...params,
  }).toString();

  const endpoint =
    scope === "canonical"
      ? "phrase"
      : scope === "commentary"
      ? "commentary"
      : "education";

  const res = await fetch(`${API_BASE}/${endpoint}?${query}`);
  return res.json();
}
```

---

## 3️⃣ Scope Selector

### `components/search/SearchScopeSelector.tsx`

```tsx
type Scope = "canonical" | "commentary" | "education";

interface Props {
  scope: Scope | null;
  setScope: (s: Scope) => void;
  acharya: string;
  setAcharya: (a: string) => void;
}

export default function SearchScopeSelector({
  scope,
  setScope,
  acharya,
  setAcharya,
}: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p><strong>Search Scope</strong></p>

      <label>
        <input
          type="radio"
          checked={scope === "canonical"}
          onChange={() => setScope("canonical")}
        />
        Canonical Text (Śāstra)
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={scope === "commentary"}
          onChange={() => setScope("commentary")}
        />
        Commentary
      </label>

      {scope === "commentary" && (
        <div style={{ marginLeft: 20, marginTop: 6 }}>
          <select value={acharya} onChange={(e) => setAcharya(e.target.value)}>
            <option value="">Select ācārya</option>
            <option value="srila_prabhupada">Śrīla Prabhupāda</option>
          </select>
        </div>
      )}

      <br />

      <label>
        <input
          type="radio"
          checked={scope === "education"}
          onChange={() => setScope("education")}
        />
        Educational Content
      </label>
    </div>
  );
}
```

---

## 4️⃣ Search Input

### `components/search/SearchInput.tsx`

```tsx
interface Props {
  disabled: boolean;
  query: string;
  setQuery: (q: string) => void;
  placeholder: string;
}

export default function SearchInput({
  disabled,
  query,
  setQuery,
  placeholder,
}: Props) {
  return (
    <input
      type="text"
      value={query}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        width: "100%",
        padding: 8,
        fontSize: 16,
        opacity: disabled ? 0.5 : 1,
      }}
    />
  );
}
```

---

## 5️⃣ Results Renderer

### `components/search/SearchResults.tsx`

```tsx
interface Result {
  uid: string;
  reference?: string;
  title?: string;
  snippet: string;
  url: string;
}

export default function SearchResults({ results }: { results: Result[] }) {
  if (!results.length) {
    return <p>No results found.</p>;
  }

  return (
    <ul style={{ marginTop: 16 }}>
      {results.map((r) => (
        <li key={r.uid} style={{ marginBottom: 12 }}>
          <a href={r.url}>
            <strong>{r.reference || r.title}</strong>
          </a>
          <p style={{ fontSize: 14, color: "#555" }}>{r.snippet}</p>
        </li>
      ))}
    </ul>
  );
}
```

---

## 6️⃣ Main Search Dialog

### `components/search/SearchDialog.tsx`

```tsx
"use client";

import { useState } from "react";
import { searchReference, searchPhrase } from "@/lib/searchApi";
import SearchScopeSelector from "./SearchScopeSelector";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

type Scope = "canonical" | "commentary" | "education";

export default function SearchDialog() {
  const [scope, setScope] = useState<Scope | null>(null);
  const [acharya, setAcharya] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const placeholder =
    scope === "canonical"
      ? "Enter verse reference or exact phrase"
      : scope === "commentary"
      ? "Search within selected commentary"
      : scope === "education"
      ? "Search concepts or summaries"
      : "Select search scope first";

  async function handleSearch() {
    if (!scope || !query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      if (scope === "canonical" && /^\s*(bg\s*)?\d+(\.\d+)?/i.test(query)) {
        const res = await searchReference("canonical", query);
        if (res.status === "ok" && res.target) {
          window.location.href = res.target.url;
          return;
        }
      }

      const params =
        scope === "commentary" ? { acharya } : {};

      const res = await searchPhrase(scope, query, params);
      setResults(res.results || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <SearchScopeSelector
        scope={scope}
        setScope={setScope}
        acharya={acharya}
        setAcharya={setAcharya}
      />

      <SearchInput
        disabled={!scope || (scope === "commentary" && !acharya)}
        query={query}
        setQuery={setQuery}
        placeholder={placeholder}
      />

      <button
        onClick={handleSearch}
        disabled={!query || loading}
        style={{ marginTop: 10 }}
      >
        Search
      </button>

      {loading && <p>Searching…</p>}

      <SearchResults results={results} />
    </div>
  );
}
```

---

## 7️⃣ Use It Anywhere

Example: put it in a header or page.

```tsx
import SearchDialog from "@/components/search/SearchDialog";

export default function Page() {
  return (
    <main>
      <h1>Vedic Library</h1>
      <SearchDialog />
    </main>
  );
}
```

---

## 🧪 UX Validation Checklist (Do This Slowly)

* ⬜ Input disabled until scope selected
* ⬜ Commentary requires ācārya
* ⬜ Reference jumps directly
* ⬜ Phrase search returns lists
* ⬜ No auto-suggestions
* ⬜ No ranking language
* ⬜ Calm, quiet UI

If all pass → **Phase 4.5 UI is correct**.

---

## 🕉️ Where You Stand Now

You now have:

✔ Backend search (3 layers)
✔ OpenSearch indices
✔ Ingestion pipelines
✔ Frontend UI
✔ Scope discipline end-to-end

This is a **complete, dignified scholarly search system**.

---

### Next calm options (choose one):

1️⃣ Add **styling / accessibility polish**
2️⃣ Add **search tests & fixtures**
3️⃣ Pause and live with the system for a while

Just tell me the number, dear 🙏

