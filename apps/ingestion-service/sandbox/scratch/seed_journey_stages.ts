import { PrismaClient, Purushartha } from '@prisma/client'

const prisma = new PrismaClient()

const stages = [
  // CHILDHOOD FOUNDATION (0–12 years)
  { stageNumber: 1, slug: 'infant-dependence', name: 'Infant Dependence (0–2)', category: 'Childhood', minAge: 0, maxAge: 2, authority: 'Mother', focus: 'Security, affection', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 2, slug: 'early-childhood', name: 'Early Childhood (2–5)', category: 'Childhood', minAge: 2, maxAge: 5, authority: 'Mother as Guru', focus: 'Behavior imitation', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 3, slug: 'structured-childhood', name: 'Structured Childhood (5–8)', category: 'Childhood', minAge: 5, maxAge: 8, authority: 'Father + teacher', focus: 'Discipline, obedience', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 4, slug: 'curious-learning', name: 'Curious Learning Phase (8–12)', category: 'Childhood', minAge: 8, maxAge: 12, authority: 'Teacher', focus: 'Inquiry, curiosity', dominantPurushartha: Purushartha.dharma },

  // ADOLESCENCE & IDENTITY FORMATION (12–18)
  { stageNumber: 5, slug: 'early-adolescence', name: 'Early Adolescence (12–14)', category: 'Adolescence', minAge: 12, maxAge: 14, focus: 'Identity confusion', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 6, slug: 'attraction-awakening', name: 'Attraction Awakening (14–16)', category: 'Adolescence', minAge: 14, maxAge: 16, focus: 'Kama begins', dominantPurushartha: Purushartha.kama },
  { stageNumber: 7, slug: 'independence-assertion', name: 'Independence Assertion (16–18)', category: 'Adolescence', minAge: 16, maxAge: 18, focus: 'Ego, independence', dominantPurushartha: Purushartha.dharma },

  // BRAHMACARYA DEVELOPMENT (18–25)
  { stageNumber: 8, slug: 'direction-seeking', name: 'Direction Seeking (18–20)', category: 'Brahmacarya', minAge: 18, maxAge: 20, focus: 'Purpose exploration', dominantPurushartha: Purushartha.artha },
  { stageNumber: 9, slug: 'skill-identity-building', name: 'Skill & Identity Building (20–22)', category: 'Brahmacarya', minAge: 20, maxAge: 22, focus: 'Competence', dominantPurushartha: Purushartha.artha },
  { stageNumber: 10, slug: 'emotional-companion-curiosity', name: 'Emotional Curiosity (21–23)', category: 'Brahmacarya', minAge: 21, maxAge: 23, focus: 'Companionship', dominantPurushartha: Purushartha.kama },
  { stageNumber: 11, slug: 'commitment-prep', name: 'Commitment Preparation (23–25)', category: 'Brahmacarya', minAge: 23, maxAge: 25, focus: 'Marriage readiness', dominantPurushartha: Purushartha.dharma },

  // GRHASTHA ENTRY (25–35)
  { stageNumber: 12, slug: 'newly-married-adjustment', name: 'Newly Married Adjustment (25–28)', category: 'Grihastha', minAge: 25, maxAge: 28, focus: 'Emotional adjustment', dominantPurushartha: Purushartha.kama },
  { stageNumber: 13, slug: 'career-establishment', name: 'Career Establishment (25–30)', category: 'Grihastha', minAge: 25, maxAge: 30, focus: 'Stability, earning', dominantPurushartha: Purushartha.artha },
  { stageNumber: 14, slug: 'early-parenthood', name: 'Early Parenthood (28–32)', category: 'Grihastha', minAge: 28, maxAge: 32, focus: 'Responsibility', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 15, slug: 'dual-pressure', name: 'Dual Pressure Phase (30–35)', category: 'Grihastha', minAge: 30, maxAge: 35, focus: 'Career + family stress', dominantPurushartha: Purushartha.artha },

  // GRHASTHA MATURITY (35–50)
  { stageNumber: 16, slug: 'stability-expansion', name: 'Stability & Expansion (35–40)', category: 'Grihastha', minAge: 35, maxAge: 40, focus: 'Growth, influence', dominantPurushartha: Purushartha.artha },
  { stageNumber: 17, slug: 'social-responsibility', name: 'Social Responsibility (40–45)', category: 'Grihastha', minAge: 40, maxAge: 45, focus: 'Community service', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 18, slug: 'inner-questioning', name: 'Inner Questioning (45–50)', category: 'Grihastha', minAge: 45, maxAge: 50, focus: 'Is this all?', dominantPurushartha: Purushartha.moksha },

  // TRANSITION TO VANAPRASTHA (50–65)
  { stageNumber: 19, slug: 'gradual-detachment', name: 'Gradual Detachment (50–55)', category: 'Vanaprastha', minAge: 50, maxAge: 55, focus: 'Reducing intensity', dominantPurushartha: Purushartha.moksha },
  { stageNumber: 20, slug: 'mentorship-phase', name: 'Mentorship Phase (55–60)', category: 'Vanaprastha', minAge: 55, maxAge: 60, focus: 'Guiding next gen', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 21, slug: 'retirement-adjustment', name: 'Retirement Adjustment (60–65)', category: 'Vanaprastha', minAge: 60, maxAge: 65, focus: 'Identity shift', dominantPurushartha: Purushartha.moksha },

  // VANAPRASTHA / SANNYASA ORIENTATION (65–80)
  { stageNumber: 22, slug: 'grandparental-joy', name: 'Grandparental Joy (65–70)', category: 'Sannyasa', minAge: 65, maxAge: 70, focus: 'Affection w/o control', dominantPurushartha: Purushartha.dharma },
  { stageNumber: 23, slug: 'deep-reflection', name: 'Deep Reflection (70–75)', category: 'Sannyasa', minAge: 70, maxAge: 75, focus: 'Life review', dominantPurushartha: Purushartha.moksha },
  { stageNumber: 24, slug: 'spiritual-intensification', name: 'Spiritual Intensification (75–80)', category: 'Sannyasa', minAge: 75, maxAge: 80, focus: 'Bhakti, detachment', dominantPurushartha: Purushartha.moksha },

  // FINAL STAGES (80+)
  { stageNumber: 25, slug: 'complete-withdrawal', name: 'Complete Withdrawal (80–85)', category: 'Final', minAge: 80, maxAge: 85, focus: 'Minimal engagement', dominantPurushartha: Purushartha.moksha },
  { stageNumber: 26, slug: 'dependence-awareness', name: 'Dependence w/ Awareness (85–90)', category: 'Final', minAge: 85, maxAge: 90, focus: 'Accepting support', dominantPurushartha: Purushartha.moksha },
  { stageNumber: 27, slug: 'departure-prep', name: 'Departure Prep (90+)', category: 'Final', minAge: 90, maxAge: 120, focus: 'Conscious exit', dominantPurushartha: Purushartha.moksha },
  { stageNumber: 28, slug: 'legacy-transmission', name: 'Legacy & Transmission', category: 'Final', minAge: 120, maxAge: 150, focus: 'Passing wisdom', dominantPurushartha: Purushartha.moksha },
]

async function main() {
  console.log('🌱 Seeding 28 Life Journey Stages...')
  for (const s of stages) {
    await prisma.lifeJourneyStage.upsert({
      where: { stageNumber: s.stageNumber },
      update: s,
      create: s,
    })
  }
  console.log('✅ Seeding Complete!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
