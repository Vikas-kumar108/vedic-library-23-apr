-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS ltree;
CREATE EXTENSION IF NOT EXISTS vector;

-- =====================================================
-- ENUMS
-- =====================================================

-- Drop old types if they exist under different names (handled manually if needed)
-- But we'll just try to create the new ones

CREATE TYPE content_type_enum AS ENUM (
  'sutra',
  'translation',
  'commentary',
  'purport',
  'title',
  'subtitle',
  'colophon'
);

CREATE TYPE language_enum AS ENUM (
  'sa', 'en', 'hi', 'bn', 'ta', 'or', 'mr', 'gu'
);

CREATE TYPE script_enum AS ENUM (
  'devanagari', 'latin', 'bengali', 'tamil', 'oriya'
);

CREATE TYPE life_stage_enum AS ENUM (
  'student', 'unmarried', 'married', 'parent', 'retired', 'renunciate'
);

CREATE TYPE guidance_level_enum AS ENUM (
  'beginner', 'intermediate', 'advanced', 'teacher'
);

CREATE TYPE gender_enum AS ENUM (
  'male', 'female'
);

-- =====================================================
-- CORE TABLES
-- =====================================================

-- SHASTRAS
CREATE TABLE IF NOT EXISTS shastras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  structure_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SOURCES
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  description TEXT,
  year_approx INT,
  era TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- NODES
CREATE TABLE IF NOT EXISTS nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shastra_id UUID NOT NULL REFERENCES shastras(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  slug TEXT,
  order_index INT DEFAULT 0,
  canonical_ref TEXT,
  path LTREE,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- TEXTS
CREATE TABLE IF NOT EXISTS texts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  content_type content_type_enum NOT NULL,
  language language_enum NOT NULL,
  script script_enum NOT NULL,
  content TEXT NOT NULL,
  source_id UUID REFERENCES sources(id),
  is_primary BOOLEAN DEFAULT FALSE,
  anchor_word TEXT,
  segment_order INT,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- FULL TEXT SEARCH COLUMN
-- We need to drop the old one if it exists to change it to GENERATED
-- But let's see if it works with IF NOT EXISTS
ALTER TABLE texts ADD COLUMN IF NOT EXISTS fts_vector tsvector
GENERATED ALWAYS AS (to_tsvector('simple', content)) STORED;

-- TEXT METADATA
CREATE TABLE IF NOT EXISTS text_metadata (
  text_id UUID PRIMARY KEY REFERENCES texts(id) ON DELETE CASCADE,
  life_stages life_stage_enum[],
  guidance_levels guidance_level_enum[],
  is_sensitive BOOLEAN DEFAULT FALSE
);

-- SYNONYMS
CREATE TABLE IF NOT EXISTS synonyms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text_id UUID REFERENCES texts(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  meaning TEXT,
  language language_enum,
  order_index INT
);

-- TAGS
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE,
  type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS node_tags (
  node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (node_id, tag_id)
);

-- RELATIONS
CREATE TABLE IF NOT EXISTS node_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
  to_node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
  relation_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- VERSIONING
CREATE TABLE IF NOT EXISTS text_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text_id UUID NOT NULL REFERENCES texts(id) ON DELETE CASCADE,
  content TEXT,
  content_type content_type_enum,
  language language_enum,
  script script_enum,
  source_id UUID,
  version_number INT,
  updated_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 🧠 AI SEMANTIC LAYER (Future-ready)
CREATE TABLE IF NOT EXISTS text_embeddings (
  text_id UUID PRIMARY KEY REFERENCES texts(id) ON DELETE CASCADE,
  embedding vector(384) NOT NULL,
  model TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- NODE TREE
CREATE INDEX IF NOT EXISTS idx_nodes_path ON nodes USING GIST (path);
CREATE UNIQUE INDEX IF NOT EXISTS uniq_node_order
ON nodes (shastra_id, parent_id, order_index) NULLS NOT DISTINCT;
CREATE UNIQUE INDEX IF NOT EXISTS uniq_node_ref
ON nodes(shastra_id, canonical_ref)
WHERE canonical_ref IS NOT NULL;

-- TEXT LOOKUP
CREATE INDEX IF NOT EXISTS idx_texts_node ON texts(node_id);
CREATE INDEX IF NOT EXISTS idx_texts_lookup
ON texts(node_id, content_type, language);
CREATE INDEX IF NOT EXISTS idx_texts_source ON texts(source_id);
CREATE INDEX IF NOT EXISTS idx_texts_not_deleted ON texts(deleted_at);
CREATE INDEX IF NOT EXISTS idx_nodes_not_deleted ON nodes(deleted_at);

-- FULL TEXT SEARCH
CREATE INDEX IF NOT EXISTS idx_texts_fts ON texts USING GIN (fts_vector);

-- VERSIONING
CREATE INDEX IF NOT EXISTS idx_text_versions_text_id
ON text_versions(text_id);

-- RELATIONS
CREATE INDEX IF NOT EXISTS idx_node_relations_from ON node_relations(from_node_id);
CREATE INDEX IF NOT EXISTS idx_node_relations_to ON node_relations(to_node_id);

-- 🔥 Create a case-insensitive Unique Index
CREATE UNIQUE INDEX IF NOT EXISTS uniq_sources_name_role_lower 
ON sources (LOWER(name), COALESCE(LOWER(role), ''));

CREATE INDEX IF NOT EXISTS idx_text_embeddings_hnsw
ON text_embeddings USING hnsw (embedding vector_cosine_ops);

-- =====================================================
-- VERSIONING TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION save_text_version()
RETURNS TRIGGER AS $$
DECLARE
  new_version INT;
BEGIN
  IF OLD.content IS DISTINCT FROM NEW.content THEN
    SELECT COALESCE(MAX(version_number), 0) + 1
    INTO new_version
    FROM text_versions
    WHERE text_id = OLD.id;

    INSERT INTO text_versions (
      text_id,
      content,
      content_type,
      language,
      script,
      source_id,
      version_number,
      updated_by
    )
    VALUES (
      OLD.id,
      OLD.content,
      OLD.content_type,
      OLD.language,
      OLD.script,
      OLD.source_id,
      new_version,
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Check if trigger exists before creating
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_save_text_version') THEN
    CREATE TRIGGER trigger_save_text_version
    BEFORE UPDATE ON texts
    FOR EACH ROW
    EXECUTE FUNCTION save_text_version();
  END IF;
END $$;

-- =====================================================
-- INITIAL DATA
-- =====================================================

INSERT INTO shastras (slug, name, structure_type)
VALUES (
  'kama_sutra',
  'Kāmasūtra',
  'adhikarana-adhyaya-prakarana-sutra'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO sources (name, role)
VALUES
('Vātsyāyana', 'author'),
('Yashodhara', 'commentator'),
('Your Name', 'purport_author')
ON CONFLICT DO NOTHING;
