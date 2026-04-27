import { SeekerState } from './seeker-state.service';

export type SadhanaPlan = {
  morning_practice: string;
  study_focus: string;
  reflection: string;
  discipline: string;
  avoidance: string;
};

/**
 * 🧘 Adaptive Sadhana Engine
 * Responsibility: Generate personalized daily spiritual disciplines based on seeker state.
 */
export class SadhanaService {
  /**
   * generateSadhana: Computes the daily discipline architecture for a seeker.
   */
  static generateSadhana(state: SeekerState): SadhanaPlan {
    const { stage, risk_flags } = state;

    // 1. Handle Drop Risk (Urgent Stabilization)
    if (risk_flags.includes('drop_risk')) {
      return {
        morning_practice: "chant 5–10 minutes of a simple mantra",
        study_focus: "listen to calming Bhakti content",
        reflection: "what is specifically disturbing your mind today?",
        discipline: "consciously reduce digital distractions",
        avoidance: "overconsumption of news and social media"
      };
    }

    // 2. Stage-Based Sadhana Generation
    switch (stage) {
      case 'advanced':
        return {
          morning_practice: "45+ minutes of deep contemplative meditation (Nididhyasana)",
          study_focus: "analytical study of original Shastra commentaries",
          reflection: "contemplate the nature of the Self (Atma-Vichara)",
          discipline: "practice detachment from the results of action (Vairagya)",
          avoidance: "intellectual pride and idle debate"
        };

      case 'intermediate':
        return {
          morning_practice: "structured Japa (108+ repetitions) with breath awareness",
          study_focus: "systematic study of philosophical texts (Bhagavad Gita)",
          reflection: "how can I apply today's wisdom to a specific life challenge?",
          discipline: "maintain a strictly regulated daily schedule",
          avoidance: "inconsistency and sensory overindulgence"
        };

      case 'beginner':
      default:
        return {
          morning_practice: "simple mantra chanting (5-10 minutes) with reverence",
          study_focus: "foundational Dharma stories and core principles",
          reflection: "what is one thing I learned or felt grateful for today?",
          discipline: "prioritize daily consistency over intensity",
          avoidance: "overcomplicating the practice or rushing results"
        };
    }
  }
}
