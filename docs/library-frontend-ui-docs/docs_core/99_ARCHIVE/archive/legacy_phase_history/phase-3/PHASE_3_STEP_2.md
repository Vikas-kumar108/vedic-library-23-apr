Excellent. This is a **sensitive step**, so we proceed **slowly, with boundaries already defined**.

Remember:
Phase 3 – Step 2 is **not “adding login”**.
It is **introducing identity gently**, without disturbing reading.

---

# 🪜 Phase 3 – Step 2

## Auth.js Integration (Identity Without Authority)

This step **introduces Auth.js**, but keeps it **contained, optional, and quiet**.

---

## 🎯 Goal of Step 2 (Very Clear)

By the end of **Phase 3 – Step 2**, you will have:

* Auth.js installed and configured
* One or two login methods working
* Sessions available to the app
* **No UI pressure**
* **No content gated**
* **No preferences persisted yet**
* **No backend dependency yet**

This step answers the question:

> “Can a user identify themselves without changing the nature of the library?”

---

## 🧱 Scope of Step 2 (STRICT)

### ✔ Allowed

* Auth.js setup
* Email / OAuth login
* Session availability
* Logout

### ❌ Not allowed (very important)

* No donations
* No preference saving
* No backend calls
* No database
* No admin UI
* No role-based behavior
* No login-required routes

If any of these appear → stop.

---

## 🧠 Step 2.1 – Install Auth.js in Frontend

From `frontend/` directory:

```bash
npm install next-auth
```

(If you are using pnpm or yarn, adapt accordingly.)

This is the **only dependency** added in this step.

---

## 📁 Step 2.2 – Create Auth Route (App Router)

Create:

```
frontend/src/app/api/auth/[...nextauth]/route.ts
```

This is the **only backend-like code in frontend**.

---

## 🔐 Step 2.3 – Minimal Auth.js Configuration

Inside `route.ts`:

```ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
```

Rules followed:

* No database
* JWT-based session
* OAuth only (email can be added later)

---

## 🔑 Step 2.4 – Environment Variables

Create (or update):

```
frontend/.env.local
```

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

GITHUB_ID=...
GITHUB_SECRET=...

GOOGLE_ID=...
GOOGLE_SECRET=...
```

⚠️ Never commit `.env.local`.

---

## 🧩 Step 2.5 – Wrap App with Session Provider

Edit:

```
frontend/src/app/layout.tsx
```

Add:

```tsx
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

This **exposes session context**, nothing more.

---

## 🪟 Step 2.6 – Add a Quiet Login Entry Point

Create a **minimal login component** (not placed prominently).

Example:

```
frontend/src/components/auth/LoginLink.tsx
```

```tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginLink() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button onClick={() => signIn()}>
        Sign in to support
      </button>
    );
  }

  return (
    <button onClick={() => signOut()}>
      Sign out
    </button>
  );
}
```

Rules:

* No “Login to continue”
* No modal popups
* No interrupting reading

Place this **outside reading flow** (e.g., footer).

---

## 🧪 Step 2.7 – Behavior Validation (Critical)

Test all combinations:

### Logged out

* Can read verses
* Can change language
* Can switch commentary
* No prompts appear

### Logged in

* Same behavior as logged out
* No extra content unlocked
* No UI hierarchy change

Ask yourself:

> “Does login feel optional and ignorable?”

If yes → correct.

---

## 🟢 Step 2 Exit Criteria (ALL REQUIRED)

You may declare **Phase 3 – Step 2 complete** only if:

* [ ] Auth.js installed and working
* [ ] OAuth login works
* [ ] Logout works
* [ ] Reading unchanged
* [ ] No content gated
* [ ] No backend dependency
* [ ] No preference persistence yet
* [ ] Auth boundaries respected

---

## 🕉️ Closing Reminder for Step 2

> **Identity is not engagement.
> Identity is responsibility.**

If the reader does not feel pushed to log in,
you have done this step correctly.

---

### When ready, say:

> **“Phase 3 – Step 2 complete.”**

Then we proceed to **Phase 3 – Step 3**:

### 👉 *User preference persistence (language & commentary)*

Slow, steady, disciplined — you are doing this right.

