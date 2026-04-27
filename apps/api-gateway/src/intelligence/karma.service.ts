import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { PurusharthaService } from './purushartha.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';

export type KarmaPattern = {
  type: string;
  frequency: number;
  insight: string;
  suggestion: string;
};

export type KarmaAnalysis = {
  patterns: KarmaPattern[];
  dominant_pattern: string;
  growth_direction: string;
};

/**
 * 🌀 Karma Intelligence Engine
 * Responsibility: Detect repeating patterns in behavior with an empowering, reflective tone.
 */
export class KarmaService {
  constructor(private prisma: PrismaClient) {}

  /**
   * analyzeKarma: Detects behavioral trends and provides high-fidelity evolutionary support.
   */
  async analyzeKarma(userId: string): Promise<KarmaAnalysis> {
    const prisma = this.prisma;

    // 1. Fetch Behavioral History
    const events = await prisma.karma_events.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 20
    });

    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual_profile: true,
        statistics: true
      }
    });

    if (!user) throw new Error('User context not found for Karma analysis.');

    const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);

    // 2. Pattern Detection Logic (Empowering framing)
    const patterns: KarmaPattern[] = [];
    const eventCounts = events.reduce((acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Rule 1: Distraction (Framing: "You may notice a trend...")
    if ((eventCounts['distraction'] || 0) >= 3 && state.engagement_score < 50) {
      patterns.push({
        type: "focus_drift",
        frequency: eventCounts['distraction'] || 0,
        insight: "A pattern is emerging where initial focus occasionally drifts into distraction.",
        suggestion: "You may find that a fixed routine stabilizes your daily practice and restores clarity."
      });
    }

    // Rule 2: Conflict (Framing: "A pattern is emerging...")
    if ((eventCounts['conflict'] || 0) >= 2) {
      patterns.push({
        type: "relational_rhythm",
        frequency: eventCounts['conflict'] || 0,
        insight: "A pattern is emerging of recurring relational friction in recent cycles.",
        suggestion: "You may notice that pausing before reacting to external stimuli brings greater internal harmony."
      });
    }

    // Rule 3: Avoidance
    if ((eventCounts['avoidance'] || 0) >= 2 && (eventCounts['study'] || 0) < 2) {
      patterns.push({
        type: "duty_hesitation",
        frequency: eventCounts['avoidance'] || 0,
        insight: "A pattern is emerging of subtle hesitation toward core institutional duties.",
        suggestion: "You may notice that re-engaging with basic study provides the clarity needed to overcome this hesitation."
      });
    }

    // Rule 4: Positive Growth
    if ((eventCounts['study'] || 0) >= 3 && (eventCounts['service'] || 0) >= 2) {
      patterns.push({
        type: "active_ascension",
        frequency: (eventCounts['study'] || 0) + (eventCounts['service'] || 0),
        insight: "A powerful pattern of shared study and service is emerging in your journey.",
        suggestion: "You may notice that this momentum creates a profound window for deeper institutional contribution."
      });
    }

    // 3. Dominant Trend & Growth Direction
    const dominant_pattern = patterns.length > 0 
      ? patterns.reduce((prev, current) => (prev.frequency > current.frequency) ? prev : current).type
      : "Steady Practice";

    const sadhana = SadhanaService.generateSadhana(state);
    const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
    const balance = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);

    let growth_direction = "Internalization";
    if (balance.moksha > 60) growth_direction = "Transcendental Depth";
    else if (balance.dharma > 60) growth_direction = "Communal Leadership";
    else if (balance.artha > 60) growth_direction = "Grihastha Stability";

    return {
      patterns,
      dominant_pattern,
      growth_direction
    };
  }
}
