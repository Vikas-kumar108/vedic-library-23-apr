import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { RecommendationService } from './recommendation.service';
import { SadhanaService, SadhanaPlan } from './sadhana.service';
import { GrihasthaService, GrihasthaPlan } from './grihastha.service';
import { PurusharthaService, PurusharthaBalance } from './purushartha.service';
import { MentorService, MentorshipPlan } from './mentor.service';

export type Guidance = {
  message: string;
  next_action: string;
  recommended_node_id: string | null;
  sadhana: SadhanaPlan;
  grihastha: GrihasthaPlan;
  purushartha: PurusharthaBalance;
  mentorship: MentorshipPlan;
};

/**
 * 🏛️ Institutional Guidance Orchestrator
 * Responsibility: Synthesize intelligence and recommendations into a clear directive for the seeker.
 */
export class GuidanceService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getGuidance: Computes the definitive "Next Step" for a seeker.
   */
  async getGuidance(userId: string): Promise<Guidance> {
    const prisma = this.prisma;
    
    // 1. Resolve State
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { 
        profile: true,
        spiritual_profile: true,
        statistics: true
      }
    });

    const mentorService = new MentorService(prisma);

    if (!user) {
      // Default fallback for profile initialization
      const emptySadhana: SadhanaPlan = {
        morning_practice: "initiate profile",
        study_focus: "foundations",
        reflection: "self-inquiry",
        discipline: "consistency",
        avoidance: "distractions"
      };
      
      const emptyGrihastha: GrihasthaPlan = {
        spiritual_duty: "initiate profile",
        family_duty: "maintain stability",
        livelihood_focus: "focus on basics",
        lifestyle_guidance: "balanced routine",
        risk_flags: []
      };

      const emptyPurushartha: PurusharthaBalance = {
        dharma: 0, artha: 0, kama: 0, moksha: 0,
        balance_type: "initializing",
        insight: "Please complete your profile to enable balance analysis."
      };

      return {
        message: "Welcome, seeker. Please initiate your profile to receive guidance.",
        next_action: "complete_profile",
        recommended_node_id: null,
        sadhana: emptySadhana,
        grihastha: emptyGrihastha,
        purushartha: emptyPurushartha,
        mentorship: {
          mentor_required: false,
          reason: "Seeker initialization.",
          urgency: 'low',
          mentorship_type: 'spiritual',
          suggested_action: "Complete profile."
        }
      };
    }

    const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
    
    // 2. Resolve Recommendation
    const recService = new RecommendationService(prisma);
    const recommendation = await recService.suggestNext(userId, state);

    // 3. Orchestrate Guidance Message & Action
    let message = "Continue your journey of wisdom.";
    let next_action = "read_next_node";

    if (state.risk_flags.includes('drop_risk')) {
      message = "We sense some disturbance in your path. Stabilize your practice first to regain clarity.";
      next_action = "daily_chanting";
    } else if (state.stage === 'beginner') {
      message = "Start your journey with foundational wisdom. Focus on the core pillars of Dharma.";
      next_action = "study_foundations";
    } else if (state.stage === 'intermediate') {
      message = "Deepen your understanding by bridging faith with philosophical inquiry.";
      next_action = "explore_philosophy";
    } else if (state.stage === 'advanced') {
      message = "Refine your realization through deep ontological contemplation and Vairagya.";
      next_action = "contemplate_shastra";
    }

    const sadhana = SadhanaService.generateSadhana(state);
    const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
    const mentorship = await mentorService.determineMentorshipNeeds(userId);

    return {
      message,
      next_action,
      recommended_node_id: recommendation?.next_node_id || null,
      sadhana,
      grihastha,
      purushartha: PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha),
      mentorship
    };
  }
}
