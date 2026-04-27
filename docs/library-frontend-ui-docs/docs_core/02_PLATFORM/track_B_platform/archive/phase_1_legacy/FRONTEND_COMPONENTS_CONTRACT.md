# 🧩 Frontend Components Contract

This document defines the **component responsibility contract**
for the Vedic Library frontend.

It is **not phase-bound** and applies across all present and future phases.

This document provides the **exact React component implementations**
used in **Phase 1** of the Vedic Library frontend.

Scope:
- Bhagavad-gītā only
- Read-only
- English + Hindi
- No backend
- No auth
- No styling frameworks

All components are:
- Simple
- Stateless (except UI needs)
- Single-responsibility
- Safe for beginners

---

## 1. Component Philosophy (Read First)

Each component:
- Receives data via props
- Renders text only
- Contains no routing logic
- Contains no file loading
- Contains no AI logic

Data flows:
JSON → page.tsx → components

yaml
Copy code

---

## 2. Folder Structure

All components live in:

frontend/src/components/

vbnet
Copy code

Structure:

```text
components/
├── verse/
│   ├── Sloka.tsx
│   ├── Transliteration.tsx
│   ├── Synonyms.tsx
│   ├── Translation.tsx
│   └── Purport.tsx
│
└── language/
    └── LanguageToggle.tsx
3. Sloka.tsx
Displays Sanskrit verse in Devanāgarī.

tsx
Copy code
interface Props {
  text: string;
}

export default function Sloka({ text }: Props) {
  return (
    <p style={{ fontSize: "1.6rem", marginTop: "1.5rem" }}>
      {text}
    </p>
  );
}
4. Transliteration.tsx
Displays Roman transliteration (IAST).

tsx
Copy code
interface Props {
  text: string;
}

export default function Transliteration({ text }: Props) {
  return (
    <p style={{ fontStyle: "italic", marginTop: "0.75rem" }}>
      {text}
    </p>
  );
}
5. Synonyms.tsx
Displays word-by-word meanings.

tsx
Copy code
interface SynonymEntry {
  word: string;
  meaning: string;
}

interface Props {
  entries: SynonymEntry[];
}

export default function Synonyms({ entries }: Props) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <strong>Synonyms</strong>
      <ul>
        {entries.map((item, index) => (
          <li key={index}>
            <b>{item.word}</b> — {item.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}
6. Translation.tsx
Language-aware translation component.

tsx
Copy code
import { Language } from "@/lib/languages";

interface Props {
  text: {
    en: string;
    hi?: string;
  };
  language: Language;
}

export default function Translation({ text, language }: Props) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <strong>Translation</strong>
      <p>{text[language] ?? text.en}</p>
    </div>
  );
}
7. Purport.tsx
Language-aware purport component.

tsx
Copy code
import { Language } from "@/lib/languages";

interface Props {
  text: {
    en: string;
    hi?: string;
  };
  language: Language;
}

export default function Purport({ text, language }: Props) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <strong>Purport</strong>
      <p>{text[language] ?? text.en}</p>
    </div>
  );
}
8. LanguageToggle.tsx
Simple English ↔ Hindi switch.

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

⚠️ The following example is **illustrative only**.

Actual implementations must obtain data exclusively through the
approved loader abstraction (`loadVerse`) and must not inline data
or bypass architectural boundaries.


9. Example Usage in page.tsx
tsx
Copy code
"use client";

import { useState } from "react";
import { DEFAULT_LANGUAGE } from "@/lib/languages";
import LanguageToggle from "@/components/language/LanguageToggle";
import Sloka from "@/components/verse/Sloka";
import Transliteration from "@/components/verse/Transliteration";
import Synonyms from "@/components/verse/Synonyms";
import Translation from "@/components/verse/Translation";
import Purport from "@/components/verse/Purport";

export default function VersePage() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  const verse = {
    sloka: "धर्मक्षेत्रे कुरुक्षेत्रे...",
    iast: "dharma-kṣetre kuru-kṣetre...",
    synonyms: [
      { word: "dharma-kṣetre", meaning: "in the place of pilgrimage" }
    ],
    translation: {
      en: "Dhṛtarāṣṭra said...",
      hi: "धृतराष्ट्र ने कहा..."
    },
    purport: {
      en: "Bhagavad-gītā is the widely read...",
      hi: "भगवद्गीता व्यापक रूप से पढ़ी जाती है..."
    }
  };

  return (
    <main style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h1>Bhagavad-gītā 1.1</h1>

      <LanguageToggle language={language} onChange={setLanguage} />

      <Sloka text={verse.sloka} />
      <Transliteration text={verse.iast} />
      <Synonyms entries={verse.synonyms} />
      <Translation text={verse.translation} language={language} />
      <Purport text={verse.purport} language={language} />
    </main>
  );
}
10. What NOT to Add in Phase 1
❌ Styling frameworks
❌ Context API
❌ Redux
❌ API calls
❌ Auth logic
❌ Analytics

11. Phase 1 Component Exit Criteria
 Components are reusable

 No component loads data

 Language toggle works

 Sanskrit text untouched

 Code readable by beginner

🕉️ Guiding Principle
Components are vessels.
Data is the offering.
Rendering is the ritual.
