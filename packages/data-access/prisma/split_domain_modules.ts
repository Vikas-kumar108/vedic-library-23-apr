import * as fs from 'fs';
import * as path from 'path';

const schemaPath = 'prisma/schema.prisma.original';
const modulesDir = 'prisma/modules';

const content = fs.readFileSync(schemaPath, 'utf-8');

const modules: Record<string, string[]> = {
  identity: [
    'spiritual_profiles',
    'user_preferences',
    'user_profiles',
    'user_statistics',
    'users'
  ],
  knowledge: [
    'CommunicationCampaignToLibraryItem',
    'library_downloads',
    'library_items',
    'library_versions',
    'node_relations',
    'node_tags',
    'nodes',
    'shastras',
    'sources',
    'texts',
    'text_versions',
    'text_metadata',
    'text_embeddings',
    'synonyms',
    'tags'
  ],
  finance: [
    'contributions',
    'donation_cause_options',
    'donation_causes',
    'donation_receipts',
    'financial_accounts',
    'financial_periods',
    'grant_allocations',
    'grant_milestones',
    'grants',
    'ledger_snapshots',
    'transactions',
    'utilization_certificates',
    'payment_records',
    'payroll_records'
  ],
  community: [
    'circle_members',
    'circle_posts',
    'circles',
    'event_registrations',
    'family_groups',
    'family_links',
    'family_nodes',
    'org_members',
    'organizations',
    'vedic_events'
  ],
  communication: [
    'communication_campaigns',
    'communication_logs',
    'webhook_events',
    'compliance_tasks'
  ],
  interaction: [
    'guidance_assignments',
    'guidance_sessions',
    'journal_entries',
    'journal_lines',
    'spiritual_vows',
    'support_tickets',
    'user_curve_progress',
    'learning_curves',
    'learning_curve_steps'
  ],
  system: [
    'activity_logs',
    'audit_logs',
    'external_integrations',
    'file_assets',
    'legal_documents',
    'partner_organizations',
    'partner_reports',
    'partner_report_versions',
    'partnerships',
    'subscription_tiers',
    'projects',
    'project_budget_lines',
    'physical_assets',
    'secure_share_links',
    'secure_share_link_documents',
    'document_versions'
  ],
  legacy: [
    'legacy_users',
    'legacy_user_profiles',
    'legacy_user_statistics',
    'legacy_user_preferences',
    'legacy_spiritual_profiles'
  ]
};

const lines = content.split('\n');
let currentModel: string | null = null;
let currentBlock: string[] = [];
const modelContents: Record<string, string> = {};

for (const line of lines) {
  if (line.startsWith('model ')) {
    currentModel = line.split(' ')[1];
    currentBlock = [line];
  } else if (currentModel) {
    currentBlock.push(line);
    if (line.trim().startsWith('}')) {
      modelContents[currentModel] = currentBlock.join('\n');
      currentModel = null;
    }
  }
}

for (const [moduleName, models] of Object.entries(modules)) {
  const moduleContent = models
    .map(m => modelContents[m])
    .filter(Boolean)
    .join('\n\n');
  
  if (moduleContent) {
    fs.writeFileSync(path.join(modulesDir, `${moduleName}.prisma`), moduleContent);
    console.log(`Created ${moduleName}.prisma with ${models.length} models`);
  }
}
