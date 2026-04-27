-- PHASE 1: Backfill
-- Entity: user_statistics
-- Responsibility: Copy engagement metrics and points safely

INSERT INTO identity.user_statistics (
    user_id, 
    nodes_read_count, 
    courses_completed, 
    contribution_points, 
    updated_at
)
SELECT 
    us.user_id, 

    -- NULL-SAFE NUMERIC HANDLING (optional but safer)
    COALESCE(us.nodes_read_count, 0),
    COALESCE(us.courses_completed, 0),
    COALESCE(us.contribution_points, 0),

    us.updated_at

FROM public.user_statistics us

-- Referential safety (ensure user exists in identity)
WHERE EXISTS (
    SELECT 1 
    FROM identity.users u 
    WHERE u.id = us.user_id
)

ON CONFLICT (user_id) DO NOTHING;

-- Observability Check (Comparison-Based)
SELECT 
    (SELECT COUNT(*) FROM public.user_statistics)   AS public_count,
    (SELECT COUNT(*) FROM identity.user_statistics) AS identity_count;