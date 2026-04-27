import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function validateFKIntegrity() {
  console.log('--- VEDIC INSTITUTIONAL OS: FK INTEGRITY VALIDATION ---');
  console.log('Target: identity.users(id)');
  console.log('------------------------------------------------------');

  const checks = [
    { table: 'public.audit_logs', column: 'performed_by_id' },
    { table: 'public.circle_members', column: 'user_id' },
    { table: 'public.circle_posts', column: 'author_id' },
    { table: 'public.circles', column: 'mentor_id' },
    { table: 'public.communication_logs', column: 'user_id' },
    { table: 'public.compliance_tasks', column: 'assigned_to' },
    { table: 'public.contributions', column: 'user_id' },
    { table: 'public.document_versions', column: 'created_by_id' },
    { table: 'public.donation_receipts', column: 'issued_by_id' },
    { table: 'public.donation_receipts', column: 'user_id' },
    { table: 'public.event_registrations', column: 'user_id' },
    { table: 'public.family_links', column: 'related_id' },
    { table: 'public.family_links', column: 'user_id' },
    { table: 'public.family_nodes', column: 'user_id' },
    { table: 'public.guidance_assignments', column: 'guide_id' },
    { table: 'public.guidance_assignments', column: 'student_id' },
    { table: 'public.journal_entries', column: 'approved_by_id' },
    { table: 'public.journal_entries', column: 'created_by_id' },
    { table: 'public.library_downloads', column: 'user_id' },
    { table: 'public.org_members', column: 'user_id' },
    { table: 'public.support_tickets', column: 'assigned_to_id' },
    { table: 'public.support_tickets', column: 'user_id' },
    { table: 'public.transactions', column: 'approved_by_id' },
    { table: 'public.transactions', column: 'recorded_by_id' },
    { table: 'public.user_curve_progress', column: 'user_id' },
    { table: 'public.vedic_events', column: 'host_id' },
    { table: 'public.spiritual_vows', column: 'user_id' },
  ];

  let totalOrphans = 0;

  for (const check of checks) {
    try {
      // Use raw query to check for IDs NOT in identity.users
      const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(*) as count 
        FROM ${check.table} 
        WHERE ${check.column} IS NOT NULL 
        AND ${check.column} NOT IN (SELECT id FROM identity.users)
      `);

      const count = Number(result[0].count);
      
      if (count > 0) {
        console.error(`[INVALID] ${check.table}.${check.column}: ${count} orphaned records found`);
        totalOrphans += count;
      } else {
        console.log(`[SAFE]    ${check.table}.${check.column}: 0 orphans`);
      }
    } catch (error: any) {
      console.error(`[ERROR]   Checking ${check.table}.${check.column}: ${error.message}`);
    }
  }

  console.log('------------------------------------------------------');
  if (totalOrphans === 0) {
    console.log('✅ ALL Foreign Key references are SAFE to repoint.');
  } else {
    console.warn(`❌ FAILED: ${totalOrphans} orphaned references detected across the system.`);
    console.warn('Action: Ensure these records are synced to identity.users before running decommissioning script.');
  }
  console.log('------------------------------------------------------');

  await prisma.$disconnect();
}

validateFKIntegrity();
