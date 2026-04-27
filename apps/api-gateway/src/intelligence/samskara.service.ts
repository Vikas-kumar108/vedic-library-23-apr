import { PrismaClient } from '@dharma/data-access';

export type SamskaraItem = {
  type: string;
  recommended_age: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
};

export type SamskaraTimeline = {
  upcoming: SamskaraItem[];
  overdue: SamskaraItem[];
  completed: string[];
};

/**
 * 🕉️ Samskara Intelligence Service
 * Responsibility: Provide guiding insights on traditional life-stage milestones.
 */
export class SamskaraService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getSamskaraTimeline: Orchestrates the detection of traditional life-stage milestones.
   */
  async getSamskaraTimeline(userId: string): Promise<SamskaraTimeline> {
    const prisma = this.prisma;

    // 1. Fetch Seeker & Samskara History
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual_profile: true,
        samskaras: true
      }
    });

    if (!user) throw new Error('User context not found for Samskara analysis.');

    const age = user.profile?.date_of_birth 
      ? new Date().getFullYear() - new Date(user.profile.date_of_birth).getFullYear() 
      : null;
    
    const ageGroup = user.spiritual_profile?.age_group || 'adult';
    const lifeStage = user.spiritual_profile?.life_stage || 'unmarried';
    const innerState = user.spiritual_profile?.inner_state || 'seeking';
    const eligibility = user.spiritual_profile?.eligibility_level || 1;

    const completedTypes = user.samskaras.filter(s => s.status === 'COMPLETED').map(s => s.type);

    const upcoming: SamskaraItem[] = [];
    const overdue: SamskaraItem[] = [];

    // Helper: Push based on age range
    const evaluate = (type: string, minAge: number, maxAge: number, message: string, condition: boolean) => {
      if (completedTypes.includes(type) || !condition) return;

      const item: SamskaraItem = {
        type,
        recommended_age: `${minAge}-${maxAge}`,
        message,
        urgency: 'medium'
      };

      if (age !== null) {
        if (age > maxAge) {
          item.urgency = 'high';
          overdue.push(item);
        } else if (age >= minAge) {
          upcoming.push(item);
        }
      } else {
        upcoming.push(item);
      }
    };

    // 2. Logic: Birth & Naming
    evaluate('birth', 0, 0, "Traditionally, this milestone records the beginning of your institutional journey.", true);
    evaluate('naming', 0, 1, "You may consider the Namakarana milestone to formalize your institutional identity.", true);

    // 3. Logic: Education
    evaluate('education_start', 5, 7, "Traditionally, this stage includes the beginning of structured institutional learning.", ageGroup === 'child');

    // 4. Logic: Initiation
    evaluate('initiation', 12, 25, "You may consider exploring readiness for formal spiritual initiation (Diksha).", ageGroup === 'teen' || ageGroup === 'young_adult');

    // 5. Logic: Marriage
    evaluate('marriage', 20, 35, "Traditionally, this stage marks the entry into Grihastha (householder) life.", lifeStage === 'unmarried' && (ageGroup === 'adult' || ageGroup === 'young_adult'));

    // 6. Logic: Vanaprastha
    evaluate('vanaprastha_transition', 50, 65, "You may consider a transition toward a more contemplative life at this stage.", lifeStage === 'married' && (ageGroup === 'senior' || (age !== null && age >= 50)));

    // 7. Logic: Renunciation
    const isDetached = innerState === 'stable' || eligibility > 8;
    evaluate('renunciation', 60, 100, "Traditionally, this stage involves a full commitment to transcendental realization.", isDetached && lifeStage === 'vanaprastha');

    return {
      upcoming,
      overdue,
      completed: completedTypes as string[]
    };
  }
}
