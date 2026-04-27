# 🌐 Language Axis & UI State Contract

This document defines how **language is represented, constrained,
and rendered** in the Vedic Library UI.

It is **not phase-bound** and applies across all present and future phases.

This guide is **Phase 1–safe**:
- No backend
- No database
- No URL duplication
- No cookies required
- No user accounts

---

## 🎯 Goal of Language Toggle

By the end of this guide:

- One verse page supports **English and Hindi**
- Same URL (e.g. `/bg/2/13`)
- User can switch language instantly
- Canonical Sanskrit text never changes
- Only **extended layers** change by language

---

## 1. Language Design Principles (VERY IMPORTANT)

1. **Canonical text is language-independent**
   - Sanskrit śloka
   - Transliteration

2. **Only extended data changes by language**
   - Synonyms
   - Translation
   - Purport

3. **Language is UI state**
   - Not in URL
   - Not in UID
   - Not in JSON filenames used in routing

4. **Default language = English**



---

⚠️ Code examples in this document are **illustrative only**.

Actual implementations must respect current architectural boundaries
(e.g., server components, loader abstraction, read-only discipline).


## 2. Define Supported Languages

Create file:

frontend/src/lib/languages.ts

cpp
Copy code

```ts
export type Language = "en" | "hi";

export const DEFAULT_LANGUAGE: Language = "en";

export const SUPPORTED_LANGUAGES: Language[] = ["en", "hi"];
✔ This file defines all languages Phase 1 supports.

3. Create Language Toggle Component
Create file:

swift
Copy code
frontend/src/components/language/LanguageToggle.tsx
tsx
Copy code
"use client";

import { Language } from "@/lib/languages";

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageToggle({ language, onChange }: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button
        onClick={() => onChange("en")}
        disabled={language === "en"}
        style={{ marginRight: "0.5rem" }}
      >
        English
      </button>

      <button
        onClick={() => onChange("hi")}
        disabled={language === "hi"}
      >
        हिन्दी
      </button>
    </div>
  );
}
✔ This component:

Has no data knowledge

Controls only UI state

4. Manage Language State in Verse Page
Open:

css
Copy code
frontend/src/app/bg/[chapter]/[verse]/page.tsx
At the top, add:

tsx
Copy code
"use client";

import { useState } from "react";
import { Language, DEFAULT_LANGUAGE } from "@/lib/languages";
import LanguageToggle from "@/components/language/LanguageToggle";
Inside your component:

tsx
Copy code
const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
5. Pass Language to Components
Example usage:

tsx
Copy code
<LanguageToggle
  language={language}
  onChange={setLanguage}
/>
This must appear above translation & purport.

6. Language-Aware Data Selection
Assume you load extended data like this:

ts
Copy code
const translation = {
  en: "Dhṛtarāṣṭra said...",
  hi: "धृतराष्ट्र ने कहा..."
};

const purport = {
  en: "Bhagavad-gītā is the widely read...",
  hi: "भगवद्गीता व्यापक रूप से पढ़ी जाती है..."
};
Use language like this:

tsx
Copy code
<p>{translation[language]}</p>
<p>{purport[language]}</p>
✔ Sanskrit text remains unchanged.

7. Component-Level Language Handling
Translation Component Example
tsx
Copy code
interface Props {
  text: {
    en: string;
    hi?: string;
  };
  language: "en" | "hi";
}

export default function Translation({ text, language }: Props) {
  return <p>{text[language] ?? text.en}</p>;
}
✔ Hindi fallback to English if missing.

8. Synonyms Handling (Optional in Phase 1)
If Hindi synonyms exist:

tsx
Copy code
const synonyms = {
  en: [...],
  hi: [...]
};
Render:

tsx
Copy code
{synonyms[language]?.map(...)}
Else:

Hide Hindi synonyms

Or fallback to English

9. What Language Toggle MUST NOT Do
❌ Change URL
❌ Change UID
❌ Reload page
❌ Store language in JSON
❌ Modify canonical text

Language is presentation only.

10. Testing Checklist
Manually test:

BG 1.1 English → Hindi

BG 2.13 English → Hindi

Toggle multiple times

Refresh page (language resets to English)

✔ This is expected behavior in Phase 1.

11. Phase 1 Limitations (By Design)

The following limitations describe **current capabilities**, not changes
to the underlying language architecture.

Language not persisted

No cookies

No user preference

No SEO per language

These come in Phase 3+.

12. Future Enhancements (Do NOT implement now)
Persist language in localStorage

Persist language per user

URL-based language (/hi/bg/2/13)

Auto-detect browser language

🕉️ Guiding Principle
Language serves understanding.
Canonical text serves truth.
Never confuse the two.
