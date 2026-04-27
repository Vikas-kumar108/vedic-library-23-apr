import * as fs from 'fs';
import * as path from 'path';

const modulesDir = 'prisma/modules';
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.prisma') && f !== 'legacy.prisma');

const replacements = [
  { from: /legacy_users/g, to: 'users' },
  { from: /legacy_user_profiles/g, to: 'user_profiles' },
  { from: /legacy_user_preferences/g, to: 'user_preferences' },
  { from: /legacy_user_statistics/g, to: 'user_statistics' },
  { from: /legacy_spiritual_profiles/g, to: 'spiritual_profiles' },
  // Clean up auto-generated relation names
  { from: /_([a-z_]*)Tolegacy_users/g, to: '' },
  { from: /users_([a-z_]*)Tolegacy_users/g, to: '$1' }
];

for (const file of files) {
  const filePath = path.join(modulesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  for (const r of replacements) {
    content = content.replace(r.from, r.to as any);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Cleaned up ${file}`);
}
