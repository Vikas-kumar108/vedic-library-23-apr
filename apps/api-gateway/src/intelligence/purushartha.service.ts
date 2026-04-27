import { SeekerState } from './seeker-state.service';
import { SadhanaPlan } from './sadhana.service';
import { GrihasthaPlan } from './grihastha.service';

export type PurusharthaBalance = {
  dharma: number;
  artha: number;
  kama: number;
  moksha: number;
  balance_type: string;
  insight: string;
};

/**
 * 🧘 Purushartha Balance Engine
 * Responsibility: Compute and analyze the balance between the four aims of life.
 */
export class PurusharthaService {
  /**
   * computePurusharthaBalance: Analyzes seeker data to derive a balance profile.
   */
  static computePurusharthaBalance(
    state: SeekerState,
    sadhana: SadhanaPlan,
    grihastha: GrihasthaPlan
  ): PurusharthaBalance {
    // 1. Compute Base Scores (0-100)
    
    // DHARMA: Family duty + Discipline consistency
    let dharma = 60;
    if (grihastha.family_duty.includes('harmony') || grihastha.family_duty.includes('respect')) dharma += 20;
    if (sadhana.discipline.includes('consistency') || sadhana.discipline.includes('regulated')) dharma += 20;
    dharma = Math.min(100, dharma);

    // ARTHA: Livelihood focus + Professional stability
    let artha = 50;
    if (grihastha.livelihood_focus.includes('skill-building') || grihastha.livelihood_focus.includes('worship')) artha += 30;
    if (state.engagement_score > 50) artha += 20;
    artha = Math.min(100, artha);

    // KAMA: Lifestyle balance (not excess, not suppression)
    let kama = 70;
    if (state.risk_flags.includes('drop_risk')) kama -= 40; // Imbalance due to high stress
    if (grihastha.lifestyle_guidance.includes('regulated') || grihastha.lifestyle_guidance.includes('balanced')) kama += 20;
    kama = Math.max(10, Math.min(100, kama));

    // MOKSHA: Sadhana + Inner State + Detachment
    let moksha = state.stability_score;
    if (sadhana.morning_practice.includes('meditation') || sadhana.morning_practice.includes('japa')) moksha += 20;
    if (state.stage === 'advanced') moksha += 20;
    moksha = Math.min(100, moksha);

    // 2. Detect Balance Type & Imbalance
    let balance_type = "balanced_path";
    let insight = "Your life aims are currently in a harmonious state of progression.";

    const scores = { dharma, artha, kama, moksha };
    const maxScore = Math.max(...Object.values(scores));
    const minScore = Math.min(...Object.values(scores));
    const dominant = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore);
    const deficient = Object.keys(scores).find(key => scores[key as keyof typeof scores] === minScore);

    if (maxScore - minScore > 40) {
      if (dominant === 'dharma') {
        balance_type = "dharma_dominant";
        insight = "Your commitment to duty is exemplary, but ensure you don't neglect other practical aspects of life.";
      } else if (dominant === 'artha') {
        balance_type = "artha_dominant";
        insight = "You are highly focused on livelihood and success. Remember to integrate spiritual practice to maintain long-term peace.";
      } else if (dominant === 'kama') {
        balance_type = "kama_imbalance";
        insight = "Current sensory or lifestyle demands are high. Regulate your habits to restore institutional focus.";
      }
    }

    if (minScore < 40) {
      if (deficient === 'moksha') {
        balance_type = "spiritual_neglect";
        insight = "Your inner growth is currently secondary to worldly demands. Prioritize your daily Sadhana to regain spiritual momentum.";
      } else if (deficient === 'artha') {
        balance_type = "artha_deficient";
        insight = "Your professional or practical foundations need attention to ensure a stable platform for your spiritual journey.";
      }
    }

    return {
      dharma,
      artha,
      kama,
      moksha,
      balance_type,
      insight
    };
  }
}
