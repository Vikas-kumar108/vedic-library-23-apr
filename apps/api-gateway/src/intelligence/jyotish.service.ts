import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { PurusharthaService } from './purushartha.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';

export type JyotishPhase = {
  current_phase: string;
  focus: string[];
  challenges: string[];
  opportunities: string[];
};

/**
 * 🌠 Jyotish Intelligence Service
 * Responsibility: Map the seeker's temporal journey with grounded, wise alignment.
 */
export class JyotishService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getCurrentLifePhase: Computes current institutional life phase with a focus on wise guidance over prediction.
   */
  async getCurrentLifePhase(userId: string): Promise<JyotishPhase> {
    const prisma = this.prisma;

    // 1. Fetch User Context
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual_profile: true,
        statistics: true,
        jyotish_profile: true
      }
    });

    if (!user) throw new Error('User context not found for Jyotish analysis.');

    const age = user.profile?.date_of_birth 
      ? new Date().getFullYear() - new Date(user.profile.date_of_birth).getFullYear() 
      : null;

    // 2. Base Phase Logic (Framer: "This phase favors...")
    let current_phase = "Foundation";
    let focus = ["learning", "discipline", "values"];
    let challenges: string[] = [];
    let opportunities: string[] = [];

    if (age !== null) {
      if (age <= 12) {
        current_phase = "Foundation";
        focus = ["establishing basic discipline", "absorption of values"];
      } else if (age <= 25) {
        current_phase = "Formation";
        focus = ["clarifying direction", "skill acquisition"];
      } else if (age <= 50) {
        current_phase = "Responsibility";
        focus = ["family stability", "occupational duty"];
      } else if (age <= 70) {
        current_phase = "Transition";
        focus = ["gradual detachment", "offering mentorship"];
      } else {
        current_phase = "Renunciation";
        focus = ["deep spiritual withdrawal", "transcendental depth"];
      }
    }

    // 3. Adapt using Inner State (Framer: "Be mindful of...")
    const innerState = user.spiritual_profile?.inner_state;
    if (innerState === 'disturbed' || innerState === 'confused') {
      challenges.push("Be mindful of internal emotional fluctuations");
    } else if (innerState === 'stable') {
      opportunities.push("This phase favors high mental clarity");
    }

    // 4. Adapt using Purushartha
    const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
    const sadhana = SadhanaService.generateSadhana(state);
    const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
    const balance = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);

    if (balance.moksha > 70) {
      opportunities.push("This phase favors accelerated spiritual growth");
      focus.push("advanced ontological study");
    }

    if (balance.artha > 70 && current_phase === 'Responsibility') {
      challenges.push("Be mindful of worldly engagement pressures");
    }

    if (balance.dharma > 80) {
      opportunities.push("This phase favors communal leadership and service");
    }

    return {
      current_phase,
      focus,
      challenges,
      opportunities
    };
  }
}
