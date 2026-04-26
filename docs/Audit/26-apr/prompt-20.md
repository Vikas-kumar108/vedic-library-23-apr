You are a senior Prisma + PostgreSQL architect.

I have a production-grade PostgreSQL schema that MUST NOT be changed.

Goal:
Refactor ONLY the Prisma schema to:

1. Replace ugly auto-generated relation names with clean names
   Example:

   * from_node_id → fromNode
   * to_node_id → toNode

2. Use @map to map camelCase fields to snake_case DB columns

3. Use clean relation names in models:

   * relationsFrom
   * relationsTo

4. Keep database structure EXACTLY SAME

   * No table rename
   * No column rename
   * No enum change
   * No constraint change

5. Improve developer readability

6. Do NOT remove any model or relation

Output:
Return FULL updated Prisma models only for:

* nodes
* node_relations
* node_tags
* texts
* shastras

Do NOT explain. Only give final code.
=============================

model nodes {
  id                 String                 @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  shastraId          String                 @map("shastra_id") @db.Uuid
  parentId           String?                @map("parent_id") @db.Uuid
  level              String
  slug               String?
  orderIndex         Int?                   @default(0) @map("order_index")
  canonicalRef       String?                @map("canonical_ref")
  path               Unsupported("ltree")?
  sensitivity        Int?                   @default(1)
  status             content_status_enum    @default(ACTIVE)
  deletedAt          DateTime?              @map("deleted_at")
  createdAt          DateTime               @default(now()) @map("created_at")
  updatedAt          DateTime               @default(now()) @map("updated_at")

  learningCurveSteps learning_curve_steps[]
  relationsFrom      node_relations[]       @relation("node_relations_from")
  relationsTo        node_relations[]       @relation("node_relations_to")
  tags               node_tags[]
  parent             nodes?                 @relation("nodesTonodes", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  children           nodes[]                @relation("nodesTonodes")
  shastra            shastras               @relation(fields: [shastraId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  texts              texts[]

  @@index([path], map: "idx_nodes_path", type: Gist)
}

model node_relations {
  id           String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  fromNodeId   String   @map("from_node_id") @db.Uuid
  toNodeId     String   @map("to_node_id") @db.Uuid
  relationType String?  @map("relation_type")
  createdAt    DateTime @default(now()) @map("created_at")

  fromNode     nodes    @relation("node_relations_from", fields: [fromNodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  toNode       nodes    @relation("node_relations_to", fields: [toNodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([fromNodeId], map: "idx_node_rel_from")
  @@index([toNodeId], map: "idx_node_rel_to")
}

model node_tags {
  nodeId String @map("node_id") @db.Uuid
  tagId  String @map("tag_id") @db.Uuid
  node   nodes  @relation(fields: [nodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  tag    tags   @relation(fields: [tagId], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@id([nodeId, tagId])
  @@index([nodeId], map: "idx_node_tags_node")
  @@index([tagId], map: "idx_node_tags_tag")
}

model texts {
  id            String              @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  nodeId        String              @map("node_id") @db.Uuid
  contentType   content_type_enum   @map("content_type")
  language      language_enum
  script        script_enum
  content       String
  sourceId      String?             @map("source_id") @db.Uuid
  isPrimary     Boolean?            @default(false) @map("is_primary")
  anchorWord    String?             @map("anchor_word")
  segmentOrder  Int?                @map("segment_order")
  status        content_status_enum @default(ACTIVE)
  deletedAt     DateTime?           @map("deleted_at")
  createdAt     DateTime            @default(now()) @map("created_at")
  updatedAt     DateTime            @default(now()) @map("updated_at")

  synonyms      synonyms[]
  embeddings    text_embeddings?
  metadata      text_metadata?
  versions      text_versions[]
  node          nodes               @relation(fields: [nodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  source        sources?            @relation(fields: [sourceId], references: [id], onUpdate: NoAction)
}

model shastras {
  id            String              @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  slug          String              @unique
  name          String
  structureType String              @map("structure_type")
  status        content_status_enum @default(ACTIVE)
  deletedAt     DateTime?           @map("deleted_at")
  createdAt     DateTime            @default(now()) @map("created_at")
  updatedAt     DateTime            @default(now()) @map("updated_at")
  nodes         nodes[]
}

=============



Edited wisdom.repository.ts
Edited institutional.service.ts
Edited institutional.service.ts
Edited library.routes.ts
Edited index.ts
Edited library.repository.ts
Edited node.mapper.ts
Edited library.service.ts
Edited library.service.ts
Edited library.service.ts
Edited library.service.ts
Viewed library.service.ts:1-52
Viewed schema.prisma:1-800
Viewed schema.prisma:580-1000
Viewed schema.prisma:990-1100

```prisma
model nodes {
  id                 String                 @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  shastraId          String                 @map("shastra_id") @db.Uuid
  parentId           String?                @map("parent_id") @db.Uuid
  level              String
  slug               String?
  orderIndex         Int?                   @default(0) @map("order_index")
  canonicalRef       String?                @map("canonical_ref")
  path               Unsupported("ltree")?
  sensitivity        Int?                   @default(1)
  status             content_status_enum    @default(ACTIVE)
  deletedAt          DateTime?              @map("deleted_at")
  createdAt          DateTime               @default(now()) @map("created_at")
  updatedAt          DateTime               @default(now()) @map("updated_at")

  learningCurveSteps learning_curve_steps[]
  relationsFrom      node_relations[]       @relation("node_relations_from")
  relationsTo        node_relations[]       @relation("node_relations_to")
  tags               node_tags[]
  parent             nodes?                 @relation("nodesTonodes", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  children           nodes[]                @relation("nodesTonodes")
  shastra            shastras               @relation(fields: [shastraId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  texts              texts[]

  @@index([path], map: "idx_nodes_path", type: Gist)
}

model node_relations {
  id           String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  fromNodeId   String   @map("from_node_id") @db.Uuid
  toNodeId     String   @map("to_node_id") @db.Uuid
  relationType String?  @map("relation_type")
  createdAt    DateTime @default(now()) @map("created_at")

  fromNode     nodes    @relation("node_relations_from", fields: [fromNodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  toNode       nodes    @relation("node_relations_to", fields: [toNodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([fromNodeId], map: "idx_node_rel_from")
  @@index([toNodeId], map: "idx_node_rel_to")
}

model node_tags {
  nodeId String @map("node_id") @db.Uuid
  tagId  String @map("tag_id") @db.Uuid
  node   nodes  @relation(fields: [nodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  tag    tags   @relation(fields: [tagId], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@id([nodeId, tagId])
  @@index([nodeId], map: "idx_node_tags_node")
  @@index([tagId], map: "idx_node_tags_tag")
}

model texts {
  id            String              @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  nodeId        String              @map("node_id") @db.Uuid
  contentType   content_type_enum   @map("content_type")
  language      language_enum
  script        script_enum
  content       String
  sourceId      String?             @map("source_id") @db.Uuid
  isPrimary     Boolean?            @default(false) @map("is_primary")
  anchorWord    String?             @map("anchor_word")
  segmentOrder  Int?                @map("segment_order")
  status        content_status_enum @default(ACTIVE)
  deletedAt     DateTime?           @map("deleted_at")
  createdAt     DateTime            @default(now()) @map("created_at")
  updatedAt     DateTime            @default(now()) @map("updated_at")

  synonyms      synonyms[]
  embeddings    text_embeddings?
  metadata      text_metadata?
  versions      text_versions[]
  node          nodes               @relation(fields: [nodeId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  source        sources?            @relation(fields: [sourceId], references: [id], onUpdate: NoAction)
}

model shastras {
  id            String              @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  slug          String              @unique
  name          String
  structureType String              @map("structure_type")
  status        content_status_enum @default(ACTIVE)
  deletedAt     DateTime?           @map("deleted_at")
  createdAt     DateTime            @default(now()) @map("created_at")
  updatedAt     DateTime            @default(now()) @map("updated_at")
  nodes         nodes[]
}
```
