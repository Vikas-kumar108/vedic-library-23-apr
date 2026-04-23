import { PrismaClient, UserRole } from '@dharma/data-access'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const MEMBER_DATA = [
  { "fullName": "Radhe Shyam Das", "email": "radhe@example.com", "phone": "+91 98765 43210", "location": "Mayapur", "primaryRole": "Mentor", "spiritualStage": "Sadhaka" },
  { "fullName": "Sita Devi Dasi", "email": "sita.devi@example.com", "phone": "+91 98765 43211", "location": "Mayapur", "primaryRole": "Village Member", "spiritualStage": "Practitioner" },
  { "fullName": "Mohan Sharma", "email": "mohan.sharma@gmail.com", "phone": "+91 98765 43212", "location": "Krishnanagar", "primaryRole": "Mentor", "spiritualStage": "Practitioner" },
  { "fullName": "Anjali Sharma", "email": "anjali.sharma@gmail.com", "phone": "+91 98765 43213", "location": "Krishnanagar", "primaryRole": "Village Member", "spiritualStage": "Seeker" },
  { "fullName": "Vikram Gupta", "email": "vikram.gupta@gmail.com", "phone": "+91 98765 43214", "location": "Kolkata", "primaryRole": "Donor", "spiritualStage": "Practitioner" },
  { "fullName": "Priya Gupta", "email": "priya.gupta@gmail.com", "phone": "+91 98765 43215", "location": "Kolkata", "primaryRole": "Donor", "spiritualStage": "Seeker" },
  { "fullName": "Rahul Verma", "email": "rahul.verma@ngo.org", "phone": "+91 98765 43216", "location": "Delhi", "primaryRole": "Director", "spiritualStage": "Practitioner" },
  { "fullName": "Kavita Verma", "email": "kavita.verma@ngo.org", "phone": "+91 98765 43217", "location": "Delhi", "primaryRole": "Mentor", "spiritualStage": "Sadhaka" },
  { "fullName": "Arjun Singh", "email": "arjun.singh@gmail.com", "phone": "+91 98765 43218", "location": "Varanasi", "primaryRole": "Village Member", "spiritualStage": "Seeker" },
  { "fullName": "Meera Singh", "email": "meera.singh@gmail.com", "phone": "+91 98765 43219", "location": "Varanasi", "primaryRole": "Village Member", "spiritualStage": "Seeker" },
  { "fullName": "Harish Yadav", "email": "harish.yadav@gmail.com", "phone": "+91 98765 43220", "location": "Patna", "primaryRole": "Mentor", "spiritualStage": "Sadhaka" },
  { "fullName": "Lakshmi Yadav", "email": "lakshmi.yadav@gmail.com", "phone": "+91 98765 43221", "location": "Patna", "primaryRole": "Village Member", "spiritualStage": "Practitioner" },
  { "fullName": "Deepak Jain", "email": "deepak.jain@donor.com", "phone": "+91 98765 43222", "location": "Mumbai", "primaryRole": "Donor", "spiritualStage": "Practitioner" },
  { "fullName": "Neha Jain", "email": "neha.jain@donor.com", "phone": "+91 98765 43223", "location": "Mumbai", "primaryRole": "Donor", "spiritualStage": "Seeker" },
  { "fullName": "Suresh Patel", "email": "suresh.patel@gmail.com", "phone": "+91 98765 43224", "location": "Ahmedabad", "primaryRole": "Director", "spiritualStage": "Practitioner" },
  { "fullName": "Pooja Patel", "email": "pooja.patel@gmail.com", "phone": "+91 98765 43225", "location": "Ahmedabad", "primaryRole": "Village Member", "spiritualStage": "Seeker" },
  { "fullName": "Gopal Das", "email": "gopal.das@gmail.com", "phone": "+91 98765 43226", "location": "Mayapur", "primaryRole": "Mentor", "spiritualStage": "Sadhaka" },
  { "fullName": "Rina Dasi", "email": "rina.dasi@gmail.com", "phone": "+91 98765 43227", "location": "Mayapur", "primaryRole": "Village Member", "spiritualStage": "Practitioner" },
  { "fullName": "Amit Tiwari", "email": "amit.tiwari@gmail.com", "phone": "+91 98765 43228", "location": "Lucknow", "primaryRole": "Mentor", "spiritualStage": "Practitioner" },
  { "fullName": "Sunita Tiwari", "email": "sunita.tiwari@gmail.com", "phone": "+91 98765 43229", "location": "Lucknow", "primaryRole": "Village Member", "spiritualStage": "Seeker" }
]

async function main() {
  console.log('🌱 MANIFESTING BATCH 20 COMMUNITY MEMBERS...')
  
  for (const m of MEMBER_DATA) {
    // Role Mapping
    let mappedRole = UserRole.village_member
    if (m.primaryRole === 'Director') mappedRole = UserRole.director
    if (m.primaryRole === 'Mentor') mappedRole = UserRole.mentor
    if (m.primaryRole === 'Donor') mappedRole = UserRole.donor

    // 1. Ensure Journey Stage exists
    const stageNum = m.spiritualStage === 'Seeker' ? 1 : m.spiritualStage === 'Practitioner' ? 2 : 3
    const stage = await prisma.lifeJourneyStage.upsert({
      where: { stageNumber: stageNum },
      update: {
        name: m.spiritualStage,
        slug: m.spiritualStage.toLowerCase()
      },
      create: { 
        stageNumber: stageNum,
        slug: m.spiritualStage.toLowerCase(),
        name: m.spiritualStage, 
        dominantPurushartha: 'dharma',
        description: `${m.spiritualStage} level seeker.`,
        category: 'Spiritual'
      }
    })

    await prisma.user.upsert({
      where: { email: m.email },
      update: {
        full_name: m.fullName,
        phoneNumber: m.phone,
        village: m.location,
        roles: [mappedRole],
        journeyStageId: stage.id
      },
      create: {
        email: m.email,
        full_name: m.fullName,
        phoneNumber: m.phone,
        village: m.location,
        roles: [mappedRole],
        journeyStageId: stage.id,
        isOnline: true
      }
    })
    console.log(`Manifested: ${m.fullName} as ${m.spiritualStage}`)
  }

  console.log('✅ BATCH 20 MANIFESTATION COMPLETE.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
