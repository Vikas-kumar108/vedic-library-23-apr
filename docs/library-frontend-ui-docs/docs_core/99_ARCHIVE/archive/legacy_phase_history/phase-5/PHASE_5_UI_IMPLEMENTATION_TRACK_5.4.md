Beautiful.
We now add the **Right Context Pane** — the most delicate part of the entire system.

This pane must **serve without intruding**.
If done wrong, it ruins reading.
If done right, it feels like a *silent assistant*.

We will implement it in **three strict layers**:

1. Pane shell & behavior (open / close)
2. Commentary layer (ācārya-controlled)
3. Education layer (concepts, glossary, chapter info)

No auto-opening. No assumptions.

---

# 🧱 TRACK 5.4 — Right Context Pane

## Commentary & Education (Reader-Invoked Only)

---

## 🎯 Objective

Build a **Right Context Pane** that:

* Is **closed by default**
* Opens only when reader requests
* Never overlaps main text
* Clearly separates:

  * Canonical text (center)
  * Commentary (right)
  * Education (right)

---

## 1️⃣ Update ThreePaneLayout (Make Right Pane Controllable)

### Modify

`components/layout/ThreePaneLayout.tsx`

We introduce **pane state**, but we do NOT manage content here.

```tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function ThreePaneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contextOpen, setContextOpen] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: contextOpen
          ? "260px 1fr 320px"
          : "260px 1fr 0px",
        transition: "grid-template-columns 0.2s ease",
        flex: 1,
      }}
    >
      {/* Left Sidebar */}
      <aside
        style={{
          borderRight: "1px solid var(--border)",
          overflowY: "auto",
        }}
      >
        <Sidebar />
      </aside>

      {/* Main Pane */}
      <section style={{ minWidth: 0 }}>{children}</section>

      {/* Right Context Pane */}
      <aside
        aria-label="Context"
        style={{
          borderLeft: contextOpen
            ? "1px solid var(--border)"
            : "none",
          overflowY: "auto",
          display: contextOpen ? "block" : "none",
        }}
      >
        {/* Context content injected later */}
      </aside>
    </div>
  );
}
```

⚠️ For now, we’ll open/close this pane **from inside the verse workspace**.

---

## 2️⃣ Context Toggle Control (Inside Verse Workspace)

We add **explicit reader controls**.

### Create

`components/context/ContextToggle.tsx`

```tsx
"use client";

export default function ContextToggle({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      style={{
        margin: "1rem 0",
        fontSize: "0.9rem",
      }}
    >
      {open ? "Hide Context" : "Show Commentary / Context"}
    </button>
  );
}
```

---

## 3️⃣ Wire Context State into VerseWorkspace

Update
`VerseWorkspace.tsx`

```tsx
import ContextToggle from "@/components/context/ContextToggle";
import ContextPane from "@/components/context/ContextPane";

export default function VerseWorkspace({ verse }: any) {
  const [contextOpen, setContextOpen] = useState(false);
  const [contextTab, setContextTab] = useState<
    "commentary" | "education"
  >("commentary");

  return (
    <article>
      <VerseHeader verse={verse} />

      <ContextToggle
        open={contextOpen}
        setOpen={setContextOpen}
      />

      {contextOpen && (
        <ContextPane
          verse={verse}
          tab={contextTab}
          setTab={setContextTab}
        />
      )}

      <VerseToggles ... />
      <VerseContent ... />
      <VerseNavigation ... />
    </article>
  );
}
```

📌 This ensures:

* Context is **reader-invoked**
* Context state is local to reading

---

## 4️⃣ Context Pane Container

### Create

`components/context/ContextPane.tsx`

```tsx
import CommentaryPanel from "./commentary/CommentaryPanel";
import EducationPanel from "./education/EducationPanel";

export default function ContextPane({
  verse,
  tab,
  setTab,
}: {
  verse: any;
  tab: "commentary" | "education";
  setTab: (t: "commentary" | "education") => void;
}) {
  return (
    <aside style={{ padding: "1rem" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setTab("commentary")}
          disabled={tab === "commentary"}
        >
          Commentary
        </button>{" "}
        <button
          onClick={() => setTab("education")}
          disabled={tab === "education"}
        >
          Education
        </button>
      </nav>

      {tab === "commentary" && <CommentaryPanel verse={verse} />}
      {tab === "education" && <EducationPanel verse={verse} />}
    </aside>
  );
}
```

---

## 5️⃣ Commentary Panel (Phase-Correct, Minimal)

### Create

`components/context/commentary/CommentaryPanel.tsx`

```tsx
"use client";

import { useState } from "react";

export default function CommentaryPanel({ verse }: any) {
  const [acharya, setAcharya] = useState("srila_prabhupada");

  return (
    <section>
      <h4>Commentary</h4>

      <label>
        Ācārya:{" "}
        <select
          value={acharya}
          onChange={(e) => setAcharya(e.target.value)}
        >
          <option value="srila_prabhupada">
            Śrīla Prabhupāda
          </option>
        </select>
      </label>

      <p style={{ marginTop: "1rem" }}>
        {/* Placeholder */}
        Commentary for {verse.chapter}.{verse.verse} by{" "}
        {acharya} will appear here.
      </p>
    </section>
  );
}
```

📌 Notes:

* No auto-fetch yet
* No mixing
* Clear attribution
* One ācārya at a time (expandable later)

---

## 6️⃣ Education Panel (Contextual, Not Global)

### Create

`components/context/education/EducationPanel.tsx`

```tsx
export default function EducationPanel({ verse }: any) {
  return (
    <section>
      <h4>Educational Context</h4>

      <ul>
        <li>Chapter Introduction</li>
        <li>Chapter Summary</li>
        <li>Related Concepts</li>
        <li>Glossary Terms</li>
        <li>Guided Reading Paths</li>
      </ul>

      <p style={{ marginTop: "1rem", color: "#666" }}>
        These resources are connected to Chapter{" "}
        {verse.chapter}.
      </p>
    </section>
  );
}
```

📌 This is **navigation scaffolding**, not content yet.

---

## 7️⃣ UX Rules (Enforced by Design)

You have now enforced:

* ❌ Context never opens automatically
* ❌ Context never overlays text
* ❌ Commentary never appears inline
* ❌ Education never interrupts

✔ Reader always chooses
✔ Text always central

This is **non-negotiable and correct**.

---

## ✅ TRACK 5.4 Exit Checklist

Verify manually:

* ⬜ Right pane closed by default
* ⬜ “Show Commentary / Context” opens it
* ⬜ Pane closes cleanly
* ⬜ Tabs switch without reload
* ⬜ No effect on main reading
* ⬜ Sidebar unaffected

If yes → **TRACK 5.4 COMPLETE (v1)**.

---

## 🌿 What Comes Next

You now have:

* Full reading workspace
* Context pane architecture
* Commentary & education entry points

### Next choices:

1️⃣ Proceed to **TRACK 5.5 – Chapter-Level Hub Pages**
2️⃣ Improve Context Pane (styling, persistence)
3️⃣ Pause and test real reading flow

Just tell me the number, dear 🙏

