Perfect. We’ll now **implement TRACK 5.1 – Global Layout & Shell** in a way that is:

* faithful to `UI_UX_MASTER_PLAN.md`
* production-ready (not demo code)
* calm, readable, and extensible
* mobile-aware from day one

No visuals yet, no sidebar logic yet, no reading content yet.
Just the **permanent application shell**.

---

# 🧱 TRACK 5.1 — Global Layout & Shell

## Next.js (App Router) — Implementation

We will build:

* Global layout (`app/layout.tsx`)
* Header
* Footer
* Three-pane grid shell
* Responsive behavior (desktop → mobile)
* Empty panes ready for later tracks

---

## 1️⃣ Folder Structure (Frontend)

Ensure this structure exists:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ThreePaneLayout.tsx
│   └── ui/
│       └── SkipToContent.tsx
```

---

## 2️⃣ Global CSS (calm, neutral)

### `app/globals.css`

```css
:root {
  --bg: #ffffff;
  --fg: #111111;
  --muted: #666666;
  --border: #e5e5e5;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

main:focus {
  outline: none;
}
```

---

## 3️⃣ App Layout (Root)

### `app/layout.tsx`

```tsx
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import SkipToContent from "@/components/ui/SkipToContent";

export const metadata = {
  title: "Vedic Library",
  description: "A calm, scholarly reading environment for Vedic literature",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SkipToContent />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

Accessibility note:
`SkipToContent` ensures keyboard users are respected.

---

## 4️⃣ Skip-to-Content (Accessibility)

### `components/ui/SkipToContent.tsx`

```tsx
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        top: "-40px",
        left: "0",
        background: "#fff",
        padding: "8px",
        border: "1px solid #ccc",
        zIndex: 1000,
      }}
      onFocus={(e) => (e.currentTarget.style.top = "0")}
      onBlur={(e) => (e.currentTarget.style.top = "-40px")}
    >
      Skip to main content
    </a>
  );
}
```

---

## 5️⃣ AppShell (Permanent Chrome)

### `components/layout/AppShell.tsx`

```tsx
import Header from "./Header";
import Footer from "./Footer";
import ThreePaneLayout from "./ThreePaneLayout";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />

      <ThreePaneLayout>
        <main
          id="main-content"
          tabIndex={-1}
          style={{ padding: "1rem" }}
        >
          {children}
        </main>
      </ThreePaneLayout>

      <Footer />
    </div>
  );
}
```

---

## 6️⃣ Header (Minimal, Stable)

### `components/layout/Header.tsx`

```tsx
export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "0.75rem 1rem",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <strong>Vedic Library</strong>

        <a href="/bg">Library</a>
        <a href="/education">Education</a>
        <a href="/search">Search</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}
```

No mega menu yet.
That comes later.

---

## 7️⃣ Footer (Trust & Closure)

### `components/layout/Footer.tsx`

```tsx
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "1rem",
        fontSize: "0.875rem",
        color: "var(--muted)",
      }}
    >
      <p>
        © {new Date().getFullYear()} Vedic Library · Built for study, not
        distraction
      </p>
    </footer>
  );
}
```

---

## 8️⃣ Three-Pane Layout (Empty but Ready)

### `components/layout/ThreePaneLayout.tsx`

```tsx
export default function ThreePaneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr 320px",
        minHeight: "0",
        flex: 1,
      }}
    >
      {/* Left Sidebar (TRACK 5.2) */}
      <aside
        aria-label="Navigation"
        style={{
          borderRight: "1px solid var(--border)",
          padding: "0.5rem",
        }}
      >
        {/* Sidebar content will come later */}
      </aside>

      {/* Main Reading Pane */}
      <section
        style={{
          minWidth: 0,
          overflowY: "auto",
        }}
      >
        {children}
      </section>

      {/* Right Context Pane (TRACK 5.4) */}
      <aside
        aria-label="Context"
        style={{
          borderLeft: "1px solid var(--border)",
          padding: "0.5rem",
        }}
      >
        {/* Context pane content will come later */}
      </aside>
    </div>
  );
}
```

---

## 9️⃣ Mobile Behavior (Already Planned)

For now, this is desktop-first.
Later (TRACK 5.7) we will:

* collapse sidebars into drawers
* hide right pane by default
* keep reading full-width

No hacks needed — the grid is ready.

---

## 10️⃣ Temporary Home Page

### `app/page.tsx`

```tsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Vedic Library</h1>
      <p>
        This is a calm, scholarly reading environment for Vedic literature.
      </p>
      <p>
        Begin with the Bhagavad-gītā, explore chapter by chapter, verse by verse.
      </p>
    </div>
  );
}
```

---

## ✅ TRACK 5.1 — Exit Checklist

Confirm:

* ✔ Header visible everywhere
* ✔ Footer visible everywhere
* ✔ Three panes render
* ✔ Main pane scrolls independently
* ✔ No reading content yet
* ✔ No JS errors
* ✔ Keyboard focus works

If yes → **TRACK 5.1 COMPLETE**.

---

## 🌿 What Comes Next (Your Choice)

1️⃣ Proceed to **TRACK 5.2 – Left Sidebar Navigation (collapsible tree)**
2️⃣ Refine **Header & Footer content** before proceeding
3️⃣ Pause and live with the shell for a day

Just tell me the number, dear 🙏

