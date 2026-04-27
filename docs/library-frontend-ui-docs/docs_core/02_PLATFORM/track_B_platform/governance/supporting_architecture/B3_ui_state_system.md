# B3 — UI State System

---

## 1. Context Provider

ReadingModeContext.tsx

Controls:

- scriptMode ("devanagari" | "iast" | "both")
- showTranslation (boolean)
- studyMode ("devotional" | "scholarly" | "comparative")

---

## 2. Why Context?

Allows:

- Centralized control
- UI-driven re-rendering
- Future localStorage sync
- Future URL sync

---

## 3. Study Modes (Phase 1)

Devotional:
- Serif
- Spacious
- Immersive

Scholarly:
- Compact
- Analytical

Comparative:
- Balanced
- Structured

---

## 4. Future Expansion

Planned:

- Persist to localStorage
- URL sharing support
- Preset profiles
- Multi-pane comparative mode
