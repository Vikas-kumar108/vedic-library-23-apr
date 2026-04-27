import { SeekerState } from './seeker-state.service';
import { UserProfile } from '@dharma/contracts';

export type GrihasthaPlan = {
  spiritual_duty: string;
  family_duty: string;
  livelihood_focus: string;
  lifestyle_guidance: string;
  risk_flags: string[];
};

/**
 * 🏠 Grihastha (Householder) Engine
 * Responsibility: Generate Dharmic guidance for seekers living in the world.
 * Balances the four Purusharthas: Dharma, Artha, Kama, and Moksha.
 */
export class GrihasthaService {
  /**
   * generateGrihasthaPlan: Computes a worldly-spiritual roadmap for householders.
   */
  static generateGrihasthaPlan(
    state: SeekerState,
    profile: Partial<UserProfile>
  ): GrihasthaPlan {
    const { stage, risk_flags } = state;
    const lifeStage = profile.life_stage?.toLowerCase() || 'student';
    
    // 1. Determine Spiritual Duty (Moksha Focus)
    let spiritual_duty = "Regular daily prayer and foundational study.";
    if (stage === 'advanced') {
      spiritual_duty = "Cultivate internal detachment while flawlessly performing external duties.";
    } else if (stage === 'intermediate') {
      spiritual_duty = "Integrate weekly Shastra study into your family routine.";
    }

    // 2. Determine Family Duty (Dharma Focus)
    let family_duty = "Perform your family duties with patience and integrity.";
    if (lifeStage === 'married') {
      family_duty = "Maintain marital harmony through mutual respect, care, and shared Dharmic values.";
    } else if (lifeStage === 'parent') {
      family_duty = "Act as a role model; nurture your children's character through Dharmic stories and conduct.";
    }

    // 3. Determine Livelihood Focus (Artha Focus)
    let livelihood_focus = "Perform your professional work as a form of worship (Karma Yoga).";
    if (lifeStage === 'student') {
      livelihood_focus = "Focus primarily on rigorous learning, skill-building, and discipline.";
    }

    // 4. Determine Lifestyle Guidance (Kama/Balance Focus)
    let lifestyle_guidance = "Practice regulated enjoyment and maintain a balanced diet and routine.";
    if (risk_flags.includes('drop_risk')) {
      lifestyle_guidance = "Immediate pressure reduction: Simplify your schedule and prioritize basic sleep and stability.";
    }

    return {
      spiritual_duty,
      family_duty,
      livelihood_focus,
      lifestyle_guidance,
      risk_flags: state.risk_flags
    };
  }
}
