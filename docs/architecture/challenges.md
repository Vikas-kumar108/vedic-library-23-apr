# Implementation Challenges & Solutions

### 1. Recursive Data Exhaustion
**Challenge**: The original frontend attempted to load the entire `VEDIC_TREE` JSON in-memory, leading to system hangs and infinite recursion during rendering.
**Solution**: Offloaded the hierarchy to PostgreSQL using the `ltree` extension. Navigation is now lazy-loaded, and the tree is retrieved via a flat-to-nested transformation in the API Gateway.

### 2. Schema Synchronization (ORM vs. SQL)
**Challenge**: Maintaining a complex PostgreSQL schema (with custom enums and extensions) while keeping the Prisma ORM in sync.
**Solution**: Manual alignment of `schema.prisma` with canonical SQL definitions. Used `@@map` for Enum naming consistency and `Unsupported("ltree")` for extension types.

### 3. Transliteration Fidelity
**Challenge**: Standard transliteration libraries often fail on Sanskrit-specific edge cases like conjuncts and numeral handling.
**Solution**: Developed a custom `TransliterationEngine` that handles bi-directional mapping between IAST and Devanagari with special logic for halanta-inherent-vowel transitions.

### 4. Dynamic Script Fallback
**Challenge**: Some verses may only have Devanagari content, while others only have IAST.
**Solution**: Integrated the transliteration engine directly into the `LibraryService`. If a requested script is missing, the API generates it on-the-fly, ensuring the UI always has both scripts available.

### 5. Hierarchical Tagging Complexity
**Challenge**: Importing 1000s of tags and subtags while maintaining parent-child relations and cross-tag associations.
**Solution**: Expanded the `Tag` model to support self-referential relations. Developed a robust ingestion script that processes JSON-based taxonomy and handles empty/corrupted data gracefully.

### 6. Unique Constraint Management
**Challenge**: When ingesting high-volume node data, default `orderIndex` values caused unique constraint violations.
**Solution**: Modified the ingestion pipeline to track `childrenCount` per parent on the stack, ensuring every node receives a unique, sequential `orderIndex` within its scope.
