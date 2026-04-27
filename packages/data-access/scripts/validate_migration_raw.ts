
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

async function main() {
  const prisma = new PrismaClient()
  
  const tables = [
    { legacy: 'users', identity: 'users', label: 'Users' },
    { legacy: 'user_profiles', identity: 'user_profiles', label: 'User Profiles' },
    { legacy: 'user_preferences', identity: 'user_preferences', label: 'User Preferences' },
    { legacy: 'spiritual_profiles', identity: 'spiritual_profiles', label: 'Spiritual Profiles' },
    { legacy: 'user_statistics', identity: 'user_statistics', label: 'User Statistics' }
  ]

  console.log('--- DATA VALIDATION REPORT ---')
  for (const table of tables) {
    try {
      // 1. Count check
      const [{ count: legacyCount }] = await prisma.$queryRawUnsafe<any>(`SELECT count(*)::int FROM public."${table.legacy}"`)
      const [{ count: identityCount }] = await prisma.$queryRawUnsafe<any>(`SELECT count(*)::int FROM identity."${table.identity}"`)
      
      console.log(`${table.label}:`)
      console.log(`  Public Schema:   ${legacyCount}`)
      console.log(`  Identity Schema: ${identityCount}`)
      
      // 2. ID integrity check (Ensures all legacy IDs are present in identity)
      const idColumn = table.legacy === 'users' ? 'id' : 'user_id'
      const missingRecords = await prisma.$queryRawUnsafe<any>(`
        SELECT "${idColumn}" FROM public."${table.legacy}" 
        WHERE "${idColumn}" NOT IN (SELECT "${idColumn}" FROM identity."${table.identity}")
      `)
      
      if (missingRecords.length === 0) {
        console.log(`  ✅ INTEGRITY: All legacy records present in identity.`)
      } else {
        console.log(`  ❌ INTEGRITY: ${missingRecords.length} records missing in identity!`)
        console.log(`     Missing IDs:`, missingRecords.map((r: any) => r[idColumn]).join(', '))
      }
    } catch (e: any) {
      console.log(`${table.label}: ⚠️ Error - ${e.message}`)
    }
  }
  
  await prisma.$disconnect()
}

main()
