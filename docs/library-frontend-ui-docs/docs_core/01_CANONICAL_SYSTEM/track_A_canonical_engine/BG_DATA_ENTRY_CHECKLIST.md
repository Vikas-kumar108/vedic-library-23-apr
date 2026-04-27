# BG_DATA_ENTRY_CHECKLIST.md
Bhagavad-Gītā Data Entry Checklist

Track A — Dataset Construction Discipline

---

# 1. Purpose

This checklist ensures that every Bhagavad-gītā verse entered into the dataset is:

• complete  
• consistent  
• structurally correct  
• conceptually tagged  
• ready for knowledge graph integration  

It acts as a **quality control system** during dataset construction.

Before committing any verse entry, this checklist should be reviewed.

---

# 2. Verse Identification

Confirm that the verse has a correct identifier.

Checklist:

☐ UID is correct (example: bg.2.47) ☐ Chapter number is correct ☐ Verse number is correct ☐ File name matches UID
Example file:

corpus/bg/verses/bg.2.47.json
---

# 3. Sanskrit Text Verification

Ensure the canonical Sanskrit text is accurate.

Checklist:

☐ Devanāgarī text entered ☐ Text checked against reliable edition ☐ No OCR errors ☐ Punctuation preserved
Reliable sources should be used for verification.

---

# 4. Transliteration Layer

Checklist:

☐ IAST transliteration entered ☐ Diacritics correct ☐ Verse structure preserved
This supports Sanskrit study tools.

---

# 5. Word-by-Word Synonyms

Checklist:

☐ Sanskrit words separated correctly ☐ Meaning provided for each word ☐ Order follows verse structure
Example:

karmaṇi → in action eva → certainly adhikāraḥ → right
---

# 6. Translation Layer

Checklist:

☐ English translation entered ☐ Hindi translation added (if available) ☐ Translation reflects verse meaning ☐ Grammar reviewed
Translations must remain **faithful to the Sanskrit**.

---

# 7. Commentary References

Verify commentary availability.

Checklist:

☐ Commentary files exist for available commentators ☐ UID matches verse ☐ Commentary language recorded
Example:

corpus/bg/commentaries/shankara/bg.2.47.json
---

# 8. Concept Tagging

Concept tagging must follow:

BG_CONCEPT_TAGGING_GUIDELINES.md
Checklist:

☐ Concepts selected from registry ☐ 3–6 concept tags used ☐ Tags clearly supported by verse ☐ No speculative interpretation
Example:

karma dharma karma_yoga nishkama_karma
---

# 9. Relationship Integration

Confirm relationships are updated.

Checklist:

☐ verse_concepts.json updated ☐ verse_links.json updated (if cross references exist) ☐ concept_links.json checked
Example file:

corpus/bg/relationships/verse_concepts.json
---

# 10. Verse Cross References

Identify related verses.

Checklist:

☐ Related verses identified ☐ Cross references added ☐ Relationship file updated
Example:

bg.2.47 → bg.3.8 bg.2.47 → bg.3.19
---

# 11. Verse Analysis Document

Confirm analytical worksheet exists.

Checklist:

☐ Verse analysis created ☐ Stored in analysis folder
Example location:

corpus/bg/analysis/verse_analysis/bg.2.47.md
This analysis should follow:

BG_VERSE_ANALYSIS_TEMPLATE.md
---

# 12. Chapter Consistency Check

Verify that the verse aligns with chapter themes.

Checklist:

☐ Concept tags match chapter themes ☐ No contradictions with chapter analysis
Refer to:

BG_CHAPTER_ANALYSIS_FRAMEWORK.md
---

# 13. File Structure Validation

Ensure files are placed correctly.

Checklist:

☐ Verse file in verses folder ☐ Commentary files in commentary folders ☐ Analysis files in analysis folder ☐ Relationship files updated
Correct directory structure:

corpus/bg/
---

# 14. JSON Validation

Ensure the dataset file is valid JSON.

Checklist:

☐ JSON syntax valid ☐ No trailing commas ☐ All required fields present
This prevents runtime errors.

---

# 15. Metadata Check

Confirm metadata integrity.

Checklist:

☐ UID correct ☐ Chapter correct ☐ Verse number correct
This ensures reliable indexing.

---

# 16. Knowledge Graph Readiness

Confirm the verse integrates into the knowledge graph.

Checklist:

☐ Concept nodes exist ☐ Verse relationships created ☐ Cross references connected
This step ensures graph connectivity.

---

# 17. Final Quality Review

Before committing:

Checklist:

☐ Sanskrit verified ☐ Transliteration verified ☐ Translation reviewed ☐ Concepts confirmed ☐ Relationships updated
---

# 18. Version Control

After verification:

git add . git commit -m "Add dataset for bg.2.47" git push
Example commit message:

Add verse dataset bg.2.47 Add Shankara commentary Add concept tags Add cross references
---

# 19. Periodic Dataset Review

Every chapter should undergo periodic review.

Checklist:

☐ Verse dataset consistency ☐ Concept tagging consistency ☐ Commentary alignment
---

# 20. Final Principle

The dataset is not merely technical data.

It is the **structured preservation of sacred knowledge**.

Every verse entry should be handled with care, accuracy, and intellectual discipline.

What This Document Achieves
This checklist becomes the daily working tool during dataset construction.
It ensures that every verse passes through five quality layers:
Text accuracy
Concept tagging
Relationship mapping
Analysis documentation
Knowledge graph integration
Without such a checklist, large datasets quickly become inconsistent.

