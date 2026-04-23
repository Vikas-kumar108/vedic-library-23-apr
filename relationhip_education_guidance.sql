CREATE TYPE assignment_type_enum AS ENUM ('mentor', 'teacher', 'coordinator');

CREATE TABLE guidance_assignments (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
guide_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 assignment_type assignment_type_enum NOT NULL,
 subject TEXT, -- e.g., 'Gita Study', 'Village Coordination'
 status TEXT DEFAULT 'active',
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 UNIQUE(guide_id, student_id, assignment_type)
);

CREATE TABLE guidance_sessions (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 assignment_id UUID REFERENCES guidance_assignments(id) ON DELETE CASCADE,
 topic TEXT,
 summary_notes TEXT,
 session_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 duration_minutes INT
);

-- USER LAYER
CREATE TABLE users (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 email TEXT UNIQUE NOT NULL,
 roles user_role_enum[] DEFAULT '{student}', -- Array for high-speed permission checks
  
 gender gender_enum,
 life_stage life_stage_enum,
 guidance_level guidance_level_enum,
  
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 last_active TIMESTAMP WITH TIME ZONE
);

-- USER STATISTICS (The Read-Cache for Performance)
CREATE TABLE user_statistics (
 user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 nodes_read_count INT DEFAULT 0,
 courses_completed INT DEFAULT 0,
 contribution_points INT DEFAULT 0, -- Useful for village outreach gamification
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- The "Syllabus" or "Plan"
CREATE TABLE learning_curves (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 title TEXT NOT NULL,
 description TEXT,
 target_life_stages life_stage_enum[], 
 is_published BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- The specific steps in the curve
CREATE TABLE learning_curve_steps (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 curve_id UUID REFERENCES learning_curves(id) ON DELETE CASCADE,
 step_order INT NOT NULL,
 title TEXT NOT NULL,
  
 -- Link to Library Content
 node_id UUID REFERENCES nodes(id) ON DELETE SET NULL, 
  
 unlock_requirement JSONB, -- e.g., {"min_points": 50} or {"complete_step": 2}
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 UNIQUE(curve_id, step_order)
);

-- User Enrollment and Progress
CREATE TABLE user_curve_progress (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID REFERENCES users(id) ON DELETE CASCADE,
 curve_id UUID REFERENCES learning_curves(id) ON DELETE CASCADE,
 current_step_id UUID REFERENCES learning_curve_steps(id),
 is_completed BOOLEAN DEFAULT FALSE,
 started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 completed_at TIMESTAMP WITH TIME ZONE,
 UNIQUE(user_id, curve_id)
);

-- Simple Reading Progress (Checklist style)
CREATE TABLE user_node_progress (
 user_id UUID REFERENCES users(id) ON DELETE CASCADE,
 node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
 is_read BOOLEAN DEFAULT FALSE,
 last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 PRIMARY KEY (user_id, node_id)
);

CREATE TABLE bookmarks (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID REFERENCES users(id) ON DELETE CASCADE,
 node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
 folder_name TEXT DEFAULT 'Main', -- Organize bookmarks
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE highlights (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id UUID REFERENCES users(id) ON DELETE CASCADE,
 text_id UUID REFERENCES texts(id) ON DELETE CASCADE,
 selection_range INT4RANGE, -- Postgres range type for precise highlighting
 note TEXT,
 color_code TEXT,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE content_access_rules (
 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
  
 -- Logic: If user matches ANY of these, they get access
 allowed_roles user_role_enum[],
 allowed_life_stages life_stage_enum[],
 allowed_guidance_levels guidance_level_enum[],
  
 is_restricted BOOLEAN DEFAULT TRUE,
 message_if_locked TEXT -- "Please complete Step 1 to unlock this verse"
);


CREATE TYPE relationship_type_enum AS ENUM (
 'pitara', 'matara',   -- Father, Mother
 'sapinda',        -- Shared particle (agnatic kinship)
 'vaivahika',      -- Marital
 'shishya', 'guru',    -- Spiritual lineage
 'prapautra', 'pautra',  -- Great-grandson, Grandson
 'sahodara'        -- Brother (same womb)
);

CREATE TYPE authority_status_enum AS ENUM (
 'guardian',  -- Legal/Social authority
 'dependant',  -- Under protection (e.g., daughter before marriage)
 'karta',    -- Head of unit
 'shakha_head' -- Branch authority
);
