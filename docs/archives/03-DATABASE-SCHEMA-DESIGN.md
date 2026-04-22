# Database Schema Design

## Overview

This document outlines the recommended database schema for the Vedic Library, designed to support:
- 20+ lakh (2 million+) Sanskrit texts
- Multiple text formats (verse, mantra, sutra, prose)
- Multi-language translations
- Multiple commentary traditions (sampradayas)
- User interactions (saves, notes, questions)
- Administrative content management

---

## Recommended Database: Supabase (PostgreSQL)

### Why Supabase?
1. **PostgreSQL** - Robust, scalable, supports complex queries
2. **Real-time subscriptions** - Live updates for collaborative features
3. **Row Level Security (RLS)** - Fine-grained access control
4. **Built-in Auth** - User management out of the box
5. **Storage** - For audio/video files
6. **Edge Functions** - Serverless API endpoints
7. **Free tier** - Generous for development

---

## Core Tables

### 1. `corpus_tree` - Hierarchical Structure
Stores the navigational tree structure (texts, chapters, verses).

```sql
CREATE TABLE corpus_tree (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Hierarchy
  parent_id UUID REFERENCES corpus_tree(id),
  path LTREE, -- For efficient tree queries (e.g., 'itihasa.mahabharata.bhisma.gita.ch1')
  depth INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  
  -- Identity
  slug VARCHAR(100) NOT NULL, -- 'bg.1.1', 'rv.1.1.1'
  type VARCHAR(50) NOT NULL, -- 'corpus', 'category', 'work', 'parva', 'text', 'chapter', 'verse', 'mantra', 'sutra'
  
  -- Display
  title_en VARCHAR(255) NOT NULL,
  title_sa VARCHAR(255), -- Sanskrit (Devanagari)
  title_iast VARCHAR(255), -- IAST transliteration
  description TEXT,
  
  -- Metadata
  verse_count INTEGER,
  chapter_count INTEGER,
  tradition VARCHAR(100), -- 'shakta', 'vaishnava', 'shaiva', etc.
  period VARCHAR(100), -- 'vedic', 'epic', 'puranic', 'medieval'
  
  -- Content Format
  content_type VARCHAR(50), -- 'verse', 'mantra', 'sutra', 'prose', 'mixed'
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(slug)
);

-- Index for tree queries
CREATE INDEX idx_corpus_tree_path ON corpus_tree USING GIST (path);
CREATE INDEX idx_corpus_tree_parent ON corpus_tree(parent_id);
CREATE INDEX idx_corpus_tree_type ON corpus_tree(type);
```

---

### 2. `canonical_texts` - Original Sanskrit Texts
Stores the canonical/original text content.

```sql
CREATE TABLE canonical_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id UUID REFERENCES corpus_tree(id) ON DELETE CASCADE,
  
  -- Text Content
  text_devanagari TEXT NOT NULL,
  text_iast TEXT,
  text_telugu TEXT,
  text_kannada TEXT,
  text_malayalam TEXT,
  text_tamil TEXT,
  
  -- Verse Metadata
  verse_number VARCHAR(50), -- '1', '1a', '1-2' (for combined verses)
  pada_count INTEGER, -- Number of lines/quarters
  chandas VARCHAR(100), -- Meter: 'anushtup', 'trishtup', etc.
  
  -- For Mantras
  rishi VARCHAR(255), -- Seer
  devata VARCHAR(255), -- Deity
  svarah VARCHAR(100), -- Musical notes
  viniyoga TEXT, -- Application/use
  
  -- For Sutras
  adhikarana VARCHAR(255), -- Topic heading
  sutra_number VARCHAR(50),
  
  -- Speaker (for dialogues like Gita)
  speaker VARCHAR(100),
  addressee VARCHAR(100),
  
  -- Audio/Video
  audio_url TEXT,
  video_url TEXT,
  recitation_style VARCHAR(50), -- 'ghana', 'krama', 'pada', etc.
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_canonical_node ON canonical_texts(node_id);
```

---

### 3. `word_analysis` - Padaccheda & Anvaya
Word-by-word breakdown and prose order.

```sql
CREATE TABLE word_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Analysis Type
  analysis_type VARCHAR(50) NOT NULL, -- 'padaccheda' (word segmentation), 'anvaya' (prose order)
  language VARCHAR(10) NOT NULL, -- 'sa', 'en', 'hi', 'te'
  
  -- Content
  content TEXT NOT NULL,
  
  -- Source/Authority
  source VARCHAR(255), -- 'traditional', 'prabhupada', 'ai-generated'
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_word_analysis_canonical ON word_analysis(canonical_id);
```

