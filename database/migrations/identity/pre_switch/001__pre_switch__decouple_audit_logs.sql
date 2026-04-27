-- [IDENTITY MIGRATION]
-- Action: Decouple audit_logs from users FK
-- Rationale: audit_logs.performed_by_id currently references public.users(id). 
--           During migration, users are created in identity.users first, 
--           causing FK violations in audit_logs.

ALTER TABLE public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_performed_by_id_fkey;

-- Note: performed_by_id column remains as UUID to store the performer's ID (from either schema).
