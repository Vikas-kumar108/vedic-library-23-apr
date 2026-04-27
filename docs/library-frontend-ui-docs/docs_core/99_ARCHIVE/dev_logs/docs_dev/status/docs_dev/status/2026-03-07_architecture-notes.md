# Architecture Notes
Date: 2026-03-07

## Important Design Decisions

### 1. Index Driven Architecture

All verse loading is driven by:

index/verse/*.index.json

These files determine:

- editorial unit
- derivative availability
- commentary references

This prevents hard-coding and allows flexible scripture expansion.

### 2. No Hardcoded Scripture Paths

Scripture roots must always be resolved dynamically from index metadata.

Never hardcode paths such as:

data/.../bhagavad-gita

The loader should derive paths using:

index.work.corpus
index.work.text
index.work.section
index.work.subwork

### 3. UID Based System

UID examples:

bg.1.1

Future examples:

mbh.1.1
ram.1.1
manu.1.1

The system must remain UID-driven.

### 4. Derivative Naming Standard

All derivative files follow:

bg.1.1.prabhupada.translation.en.json
bg.1.1.prabhupada.synonyms.en.json
bg.1.1.prabhupada.exposition.en.json

Language is always included.

### 5. Commentary Structure

Commentaries are stored as:

commentary/<author>/<language>/

Example:

commentary/madhva/sa/
commentary/madhva/en/