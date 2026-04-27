Data Ingestion Plan
Indian Knowledge Library
1. Objective

Define the exact procedure for ingesting a new śāstra into the system.

This ensures:

Structural consistency

Predictable rendering

Canonical integrity

2. Folder Creation Protocol

For a new text:

Example: Manusmṛti

Create:

data/smrti/dharma-sastra/dharma-smrtis/manu/

Inside:

meta.json
canonical/
derivative/
3. Meta Declaration

Define structural spine:

{
  "id": "manu",
  "title": "Manusmṛti",
  "type": "chaptered",
  "levels": ["chapter", "verse"],
  "chapterCount": 12
}
4. Canonical Content Format

Each verse stored as:

{
  "uid": "manu.02.015",
  "sanskrit": "...",
  "transliteration": "...",
  "pada": "...",
  "structuralIndex": {
    "chapter": 2,
    "verse": 15
  }
}

No translation here.

5. Derivative Content Format

Translations stored separately:

derivative/translations/en/02/015.json

Example:

{
  "uid": "manu.02.015",
  "translation": "...",
  "translator": "..."
}
6. Loader Workflow

When new text added:

Folder created

meta.json validated

Canonical files added

Corpus loader detects structure

Tree auto-updates

Routes auto-generate

No manual UI edits required.

7. Validation Checklist

Before ingestion complete:

UID format verified

No missing structural nodes

No duplicate verses

meta.json complete

Domain alignment correct

8. Long-Term Scalability

This structure allows:

AI alignment

Comparative engines

Cross-text mapping

Commentarial overlays

Pedagogical layers

End of Data Ingestion Plan.