---

### 4. `synonyms` - Word-to-Word Meanings
Individual word meanings (shabdartha).

```sql
CREATE TABLE synonyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Language
  language VARCHAR(10) NOT NULL, -- 'en', 'hi', 'te', 'sa'
  
  -- Content (JSON array of word-meaning pairs)
  words JSONB NOT NULL,
  -- Example: [{"word": "karmaṇi", "meaning": "in prescribed duties"}, ...]
  
  -- Source
  source VARCHAR(255), -- 'prabhupada', 'shankaracharya', etc.
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_synonyms_canonical ON synonyms(canonical_id);
```

---

### 5. `translations` - Verse Translations
Translations in various languages by various authors.

```sql
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Language & Author
  language VARCHAR(10) NOT NULL, -- 'en', 'hi', 'te', 'ta', 'kn', 'ml'
  author VARCHAR(255) NOT NULL, -- 'prabhupada', 'gambhirananda', 'ai'
  
  -- Content
  translation TEXT NOT NULL,
  
  -- Metadata
  sampradaya VARCHAR(100), -- 'gaudiya', 'advaita', 'madhva', 'sri_vaishnava'
  is_literal BOOLEAN DEFAULT FALSE, -- Literal vs interpretive
  
  -- Audio
  audio_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_translations_canonical ON translations(canonical_id);
CREATE INDEX idx_translations_language ON translations(language);
CREATE INDEX idx_translations_author ON translations(author);
```

---

### 6. `commentaries` - Bhashyas & Tikas
Detailed commentaries from various acharyas.

```sql
CREATE TABLE commentaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Commentary Identity
  name VARCHAR(255) NOT NULL, -- 'Bhagavad-gita As It Is', 'Gita Bhashya'
  author VARCHAR(255) NOT NULL, -- 'prabhupada', 'shankaracharya', 'madhvacharya'
  sampradaya VARCHAR(100), -- 'gaudiya', 'advaita', 'madhva', 'sri_vaishnava'
  
  -- Content
  language VARCHAR(10) NOT NULL,
  script VARCHAR(20) NOT NULL, -- 'devanagari', 'iast', 'telugu'
  content TEXT NOT NULL,
  
  -- Type
  commentary_type VARCHAR(50), -- 'bhashya', 'tika', 'dipika', 'prakasha', 'purport'
  parent_commentary_id UUID REFERENCES commentaries(id), -- For sub-commentaries
  
  -- Audio/Video
  audio_url TEXT,
  video_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_commentaries_canonical ON commentaries(canonical_id);
CREATE INDEX idx_commentaries_sampradaya ON commentaries(sampradaya);
CREATE INDEX idx_commentaries_author ON commentaries(author);
```

---

