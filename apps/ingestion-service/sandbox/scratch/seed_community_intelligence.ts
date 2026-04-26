import { PrismaClient, RelationshipType, UserRole } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const newMembersData = [
  { id: "P021", firstName: "Anjali", lastName: "Sharma", gender: "female", village: "Mayapur", roles: ['village_member'], notes: "Outreach Participant" },
  { id: "P022", firstName: "Kailash", lastName: "Sharma", gender: "male", village: "Mayapur", roles: ['village_member'], notes: "Farmer" },
  { id: "P023", firstName: "Sumati", lastName: "Sharma", gender: "female", village: "Mayapur", roles: ['village_member'], notes: "Householder" },
  { id: "P024", firstName: "Arun", lastName: "Shastri", gender: "male", village: "Varanasi", roles: ['mentor', 'teacher'], notes: "Lead Mentor" },
  { id: "P025", firstName: "Meenakshi", lastName: "Shastri", gender: "female", village: "Varanasi", roles: ['village_member'], notes: "Outreach Participant" },
  { id: "P026", firstName: "Gaurav", lastName: "Shastri", gender: "male", village: "Varanasi", roles: ['student'], notes: "Student" },
  { id: "P027", firstName: "Rajesh", lastName: "Bansal", gender: "male", village: "Kolkata", roles: ['donor'], notes: "Institutional Donor" },
  { id: "P028", firstName: "Om Prakash", lastName: "Bansal", gender: "male", village: "Kolkata", roles: ['village_member'], notes: "Businessman" },
  { id: "P029", firstName: "Kamla", lastName: "Bansal", gender: "female", village: "Kolkata", roles: ['village_member'], notes: "Householder" },
  { id: "P030", firstName: "Vikram", lastName: "Prasad", gender: "male", village: "Delhi", roles: ['admin'], notes: "System Admin" },
  { id: "P031", firstName: "Deepa", lastName: "Prasad", gender: "female", village: "Delhi", roles: ['mentor'], notes: "Spiritual Mentor" },
  { id: "P032", firstName: "Savita", lastName: "Kumari", gender: "female", village: "Patna", roles: ['village_member'], notes: "Outreach Participant" },
  { id: "P033", firstName: "Ramu", lastName: "Yadav", gender: "male", village: "Patna", roles: ['village_member'], notes: "Laborer" },
  { id: "P034", firstName: "Geeta", lastName: "Yadav", gender: "female", village: "Patna", roles: ['village_member'], notes: "Householder" },
  { id: "P035", firstName: "Siddharth", lastName: "Mehta", gender: "male", village: "Mumbai", roles: ['donor', 'outreach_lead'], notes: "Donor & Organizer" },
  { id: "P036", firstName: "Ritu", lastName: "Mehta", gender: "female", village: "Mumbai", roles: ['village_member'], notes: "Participant" },
  { id: "P037", firstName: "Ishaan", lastName: "Mehta", gender: "male", village: "Mumbai", roles: ['student'], notes: "Student" },
  { id: "P038", firstName: "Vasudev", lastName: "Acharya", gender: "male", village: "Rishikesh", roles: ['mentor'], notes: "Senior Mentor" },
  { id: "P039", firstName: "Brijesh", lastName: "Acharya", gender: "male", village: "Rishikesh", roles: ['village_member'], notes: "Retired" },
  { id: "P040", firstName: "Savitri", lastName: "Acharya", gender: "female", village: "Rishikesh", roles: ['village_member'], notes: "Participant" },
]

const relations = [
  { personAId: "P021", personBId: "P022", relationType: "pitara" },
  { personAId: "P021", personBId: "P023", relationType: "matara" },
  { personAId: "P024", personBId: "P025", relationType: "vaivahika" },
  { personAId: "P024", personBId: "P026", relationType: "sahodara" }, // Note: Simple mapping for seed
  { personAId: "P027", personBId: "P028", relationType: "pitara" },
  { personAId: "P027", personBId: "P029", relationType: "matara" },
  { personAId: "P030", personBId: "P031", relationType: "vaivahika" },
  { personAId: "P032", personBId: "P033", relationType: "pitara" },
  { personAId: "P032", personBId: "P034", relationType: "matara" },
  { personAId: "P035", personBId: "P036", relationType: "vaivahika" },
  { personAId: "P038", personBId: "P039", relationType: "pitara" },
  { personAId: "P038", personBId: "P040", relationType: "matara" }
]

async function main() {
  console.log('🌱 SEEDING INTELLIGENT COMMUNITY (Batch 2)...')
  
  const idMap: Record<string, string> = {}

  // 1. Create People
  for (const p of newMembersData) {
    const user = await prisma.user.upsert({
      where: { email: `${p.id.toLowerCase()}@internal.vedic` }, // Using ID-based internal email for uniqueness
      update: {
        full_name: `${p.firstName} ${p.lastName}`,
        gender: p.gender as any,
        village: p.village,
        roles: p.roles as UserRole[],
        notes: p.notes,
      },
      create: {
        full_name: `${p.firstName} ${p.lastName}`,
        email: `${p.id.toLowerCase()}@internal.vedic`,
        gender: p.gender as any,
        village: p.village,
        roles: p.roles as UserRole[],
        isOnline: false,
        notes: p.notes,
        metadata: { externalId: p.id }
      }
    })
    idMap[p.id] = user.id
    console.log(`Synced: ${p.firstName} (${p.id})`)
  }

  // 2. Create Relations
  console.log('🌳 LINKING FAMILY TREES...')
  for (const rel of relations) {
    const userId = idMap[rel.personAId]
    const relatedId = idMap[rel.personBId]
    
    if (userId && relatedId) {
      await prisma.familyLink.create({
        data: {
          userId,
          relatedId,
          type: rel.relationType as RelationshipType
        }
      })
      console.log(`Linked: ${rel.personAId} -> ${rel.personBId} as ${rel.relationType}`)
    }
  }

  console.log('✅ COMMUNITY INTELLIGENCE SEED COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
