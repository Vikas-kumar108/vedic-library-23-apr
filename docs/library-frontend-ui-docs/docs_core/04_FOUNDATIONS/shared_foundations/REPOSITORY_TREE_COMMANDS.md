# Vedic Library -- Tree Inspection Commands

These commands help inspect and audit repository structure during
development of the Vedic Library project.

------------------------------------------------------------------------

# 1. Basic Project Tree

Show the project structure up to 4 levels:

``` bash
tree -L 4
```

------------------------------------------------------------------------

# 2. Ignore Large System Folders

Useful when node_modules, venv, or build folders exist.

``` bash
tree -L 5 -I "venv|node_modules|.git|dist|build"
```

------------------------------------------------------------------------

# 3. Inspect the Data Corpus

View the structure of the corpus layer deeply:

``` bash
tree data -L 8
```

This is useful for verifying:

-   canonical verse files
-   derivative layers
-   commentary folders
-   translation language structure

------------------------------------------------------------------------

# 4. Inspect Raw Ingestion Layer

To inspect scraped or imported raw data:

``` bash
tree data/_raw -L 6
```

Useful for checking:

-   scraping pipelines
-   normalization results
-   ingestion sources

------------------------------------------------------------------------

# 5. Inspect Documentation Architecture

``` bash
tree docs_src -L 3
```

Helps verify:

-   Track A canonical engine
-   Track B platform
-   Track C civilization layer

------------------------------------------------------------------------

# 6. Inspect Frontend Architecture

``` bash
tree frontend/src -L 4
```

Useful for reviewing:

-   components
-   scripture loader
-   rendering system
-   UI modules

------------------------------------------------------------------------

# 7. Inspect Script Pipelines

``` bash
tree scripts -L 4
```

Used for reviewing:

-   ingestion pipelines
-   normalization scripts
-   canonical conversion
-   migration tools

------------------------------------------------------------------------

# 8. Export Structure to a File

Sometimes the tree output is large.

``` bash
tree -L 6 -I "venv|node_modules|.git|dist|build" > project_structure.txt
```

Then view:

``` bash
cat project_structure.txt
```

------------------------------------------------------------------------

# 9. Search for Specific File Types

Example: find all JSON files.

``` bash
find . -name "*.json"
```

Example: count JSON files.

``` bash
find . -name "*.json" | wc -l
```

------------------------------------------------------------------------

# 10. Inspect Only Directories

``` bash
tree -d -L 5
```

Useful for viewing architecture without files.

------------------------------------------------------------------------

# 11. Inspect a Specific Scripture Dataset

Example for Bhagavad‑Gītā:

``` bash
tree data/itihasa/mahabharata/bhisma-parva/bhagavad-gita -L 6
```

------------------------------------------------------------------------

# 12. Disk Usage of Data Corpus

``` bash
du -sh data/*
```

------------------------------------------------------------------------

# Recommended Use During Development

Typical audit sequence:

``` bash
tree -L 5 -I "venv|node_modules|.git"
tree data -L 8
tree docs_src -L 3
tree frontend/src -L 4
```

This provides a complete snapshot of:

-   repository architecture
-   canonical corpus structure
-   documentation state
-   platform implementation

------------------------------------------------------------------------

# Notes

These commands are useful for:

• canonical ingestion verification\
• debugging missing files\
• reviewing corpus structure\
• preparing architecture audits\
• sharing repository structure with collaborators