### 7. `expositions` - Purports & Extended Explanations
Extended explanations (like Prabhupada's purports).

```sql
CREATE TABLE expositions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Author & Source
  author VARCHAR(255) NOT NULL,
  source_work VARCHAR(255), -- 'Bhagavad-gita As It Is'
  
  -- Content
  language VARCHAR(10) NOT NULL,
  content TEXT NOT NULL,
  
  -- Type
  exposition_type VARCHAR(50), -- 'purport', 'lecture', 'letter', 'conversation'
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_expositions_canonical ON expositions(canonical_id);
```

---

### 8. `related_verses` - Cross-References
Links between related verses.

```sql
CREATE TABLE related_verses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Source and Target
  source_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  target_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Relationship Type
  relation_type VARCHAR(50), -- 'similar_theme', 'reference', 'continuation', 'contrast'
  
  -- Metadata
  description TEXT,
  strength INTEGER DEFAULT 5, -- 1-10 relevance score
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(source_id, target_id)
);

CREATE INDEX idx_related_source ON related_verses(source_id);
CREATE INDEX idx_related_target ON related_verses(target_id);
```

---

### 9. `media` - Audio & Video Resources
Audio recitations, video discourses.

```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Media Info
  media_type VARCHAR(20) NOT NULL, -- 'audio', 'video'
  title VARCHAR(255),
  description TEXT,
  
  -- Source
  url TEXT NOT NULL,
  storage_path TEXT, -- Supabase Storage path
  duration_seconds INTEGER,
  
  -- Metadata
  speaker VARCHAR(255),
  language VARCHAR(10),
  recitation_style VARCHAR(50), -- 'ghana', 'pada', 'lecture'
  
  -- Thumbnail
  thumbnail_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_canonical ON media(canonical_id);
```

---

## User-Related Tables

### 10. `users` - User Profiles
Extended user profile (Supabase Auth handles authentication).

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  
  -- Profile
  display_name VARCHAR(255),
  avatar_url TEXT,
  
  -- Preferences
  preferred_language VARCHAR(10) DEFAULT 'en',
  preferred_script VARCHAR(20) DEFAULT 'devanagari',
  preferred_sampradaya VARCHAR(100),
  age_group VARCHAR(20), -- 'kids', 'students', 'professionals', 'elders'
  
  -- Stats
  verses_read INTEGER DEFAULT 0,
  study_streak_days INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  
  -- Roles
  role VARCHAR(50) DEFAULT 'user', -- 'user', 'contributor', 'editor', 'admin'
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 11. `user_bookmarks` - Saved Verses
User's saved/bookmarked verses.

```sql
CREATE TABLE user_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Organization
  folder VARCHAR(255) DEFAULT 'default',
  note TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, canonical_id)
);

CREATE INDEX idx_bookmarks_user ON user_bookmarks(user_id);
```

---

### 12. `user_notes` - Personal Notes
User's notes on verses.

```sql
CREATE TABLE user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Note Content
  content TEXT NOT NULL,
  
  -- Visibility
  is_public BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notes_user ON user_notes(user_id);
```

---

### 13. `user_questions` - Questions on Verses
Questions users ask about verses (for AI/community answers).

```sql
CREATE TABLE user_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  
  -- Question
  question TEXT NOT NULL,
  
  -- Answer (can be AI-generated or community)
  answer TEXT,
  answered_by UUID REFERENCES users(id),
  answered_at TIMESTAMPTZ,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'answered', 'closed'
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_user ON user_questions(user_id);
CREATE INDEX idx_questions_canonical ON user_questions(canonical_id);
```

---

### 14. `user_study_progress` - Learning Progress
Tracks user's study progress.

```sql
CREATE TABLE user_study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  node_id UUID REFERENCES corpus_tree(id) ON DELETE CASCADE,
  
  -- Progress
  status VARCHAR(20) DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  progress_percent INTEGER DEFAULT 0,
  last_verse_id UUID REFERENCES canonical_texts(id),
  
  -- Stats
  time_spent_minutes INTEGER DEFAULT 0,
  verses_completed INTEGER DEFAULT 0,
  
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_progress_user ON user_study_progress(user_id);
```

---

## Administrative Tables

### 15. `courses` - Educational Courses
Structured learning paths.

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Course Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Metadata
  difficulty VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
  age_groups VARCHAR[] DEFAULT ARRAY['students', 'professionals'], -- Target audiences
  category VARCHAR(100), -- 'dharma', 'vedanta', 'yoga'
  
  -- Content
  verse_count INTEGER,
  curriculum JSONB, -- Ordered list of verse IDs
  
  -- Media
  thumbnail_url TEXT,
  
  -- Status
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 16. `tags` - Content Tags
Tags for categorization and search.

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Tag Info
  name VARCHAR(100) NOT NULL UNIQUE,
  name_sa VARCHAR(100), -- Sanskrit name
  category VARCHAR(50), -- 'theme', 'topic', 'deity', 'concept'
  
  description TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE verse_tags (
  canonical_id UUID REFERENCES canonical_texts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  
  PRIMARY KEY (canonical_id, tag_id)
);

CREATE INDEX idx_verse_tags_tag ON verse_tags(tag_id);
```

---

## Row Level Security (RLS) Policies

```sql
-- Enable RLS on all user tables
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_study_progress ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own bookmarks" ON user_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks" ON user_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON user_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Public content is readable by all
CREATE POLICY "Anyone can read canonical texts" ON canonical_texts
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read corpus tree" ON corpus_tree
  FOR SELECT USING (true);
```

---

## Data Migration Strategy

### From Your JSON Files to Supabase

Your current data structure:
```
/data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/
├── canonical/
│   └── bg.1.1.json
├── derivatives/
│   ├── commentary/
│   │   ├── baladeva/sa/bg.1.1.baladeva.commentary.json
│   │   └── madhva/en/bg.1.1.madhva.translation.json
│   ├── editorial-units/
│   ├── exposition/
│   ├── synonyms/
│   └── translations/
└── index/
    ├── verse/bg.1.1.index.json
    └── commentary/bg.1.1.commentaries.index.json
```

**Migration Script Approach:**
1. Parse all JSON files recursively
2. Build `corpus_tree` entries first (hierarchy)
3. Insert `canonical_texts` (original verses)
4. Insert `synonyms`, `translations`, `commentaries`, `expositions`
5. Build `related_verses` from index files
6. Validate data integrity

See `docs/06-DATA-MIGRATION-GUIDE.md` for detailed migration scripts.
