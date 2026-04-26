CREATE TYPE content_type_enum AS ENUM (

-- 🌱 ROOT TEXT (Absolute)
'mula',

-- 🌳 PRIMARY COMMENTARY (Paramparā-level)
'bhashya',

-- 🌿 SECONDARY COMMENTARY
'tika',
'tippani',

-- 🔍 ANALYTICAL LAYERS
'shabdartha',     -- word-by-word
'anvaya',         -- grammatical order
'padaccheda',     -- word splitting (NEW)
'vigraha',        -- compound breakdown (NEW)

-- 🧠 INTERPRETIVE LAYERS
'bhavartha',      -- essence meaning
'tatparya',       -- philosophical intent
'arthavistara',   -- expanded meaning (NEW)

-- 📖 EXPLANATORY LAYERS
'vivarana',       -- detailed exposition
'vyakhyana',      -- general explanation
'tippani_extended', -- longer notes (NEW, optional nuance)

-- 🌐 TRANSLATION LAYERS
'anuvada',        -- faithful translation
'bhasantara',     -- contextual/free translation
'bhavanuvada',    -- interpretive translation (NEW)

-- 🔤 TRANSLITERATION (🔥 NEW — IMPORTANT)
'transliteration',

-- 🧩 STRUCTURED STUDY AIDS
'sutra_summary',  -- summary of section (NEW)
'key_points',     -- extracted teachings (NEW)

-- 🏷️ META TEXT
'shirshaka',      -- title
'upashirshaka',   -- subtitle
'pushpika'        -- colophon
);

-- ROOT
UPDATE texts SET content_type = 'mula'
WHERE content_type IN ('shloka','sutra','mantra');

-- TRANSLITERATION
UPDATE texts SET content_type = 'transliteration'
WHERE script = 'latin';

-- TRANSLATION
UPDATE texts SET content_type = 'anuvada'
WHERE content_type = 'translation';

-- COMMENTARY
UPDATE texts SET content_type = 'tika'
WHERE content_type IN ('commentary');

-- TITLE
UPDATE texts SET content_type = 'shirshaka'
WHERE content_type = 'title';