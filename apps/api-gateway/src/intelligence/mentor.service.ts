import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { PurusharthaService } from './purushartha.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';
import { HarmonyService } from './harmony.service';

export type MentorshipType = 'spiritual' | 'emotional' | 'family' | 'advanced_study';
export type MentorshipUrgency = 'low' | 'medium' | 'high';

export type MentorshipPlan = {
  mentor_required: boolean;
  reason: string;
  urgency: MentorshipUrgency;
  suggested_mentor_id?: string;
  mentorship_type: MentorshipType;
  suggested_action: string;
};

/**
 * 🎓 Mentor Intelligence Engine
 * Responsibility: Determine when human guidance is available to assist the seeker further.
 */
export class MentorService {
  constructor(private prisma: PrismaClient) {}

  /**
   * determineMentorshipNeeds: Orchestrates multi-dimensional analysis to offer mentorship support.
   */
  async determineMentorshipNeeds(userId: string): Promise<MentorshipPlan> {
    const prisma = this.prisma;

    // 1. Fetch Seeker Context
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual_profile: true,
        statistics: true,
        family_links: true
      }
    });

    if (!user) throw new Error('User context not found for mentorship analysis.');

    // 2. Compute Individual State
    const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
    const sadhana = SadhanaService.generateSadhana(state);
    const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
    const balance = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);

    // 3. Compute Collective Harmony (if family exists)
    let harmonyAnalysis = null;
    if (user.family_links.length > 0) {
      const harmonyService = new HarmonyService(prisma);
      harmonyAnalysis = await harmonyService.analyzeFamilyHarmony(user.family_links[0].family_id);
    }

    // 4. Decision Logic based on refined rules
    let mentor_required = false;
    let reason = "Your current path is stable and autonomous.";
    let urgency: MentorshipUrgency = 'low';
    let mentorship_type: MentorshipType = 'spiritual';
    let suggested_action = "Continue your daily practice and self-study.";

    const innerDisturbed = user.spiritual_profile?.inner_state === 'disturbed' || user.spiritual_profile?.inner_state === 'confused';
    const isDropRisk = state.risk_flags.includes('drop_risk');

    // RULE 1: SUPPORTIVE INTERVENTION (Disturbed + Drop Risk)
    if (innerDisturbed && isDropRisk) {
      mentor_required = true;
      reason = "A mentor can assist you in navigating current inner disturbances and practice stability.";
      urgency = 'high';
      mentorship_type = 'spiritual';
      suggested_action = "Consider a restorative dialogue with a spiritual guide to deepen your clarity.";
    }

    // RULE 2 & 4: HOUSEHOLD ALIGNMENT
    else if (harmonyAnalysis) {
      const highTensions = harmonyAnalysis.tensions.filter(t => t.severity === 'high');
      const multipleAffected = harmonyAnalysis.tensions.length > 2;

      if (highTensions.length > 0 || multipleAffected) {
        mentor_required = true;
        reason = "Institutional guidance is available to support your household's shared alignment and harmony.";
        urgency = 'medium';
        mentorship_type = 'family';
        suggested_action = "A mentor can assist your family in a household harmony workshop.";
      }
    }

    // RULE 3: ADVANCED EMPOWERMENT
    if (!mentor_required && state.stage === 'advanced' && balance.moksha > 80) {
      mentor_required = true;
      reason = "You have reached an advanced stage where an Overseer can assist you with specialized ontological study.";
      urgency = 'low';
      mentorship_type = 'advanced_study';
      suggested_action = "Connect with an Overseer to explore deep-dive Shastra mentorship.";
    }

    // RULE 5: EMPOWERED AUTONOMY
    if (!mentor_required && !innerDisturbed && !isDropRisk && state.engagement_score > 50) {
      mentor_required = false;
      reason = "Your autonomous practice is thriving. Continue your journey with consistency.";
    }

    // 5. Mentor Matching Logic
    let suggested_mentor_id: string | undefined;
    if (mentor_required) {
      const seekerSvabhava = user.spiritual_profile?.svabhava || 'unknown';
      const seekerLevel = user.spiritual_profile?.eligibility_level || 1;

      const mentors = await prisma.users.findMany({
        where: {
          role: { in: ['mentor', 'teacher'] },
          spiritual_profile: {
            eligibility_level: { gt: seekerLevel },
            svabhava: seekerSvabhava,
            inner_state: 'stable'
          }
        },
        take: 1
      });

      if (mentors.length > 0) {
        suggested_mentor_id = mentors[0].id;
      } else {
        const fallbackMentor = await prisma.users.findFirst({
          where: { 
            role: { in: ['mentor', 'teacher'] },
            spiritual_profile: {
              eligibility_level: { gt: seekerLevel },
              inner_state: 'stable'
            }
          }
        });
        suggested_mentor_id = fallbackMentor?.id;
      }
    }

    return {
      mentor_required,
      reason,
      urgency,
      suggested_mentor_id,
      mentorship_type,
      suggested_action
    };
  }
}
