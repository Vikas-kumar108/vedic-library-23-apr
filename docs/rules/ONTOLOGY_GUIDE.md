# 🕉️ Vedic Institutional Ontology Guide

This document establishes the absolute standards for the representation of Vedic literature within the system. We reject English placeholders and embrace **Ontological Sovereignty** by rooting the system in original Sanskrit terminology.

## 📜 Core Laws

1.  **Zero English Placeholders**: Never use "Chapter", "Verse", or "Book" in core data or logic.
2.  **Original Levels**: Every content node must identify its structural level using the correct Sanskrit term (e.g., `adhyaya`, `shloka`).
3.  **Language Sensitivity**: The UI must derive display names from the level (e.g., "Adhyāya 1" or "अध्याय १") based on the user's language context.
4.  **Uniform Slugs**: Slugs must be compact, ASCII-compatible, and use `.` notation (e.g., `bg.adhyaya.1`, `bg.shloka.1.1`).

## 📚 Structure Mapping

| Shastra Family | Top Level | Middle Level | Unit Level |
| :--- | :--- | :--- | :--- |
| **Itihāsa (MB)** | Parva (पर्व) | Adhyāya (अध्याय) | Śloka (श्लोक) |
| **Itihāsa (RAM)** | Kāṇḍa (काण्ड) | Sarga (सर्ग) | Śloka (श्लोक) |
| **Purāṇa** | Skandha (स्कन्ध) | Adhyāya (अध्याय) | Śloka (श्लोक) |
| **Upanishad** | Adhyāya / Kāṇḍa | Section | Mantra (मन्त्र) |
| **Darśana (Sūtra)** | Adhyāya (अध्याय) | Pāda (पाद) | Sūtra (सूत्र) |
| **Āyurveda** | Sthāna (स्थान) | Adhyāya (अध्याय) | Śloka / Prose |

## 🧠 Commentary Layers

We recognize the layered nature of Shastric exposition:

*   **Mūla (मूल)**: The root text.
*   **Bhāṣya (भाष्य)**: Primary authoritative commentary.
*   **Vārttika (वार्तिक)**: Critical expansion/correction.
*   **Ṭīkā (टीका)**: Sub-commentary.
*   **Anuvāda (अनुवाद)**: Translation.
*   **Tātparya (तात्पर्य)**: Purport/Essential application.

## 🛠️ Developer Implementation

### Database (`nodes` table)
*   **`level`**: `adhyaya`, `shloka`, `mantra`, `sutra`, `parva`, `kanda`, `sarga`, `skandha`, `pada`.
*   **`slug`**: `shastra_slug.level_name.index` (e.g., `bg.shloka.1.1`).

### API/UI
*   Display logic must look up the `level` and apply the correct label in the target script (Latin with diacritics or Devanagari).
