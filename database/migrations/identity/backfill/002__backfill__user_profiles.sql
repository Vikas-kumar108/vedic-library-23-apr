-- PHASE 1: Backfill
-- Entity: user_profiles
-- Responsibility: Copy PII and contact information safely

INSERT INTO identity.user_profiles (
    user_id, 
    full_name, 
    phone_number, 
    whatsapp_number, 
    avatar_url, 
    gender, 
    date_of_birth, 
    village, 
    city, 
    state, 
    pin_code, 
    created_at, 
    updated_at
)
SELECT 
    up.user_id, 
    up.full_name, 
    up.phone_number, 
    up.whatsapp_number, 
    up.avatar_url, 

    -- SAFE ENUM CAST (NULL-PROTECTED)
    CASE 
        WHEN up.gender IS NOT NULL 
        THEN up.gender::text::identity.gender_enum
        ELSE NULL
    END,

    up.date_of_birth, 
    up.village, 
    up.city, 
    up.state, 
    up.pin_code, 
    up.created_at, 
    up.updated_at

FROM public.user_profiles up

-- Optional safety: ensure parent exists (extra guard)
WHERE EXISTS (
    SELECT 1 
    FROM identity.users u 
    WHERE u.id = up.user_id
)

ON CONFLICT (user_id) DO NOTHING;

-- Observability Check (Comparison-Based)
SELECT 
    (SELECT COUNT(*) FROM public.user_profiles)   AS public_count,
    (SELECT COUNT(*) FROM identity.user_profiles) AS identity_count;