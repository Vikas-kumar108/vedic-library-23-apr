-- AlterTable
ALTER TABLE "identity"."spiritual_profiles" ADD COLUMN     "current_focus" TEXT,
ADD COLUMN     "current_primary_node_id" UUID,
ADD COLUMN     "last_guided_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "spiritual_profiles" ADD COLUMN     "current_focus" TEXT,
ADD COLUMN     "current_primary_node_id" UUID,
ADD COLUMN     "last_guided_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "audit_logs_performed_by_id_record_id_action_key" ON "audit_logs"("performed_by_id", "record_id", "action");

