# Commentary Ingestion Plan
Date: 2026-03-07

## Next Major Goal

Ingest additional Sanskrit commentaries from Gaudiya Mandira sources.

Expected sources include:

DOCX files containing full commentaries.

## Problem

Manual file creation would require thousands of files.

Example:

700 verses × 4 commentaries

≈ 2800 commentary files
≈ 2800 translation files

Manual creation is not feasible.

## Solution

Build an automated ingestion pipeline.

Pipeline steps:

DOCX commentary
→ parse text
→ detect verse numbers
→ split commentary blocks
→ generate JSON files
→ place files in commentary folders
→ update verse index automatically

## Required Tools

Python scripts for:

DOCX parsing
Verse segmentation
JSON generation
Index updating

## Output Files

commentary/<author>/sa/bg.X.Y.<author>.commentary.json

translation/<author>/<lang>/bg.X.Y.<author>.translation.<lang>.json