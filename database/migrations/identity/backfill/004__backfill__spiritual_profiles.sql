-- PHASE 1: Backfill
-- Entity: spiritual_profiles
-- Responsibility: Copy seeker-specific spiritual metadata safely

INSERT INTO identity.spiritual_profiles (
    user_id, 
    age_group, 
    life_stage, 
    eligibility_level, 
    primary_focus, 
    inner_state, 
    nature, 
    created_at, 
    updated_at
)
SELECT 
    sp.user_id, 

    -- SAFE ENUM CASTS (NULL-PROTECTED)
    CASE 
        WHEN sp.age_group IS NOT NULL 
        THEN sp.age_group::text::identity.age_group_enum
        ELSE NULL
    END,

    CASE 
        WHEN sp.life_stage IS NOT NULL 
        THEN sp.life_stage::text::identity.life_stage_enum
        ELSE NULL
    END,

    sp.eligibility_level,

    CASE 
        WHEN sp.primary_focus IS NOT NULL 
        THEN sp.primary_focus::text::identity.purushartha_enum
        ELSE NULL
    END,

    CASE 
        WHEN sp.inner_state IS NOT NULL 
        THEN sp.inner_state::text::identity.inner_state_enum
        ELSE NULL
    END,

    CASE 
        WHEN sp.nature IS NOT NULL 
        THEN sp.nature::text::identity.svabhava_enum
        ELSE NULL
    END,

    sp.created_at, 
    sp.updated_at

FROM public.spiritual_profiles sp

-- Referential safety (only migrate valid users)
WHERE EXISTS (
    SELECT 1 
    FROM identity.users u 
    WHERE u.id = sp.user_id
)

ON CONFLICT (user_id) DO NOTHING;

-- Observability Check (Comparison-Based)
SELECT 
    (SELECT COUNT(*) FROM public.spiritual_profiles)   AS public_count,
    (SELECT COUNT(*) FROM identity.spiritual_profiles) AS identity_count;