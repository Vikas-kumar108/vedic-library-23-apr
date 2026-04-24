-- Create Background Tasks Table for Institutional Worker Engine
CREATE TABLE IF NOT EXISTS background_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_type TEXT NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'PENDING',
    error_log TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE
);

-- Index for the worker to find pending tasks quickly
CREATE INDEX IF NOT EXISTS idx_tasks_status_created ON background_tasks(status, created_at);

COMMENT ON TABLE background_tasks IS 'Persistent queue for the institutional background worker engine (Pillar VIII Connectivity).';
