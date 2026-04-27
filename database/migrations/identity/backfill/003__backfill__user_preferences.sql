-- PHASE 1: Backfill
-- Entity: user_preferences
-- Responsibility: Copy notification settings and metadata safely

INSERT INTO identity.user_preferences (
    user_id, 
    notification_prefs, 
    metadata, 
    notes, 
    created_at, 
    updated_at
)
SELECT 
    up.user_id, 

    -- JSON SAFETY (ensure valid JSONB or fallback)
    CASE 
        WHEN up.notification_prefs IS NOT NULL 
        THEN up.notification_prefs
        ELSE '{}'::jsonb
    END,

    CASE 
        WHEN up.metadata IS NOT NULL 
        THEN up.metadata
        ELSE '{}'::jsonb
    END,

    up.notes, 
    up.created_at, 
    up.updated_at

FROM public.user_preferences up

-- Referential safety (ensure parent user exists)
WHERE EXISTS (
    SELECT 1 
    FROM identity.users u 
    WHERE u.id = up.user_id
)

ON CONFLICT (user_id) DO NOTHING;

-- Observability Check (Comparison-Based)
SELECT 
    (SELECT COUNT(*) FROM public.user_preferences)   AS public_count,
    (SELECT COUNT(*) FROM identity.user_preferences) AS identity_count;