
-- =============================================================================
-- VEDIC INSTITUTIONAL OS: SAFE DECOMMISSIONING OF PUBLIC.IDENTITY MODELS
-- Purpose: Re-point all Foreign Keys to identity schema and drop legacy tables.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- PART 1: RE-POINT FOREIGN KEYS FROM PUBLIC.USERS TO IDENTITY.USERS
-- -----------------------------------------------------------------------------

-- Audit Logs
ALTER TABLE public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_performed_by_id_fkey;
ALTER TABLE public.audit_logs ADD CONSTRAINT audit_logs_performed_by_id_fkey 
    FOREIGN KEY (performed_by_id) REFERENCES identity.users(id) ON DELETE SET NULL;

-- Circle Members
ALTER TABLE public.circle_members DROP CONSTRAINT IF EXISTS circle_members_user_id_fkey;
ALTER TABLE public.circle_members ADD CONSTRAINT circle_members_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE CASCADE;

-- Circle Posts
ALTER TABLE public.circle_posts DROP CONSTRAINT IF EXISTS circle_posts_author_id_fkey;
ALTER TABLE public.circle_posts ADD CONSTRAINT circle_posts_author_id_fkey 
    FOREIGN KEY (author_id) REFERENCES identity.users(id) ON DELETE CASCADE;

-- Circles (Mentors)
ALTER TABLE public.circles DROP CONSTRAINT IF EXISTS circles_mentor_id_fkey;
ALTER TABLE public.circles ADD CONSTRAINT circles_mentor_id_fkey 
    FOREIGN KEY (mentor_id) REFERENCES identity.users(id) ON DELETE SET NULL;

-- Communication Logs
ALTER TABLE public.communication_logs DROP CONSTRAINT IF EXISTS communication_logs_user_id_fkey;
ALTER TABLE public.communication_logs ADD CONSTRAINT communication_logs_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE SET NULL;

-- Compliance Tasks
ALTER TABLE public.compliance_tasks DROP CONSTRAINT IF EXISTS compliance_tasks_assigned_to_fkey;
ALTER TABLE public.compliance_tasks ADD CONSTRAINT compliance_tasks_assigned_to_fkey 
    FOREIGN KEY (assigned_to) REFERENCES identity.users(id) ON DELETE SET NULL;

-- Contributions
ALTER TABLE public.contributions DROP CONSTRAINT IF EXISTS contributions_user_id_fkey;
ALTER TABLE public.contributions ADD CONSTRAINT contributions_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE NO ACTION;

-- Document Versions
ALTER TABLE public.document_versions DROP CONSTRAINT IF EXISTS document_versions_created_by_id_fkey;
ALTER TABLE public.document_versions ADD CONSTRAINT document_versions_created_by_id_fkey 
    FOREIGN KEY (created_by_id) REFERENCES identity.users(id) ON DELETE NO ACTION;

-- Donation Receipts
ALTER TABLE public.donation_receipts DROP CONSTRAINT IF EXISTS donation_receipts_issued_by_id_fkey;
ALTER TABLE public.donation_receipts ADD CONSTRAINT donation_receipts_issued_by_id_fkey 
    FOREIGN KEY (issued_by_id) REFERENCES identity.users(id) ON DELETE SET NULL;

ALTER TABLE public.donation_receipts DROP CONSTRAINT IF EXISTS donation_receipts_user_id_fkey;
ALTER TABLE public.donation_receipts ADD CONSTRAINT donation_receipts_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE NO ACTION;

-- Family Links
ALTER TABLE public.family_links DROP CONSTRAINT IF EXISTS family_links_related_id_fkey;
ALTER TABLE public.family_links ADD CONSTRAINT family_links_related_id_fkey 
    FOREIGN KEY (related_id) REFERENCES identity.users(id) ON DELETE CASCADE;

ALTER TABLE public.family_links DROP CONSTRAINT IF EXISTS family_links_user_id_fkey;
ALTER TABLE public.family_links ADD CONSTRAINT family_links_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE CASCADE;

-- Guidance Assignments
ALTER TABLE public.guidance_assignments DROP CONSTRAINT IF EXISTS guidance_assignments_guide_id_fkey;
ALTER TABLE public.guidance_assignments ADD CONSTRAINT guidance_assignments_guide_id_fkey 
    FOREIGN KEY (guide_id) REFERENCES identity.users(id) ON DELETE NO ACTION;

ALTER TABLE public.guidance_assignments DROP CONSTRAINT IF EXISTS guidance_assignments_student_id_fkey;
ALTER TABLE public.guidance_assignments ADD CONSTRAINT guidance_assignments_student_id_fkey 
    FOREIGN KEY (student_id) REFERENCES identity.users(id) ON DELETE NO ACTION;

-- Journal Entries
ALTER TABLE public.journal_entries DROP CONSTRAINT IF EXISTS journal_entries_approved_by_id_fkey;
ALTER TABLE public.journal_entries ADD CONSTRAINT journal_entries_approved_by_id_fkey 
    FOREIGN KEY (approved_by_id) REFERENCES identity.users(id) ON DELETE SET NULL;

ALTER TABLE public.journal_entries DROP CONSTRAINT IF EXISTS journal_entries_created_by_id_fkey;
ALTER TABLE public.journal_entries ADD CONSTRAINT journal_entries_created_by_id_fkey 
    FOREIGN KEY (created_by_id) REFERENCES identity.users(id) ON DELETE SET NULL;

-- Support Tickets
ALTER TABLE public.support_tickets DROP CONSTRAINT IF EXISTS support_tickets_assigned_to_id_fkey;
ALTER TABLE public.support_tickets ADD CONSTRAINT support_tickets_assigned_to_id_fkey 
    FOREIGN KEY (assigned_to_id) REFERENCES identity.users(id) ON DELETE SET NULL;

ALTER TABLE public.support_tickets DROP CONSTRAINT IF EXISTS support_tickets_user_id_fkey;
ALTER TABLE public.support_tickets ADD CONSTRAINT support_tickets_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE SET NULL;

-- Transactions
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_approved_by_id_fkey;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_approved_by_id_fkey 
    FOREIGN KEY (approved_by_id) REFERENCES identity.users(id) ON DELETE SET NULL;

ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_recorded_by_id_fkey;
ALTER TABLE public.transactions ADD CONSTRAINT transactions_recorded_by_id_fkey 
    FOREIGN KEY (recorded_by_id) REFERENCES identity.users(id) ON DELETE NO ACTION;

-- Org Members
ALTER TABLE public.org_members DROP CONSTRAINT IF EXISTS org_members_user_id_fkey;
ALTER TABLE public.org_members ADD CONSTRAINT org_members_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE NO ACTION;

-- User Curve Progress
ALTER TABLE public.user_curve_progress DROP CONSTRAINT IF EXISTS user_curve_progress_user_id_fkey;
ALTER TABLE public.user_curve_progress ADD CONSTRAINT user_curve_progress_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES identity.users(id) ON DELETE CASCADE;

-- -----------------------------------------------------------------------------
-- PART 2: DROP LEGACY IDENTITY MODELS
-- -----------------------------------------------------------------------------

DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.user_preferences CASCADE;
DROP TABLE IF EXISTS public.spiritual_profiles CASCADE;
DROP TABLE IF EXISTS public.user_statistics CASCADE;
DROP TABLE IF EXISTS public.spiritual_vows CASCADE; -- Often linked to users
DROP TABLE IF EXISTS public.users CASCADE;

COMMIT;
