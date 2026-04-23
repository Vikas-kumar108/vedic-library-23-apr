import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const situations = [
  // Phase 1: Formative
  { slug: 'mother-guru', name: '0-5 Years (Matṛ-Guru)', category: 'Childhood' },
  { slug: 'father-charge', name: '5-10 Years (Pitṛ-Upadesha)', category: 'Childhood' },
  { slug: 'spiritual-foundation', name: '10-15 Years (Vidyarthi)', category: 'Childhood' },
  
  // Phase 2: Student
  { slug: 'teenage-curiosity', name: 'Early Teenage', category: 'Student' },
  { slug: 'career-prep', name: 'Advanced Studies (Artha-Prep)', category: 'Student' },
  { slug: 'swadharma-alignment', name: 'Pre-Vocational Alignment', category: 'Student' },
  
  // Phase 3: Householder
  { slug: 'pre-marriage', name: 'The Seeker (Pre-Marriage)', category: 'Householder' },
  { slug: 'newly-married', name: 'Newly Married (Vivaha-Prarambha)', category: 'Householder' },
  { slug: 'young-parent', name: 'Young Parent', category: 'Householder' },
  { slug: 'ethical-provider', name: 'The Provider (Artha-Siddhi)', category: 'Householder' },
  { slug: 'community-pillar', name: 'Social Pillar', category: 'Householder' },
  
  // Phase 4: Transition
  { slug: 'wisdom-guide', name: 'The Guide (Mentoring)', category: 'Transition' },
  { slug: 'detachment-practice', name: 'Detachment Practice', category: 'Transition' },
  { slug: 'grandparenting', name: 'Grandparenting (Vatsalya)', category: 'Transition' },
  
  // Phase 5: Liberation
  { slug: 'spiritual-liberation', name: 'Moksha-Sadhana', category: 'Liberation' },
  { slug: 'universal-service', name: 'Universal Service', category: 'Liberation' },
]

async function main() {
  console.log('🌱 Seeding Life Situations...')
  for (const s of situations) {
    await prisma.lifeSituation.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    })
  }
  console.log('✅ Seeding Complete!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
