# VEDIC DESIGN SYSTEM (UI LANGUAGE)

---

# 1. DESIGN PHILOSOPHY

## 1.1 Core Idea

The interface must feel like:

> A sacred library, not a digital dashboard.

---

## 1.2 Emotional Goals

| Feeling    | Why                       |
| ---------- | ------------------------- |
| Calm       | Encourages deep reading   |
| Clarity    | Handles complex knowledge |
| Sacredness | Reflects Vedic origin     |
| Depth      | Supports exploration      |

---

## 1.3 Design Principles

### 1. Minimalism over decoration

Avoid clutter.

### 2. Typography-driven design

Text is primary, not graphics.

### 3. Hierarchy = Dharma

Clear structure reflects order.

### 4. Subtle beauty

Soft colors, gentle shadows.

---

# 2. COLOR SYSTEM

## 2.1 Base Palette

### Primary (Spiritual Warmth)

* Saffron Light: #F5E6C8
* Saffron Medium: #E8C27D
* Saffron Deep: #C6923A

---

### Backgrounds

* Main Background: #FAF7F0
* Card Background: #FFFFFF
* Secondary Background: #F3EFE6

---

### Text Colors

* Primary Text: #2C2C2C
* Secondary Text: #6B6B6B
* Muted Text: #9A9A9A

---

### Accent Colors

* Knowledge Blue: #3A6EA5
* Dharma Green: #5B8A72
* Alert/Highlight: #C94C4C

---

## 2.2 Usage Rules

* Backgrounds → soft beige/white
* Important actions → saffron
* Links → blue
* Avoid harsh contrast

---

# 3. TYPOGRAPHY SYSTEM

## 3.1 Font Pairing

### Sanskrit (Sacred Text)

* Serif font (e.g., Noto Serif, Sanskrit-compatible)

### UI / English

* Sans-serif (Inter, Geist)

---

## 3.2 Scale

| Element         | Size    |
| --------------- | ------- |
| Title           | 24–32px |
| Section Heading | 18–22px |
| Body Text       | 14–16px |
| Small Text      | 12px    |

---

## 3.3 Special Rules

* Sanskrit text → larger + more spacing
* Commentary → slightly smaller
* Line height → 1.6–1.8

---

# 4. SPACING SYSTEM

## 4.1 Base Unit

8px system

---

## 4.2 Spacing Scale

| Token | Value |
| ----- | ----- |
| xs    | 4px   |
| sm    | 8px   |
| md    | 16px  |
| lg    | 24px  |
| xl    | 32px  |

---

## 4.3 Usage

* Cards: padding md or lg
* Sections: margin lg or xl

---

# 5. COMPONENT STYLING RULES

---

## 5.1 Cards

* Background: white
* Border radius: 16px–24px
* Shadow: soft

```css id="card-style"
box-shadow: 0 2px 8px rgba(0,0,0,0.05);
```

---

## 5.2 Buttons

### Primary Button

* Background: saffron medium
* Text: dark

### Secondary Button

* Outline style

---

## 5.3 Tabs

* Active tab:

  * underline or soft background
* Smooth transitions

---

## 5.4 Tree Navigation

* Indentation-based hierarchy
* Minimal icons
* Hover highlight (light beige)

---

# 6. LAYOUT DESIGN

---

## 6.1 Three Column System

| Section | Width  |
| ------- | ------ |
| Left    | 20–25% |
| Center  | 50–60% |
| Right   | 20–25% |

---

## 6.2 Behavior

* Independent scroll
* Sticky top bar

---

## 6.3 Mobile

* Sidebar → drawer
* Right panel → bottom sheet

---

# 7. INTERACTION DESIGN

---

## 7.1 Hover

* Soft background highlight
* No aggressive animations

---

## 7.2 Transitions

* 150–250ms ease
* Smooth expand/collapse

---

## 7.3 Feedback

* Subtle color change
* No flashy effects

---

# 8. ICONOGRAPHY

---

## 8.1 Style

* Minimal line icons
* Avoid heavy visuals

---

## 8.2 Sources

* Lucide icons (already in your project)

---

# 9. CONTENT PRESENTATION

---

## 9.1 Verse Display

* Centered Sanskrit
* Generous spacing

---

## 9.2 Commentary

* Left-aligned
* Slight indentation

---

## 9.3 Synonyms

* Structured list format

---

# 10. ACCESSIBILITY

---

## 10.1 Requirements

* High contrast text
* Keyboard navigation
* ARIA labels

---

## 10.2 Fonts

* Readable at all sizes

---

# 11. DARK MODE (FUTURE)

---

## Colors

* Background: #1E1E1E
* Text: #EAEAEA
* Accent: muted saffron

---

# 12. DESIGN TOKENS (TAILWIND EXTENSION)

---

## Example

```ts id="tailwind-config"
theme: {
  extend: {
    colors: {
      saffron: "#E8C27D",
      background: "#FAF7F0"
    }
  }
}
```

---

# 13. FINAL DESIGN PRINCIPLE

The UI must disappear.

The user should feel:

> “I am reading knowledge, not using software.”

---
