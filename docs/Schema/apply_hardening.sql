-- Applying Elite Hardening to the synchronized database
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_amount_positive" CHECK (amount > 0);
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_amount_positive" CHECK (amount > 0 OR amount IS NULL);
ALTER TABLE "family_links" ADD CONSTRAINT "family_links_user_id_related_id_type_key" UNIQUE ("user_id", "related_id", "type");
ALTER TABLE "donation_receipts" ADD CONSTRAINT "donation_receipts_amount_positive" CHECK (amount > 0);
ALTER TABLE "donation_cause_options" ADD CONSTRAINT "donation_cause_options_amount_positive" CHECK (suggested_amount > 0);

-- 1. Immutable Ledger Protection
CREATE OR REPLACE FUNCTION protect_immutable_ledger()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status = 'APPROVED' THEN
        RAISE EXCEPTION 'PERMISSION_DENIED: Cannot modify an approved transaction.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_immutable_ledger ON "transactions";
CREATE TRIGGER trigger_immutable_ledger
BEFORE UPDATE OR DELETE ON "transactions"
FOR EACH ROW EXECUTE FUNCTION protect_immutable_ledger();

-- 2. Automated Financial Auditing (Ecosystem Truth)
CREATE OR REPLACE FUNCTION log_transaction_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "audit_logs" (
        "id", "transaction_id", "action", "performed_by_id", "old_data", "new_data", "timestamp"
    ) VALUES (
        uuid_generate_v4(), OLD.id, TG_OP, NEW.recorded_by_id, row_to_json(OLD), row_to_json(NEW), CURRENT_TIMESTAMP
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_transaction_audit ON "transactions";
CREATE TRIGGER trigger_transaction_audit
AFTER UPDATE ON "transactions"
FOR EACH ROW EXECUTE FUNCTION log_transaction_change();

-- 3. Soft Delete Performance & Heritage Indices
CREATE INDEX IF NOT EXISTS idx_users_active ON "users" (id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_shastras_active ON "shastras" (id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_nodes_active ON "nodes" (id) WHERE deleted_at IS NULL;

-- 4. Knowledge Distribution & Engagement Indices
CREATE INDEX IF NOT EXISTS idx_lib_downloads ON "library_downloads" ("library_item_id", "user_id");
CREATE INDEX IF NOT EXISTS idx_lib_type ON "library_items" ("type", "language");
CREATE INDEX IF NOT EXISTS idx_comm_lib ON "communication_logs" ("library_item_id");
