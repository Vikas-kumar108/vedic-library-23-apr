📘 Vedic Library System — Architecture Documentation
🧭 Overview

This system is a data-driven scripture engine designed to:

Load structured Vedic texts (Bhagavad Gita currently)
Normalize multiple datasets
Provide a unified Verse schema
Render through a modular UI system
Support commentary, translations, and meanings
Scale to full Vedic corpus
🏗️ System Architecture (High-Level)
DATA (raw JSON)
   ↓
NORMALIZERS
   ↓
PROCESSED CORPUS
   ↓
REGISTRY
   ↓
RESOLVER
   ↓
HOOKS
   ↓
UI COMPONENTS
📂 Folder Breakdown
📁 /data — Source + Configuration Layer
Purpose:

Contains all raw data, configs, and navigation definitions

🔹 /data/gita-data (PRIMARY DATA SOURCE)
Type: ✅ CHANGEABLE (Data Layer)

Relational dataset:

File	Purpose
verse.json	Core Sanskrit + transliteration
translation.json	Multi-language translations
commentary.json	Multi-author commentary
authors.json	Author metadata
languages.json	Language definitions
chapters.json	Chapter metadata
🔹 /data/SrimadBhagvadGita
Type: ⚠️ Legacy / Optional
Chapter-wise JSON files
Not needed anymore (replaced by relational dataset)
🔹 /data/corpus
Purpose:

Builds final usable dataset

processed/gita.ts
Type: ⚠️ CRITICAL CORE FILE
Converts relational dataset → flat corpus
{
  "bg-2-v47": Verse,
  "bg-2-v48": Verse,
}

✔ MUST remain stable
✔ Only logic improvements allowed

gita.ts
Entry export for corpus
registry.ts
Type: 🔴 FIXED CORE
export const CORPUS_REGISTRY = {
  gita
}

👉 Central access point
👉 Resolver depends on this

🔹 /data/navigation
tree.ts
Builds navigation tree (chapters → verses)
Type: ⚠️ SHOULD BE REFACTORED

Currently:

Uses verse count ❌

Future:

Should use corpus keys ✅
🔹 /data/config
Purpose: UI + behavior configuration
File	Purpose
languages.ts	Language options
meaning-tabs.ts	Meaning UI tabs
sampradaya.ts	Commentary grouping
scripts.ts	Sanskrit/Latin handling
🔹 /data/tree/vedic-tree.ts
Root tree definition
Entry point for navigation
📁 /lib — Core Logic Layer
🔹 types.ts
Type: 🔴 MOST IMPORTANT FILE

Defines entire system schema

Core Types:
type Verse = {
  id: string
  reference: { chapter: number; verse: number }
  text: { sanskrit: string; transliteration: string }
  meanings: any[]
  translations: Record<string, string>
  commentaries: Commentary[]
}

👉 This is your universal contract

🔹 data-resolver.ts
Type: 🔴 CRITICAL ENGINE
Responsibility:
TreeNode → Meta → Corpus → Verse

Steps:

Validate node
Extract meta
Find corpus
Lookup verse
Normalize
Return Verse
🔹 /lib/normalizers
Purpose: Convert raw data → unified schema
gita-relational.ts
🔥 MOST IMPORTANT TRANSFORMATION FILE
Combines:
verse.json
translation.json
commentary.json

→ into:

Verse
verse.ts
Final normalization layer
Ensures consistency
gita.ts
Legacy normalizer (less important now)
🔹 /lib/hooks
use-verse.ts
Responsibility:
UI-safe wrapper for resolver
node → Verse

✔ Prevents crashes
✔ Filters non-verse nodes

🔹 store.ts
Type: ⚠️ GLOBAL STATE

Handles:

language
UI preferences
🔹 utils.ts

General utilities (formatting, helpers)

📁 /components — UI Layer
🧩 Architecture Pattern
Smart Components → consume data
Dumb Components → render UI
🔹 /components/library
🔥 MAIN FEATURE LAYER
library-layout.tsx
Type: 🧠 SMART ROOT
Layout manager
Holds:
tree
content
panels
content-engine.tsx
🔴 CORE UI ENGINE

Flow:

TreeNode → useVerse → render sections
tree-navigation.tsx
Type: 🧠 SMART
Emits selected node
Drives entire app
🔹 /components/library/content
🎯 DATA CONSUMERS

These are SMART PRESENTATION components

verse-section.tsx
Sanskrit + transliteration
translation-section.tsx
Language-aware translation
meaning-section.tsx
Synonyms / meanings
commentary-section.tsx
Multi-sampradaya commentary
Handles:
tabs
sub-commentaries
🔹 /components/molecules
collapsible-section.tsx
Type: 🧱 DUMB COMPONENT
UI wrapper
No business logic
🔹 /components/ui
Type: 🎨 PURE DUMB COMPONENTS
Buttons
Tabs
Cards
Inputs

👉 No data logic
👉 Fully reusable

🔹 /components/sections
UI composition blocks
🔹 theme-provider.tsx
Handles theming
📁 /app — Next.js Entry Layer
layout.tsx
Global layout
page.tsx
Entry page
Mounts library
globals.css
Global styles
📁 /hooks (root)

Utility hooks:

File	Purpose
use-mobile.ts	responsive logic
use-toast.ts	notifications
🧠 Data Flow (End-to-End)
User clicks verse
   ↓
tree-navigation
   ↓
ContentEngine
   ↓
useVerse()
   ↓
data-resolver
   ↓
CORPUS_REGISTRY
   ↓
Normalized Verse
   ↓
UI Sections render
📊 Schema Summary
🔹 TreeNode
{
  id: string
  type: 'chapter' | 'verse'
  meta: {
    corpus: 'gita'
    chapter: number
    verse: number
  }
}
🔹 Verse
{
  id: string
  reference: { chapter, verse }
  text: { sanskrit, transliteration }
  meanings: []
  translations: { en, hi, ... }
  commentaries: [
    {
      author
      sampradaya
      content
      subCommentaries
    }
  ]
}
🔒 What MUST NOT Change
File	Reason
types.ts	Core schema
data-resolver.ts	Engine
registry.ts	Corpus access
gita-relational.ts	Data integrity
🔄 What CAN Change
Area	Examples
UI components	styling, layout
config files	languages, tabs
normalizers	improvements
data	adding more verses
🚀 Future Improvements
1. Dynamic Tree Generation

Replace static verse count with:

Object.keys(corpus)
2. Sampradaya Mapping

Auto-detect from authors

3. Multi-Script Support

Sanskrit / Devanagari / IAST toggle

4. Multi-Corpus Support

Add:

Upanishads
Ramayana
Mahabharata
🧩 System Identity

This is not just a UI project.

It is:

A scalable Vedic Knowledge Engine

✅ Summary

You now have:

✔ Structured relational dataset
✔ Unified Verse schema
✔ Resolver engine
✔ Modular UI system
✔ 701 verses fully working