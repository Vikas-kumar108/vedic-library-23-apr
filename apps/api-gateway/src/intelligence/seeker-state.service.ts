import { User, SpiritualProfile, UserStatistic } from '@dharma/contracts';

export type SeekerState = {
  stage: 'beginner' | 'intermediate' | 'advanced';
  focus: 'dharma' | 'artha' | 'kama' | 'moksha';
  stability_score: number;
  engagement_score: number;
  risk_flags: string[];
};

/**
 * 🧘 Seeker State Engine
 * Responsibility: Convert raw seeker data into actionable intelligence.
 */
export class SeekerStateService {
  /**
   * computeState: Derives a high-level state from raw database models.
   */
  static computeState(
    user: Partial<User>,
    spiritualProfile?: Partial<SpiritualProfile> | null,
    statistics?: Partial<UserStatistic> | null
  ): SeekerState {
    const eligibility = spiritualProfile?.eligibility_level || 1;
    const innerState = spiritualProfile?.inner_state || 'seeking';
    const nodesRead = statistics?.nodes_read_count || 0;
    const coursesDone = statistics?.courses_completed || 0;

    // 1. Stage Mapping
    let stage: SeekerState['stage'] = 'beginner';
    if (eligibility >= 6) stage = 'advanced';
    else if (eligibility >= 3) stage = 'intermediate';

    // 2. Focus Mapping (Default to Dharma if not specified)
    const focus = (spiritualProfile?.current_focus?.toLowerCase() as SeekerState['focus']) || 'dharma';

    // 3. Stability Score Calculation
    const stabilityMap: Record<string, number> = {
      disturbed: 20,
      confused: 40,
      seeking: 60,
      stable: 80,
      detached: 95,
    };
    const stability_score = stabilityMap[innerState] || 60;

    // 4. Engagement Score Calculation
    // Base formula: (Nodes * 2) + (Courses * 10), capped at 100
    const engagement_score = Math.min(100, nodesRead * 2 + coursesDone * 10);

    // 5. Risk Flags Logic
    const risk_flags: string[] = [];
    if (innerState === 'disturbed' && engagement_score < 30) {
      risk_flags.push('drop_risk');
    }
    if (innerState === 'confused' && nodesRead === 0) {
      risk_flags.push('guidance_needed');
    }

    return {
      stage,
      focus,
      stability_score,
      engagement_score,
      risk_flags,
    };
  }
}
