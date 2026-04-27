# Scripture Engine Status
Date: 2026-03-07

## Overview

The Vedic Library Scripture Engine is now operational for Bhagavad-gītā verses.

The system successfully composes a verse from multiple layers of structured data.

Command used:

npm run vedic verse bg.1.1

## Working Layers

The following layers are now correctly loaded and rendered:

1. Canonical Verse
2. Synonyms
3. Translation
4. Exposition (Purport)
5. Traditional Commentaries
6. Commentary Translations

## Data Flow

CLI
→ verse UID (bg.1.1)
→ loadVerseComposition()
→ loadVerseIndex()
→ resolve scripture root
→ load canonical
→ load derivatives
→ load commentaries
→ render verse output

## Folder Structure

data/
└── itihasa
    └── mahabharata
        └── bhisma-parva
            └── bhagavad-gita
                ├── canonical
                ├── derivatives
                │   ├── synonyms
                │   ├── translations
                │   ├── exposition
                │   └── commentary
                └── index
                    └── verse

## Canonical Schema

Canonical verse structure:

{
  uid
  work
  location
  text.content
  transliteration.content
}

## Editorial Layers

Synonyms
Translations
Exposition

Each file references an editorial_unit_ref.

## Commentary Layers

Supported commentators currently:

- Śrīdhara Svāmī
- Madhvācārya
- Baladeva Vidyābhūṣaṇa

Structure:

derivatives/commentary/<author>/<language>

Example:

commentary/sridhara/sa/bg.1.1.sridhara.commentary.json
commentary/sridhara/en/bg.1.1.sridhara.translation.en.json