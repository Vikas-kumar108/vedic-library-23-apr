# Commentary System Architecture

Each text may support:

- Multiple Sanskrit commentaries
- Translated commentaries
- AI-generated provisional translations
- Human-reviewed layers

Structure:

Verse
 ├── Canonical Text
 ├── Synonyms
 ├── Translation (layered)
 ├── Exposition (per author)
 └── Comparative Panel

Commentary Registry (future):

src/lib/commentary.registry.ts

Allows:

- Toggle between Acharyas
- Side-by-side comparison
- Comparative synthesis