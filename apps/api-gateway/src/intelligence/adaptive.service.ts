import { PrismaClient } from '@dharma/data-access';
import { DharmaEventService } from './dharma-event.service';

export type AdaptiveWeights = {
  sadhana_weight: number;
  karma_weight: number;
  mentor_weight: number;
  jyotish_weight: number;
};

export type AdaptiveAdjustments = {
  adjustments: AdaptiveWeights;
  insights: string[];
};

/**
 * 🧬 Adaptive Intelligence Service
 * Responsibility: Adjust guidance weights and analytical priorities based on real-world seeker feedback.
 * Constraints: Weights remain between 0.5 and 1.5.
 */
export class AdaptiveService {
  private eventService: DharmaEventService;
  constructor(private prisma: PrismaClient) {
    this.eventService = new DharmaEventService(prisma);
  }

  /**
   * computeAdjustments: Analyzes historical feedback to personalize the guidance orchestrator's weighting.
   */
  async computeAdjustments(userId: string): Promise<AdaptiveAdjustments> {
    const prisma = this.prisma;

    // 1. Fetch Feedback History & Behavioral Trends
    const [feedback, karmaEvents] = await Promise.all([
      prisma.guidance_feedback.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
        take: 30
      }),
      prisma.karma_events.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
        take: 10
      })
    ]);

    const insights: string[] = [];
    const weights: AdaptiveWeights = {
      sadhana_weight: 1.0,
      karma_weight: 1.0,
      mentor_weight: 1.0,
      jyotish_weight: 1.0
    };

    if (feedback.length === 0 && karmaEvents.length === 0) {
      return { adjustments: weights, insights: ["Our guidance engine is utilizing baseline institutional weights for this cycle."] };
    }

    // 2. Aggregate Feedback by Type
    const aggregates = feedback.reduce((acc, f) => {
      if (!acc[f.guidance_type]) {
        acc[f.guidance_type] = { total: 0, count: 0 };
      }
      acc[f.guidance_type].total += f.rating;
      acc[f.guidance_type].count += 1;
      return acc;
    }, {} as Record<string, { total: number, count: number }>);

    // 3. Apply Behavioral Rules
    const distractionCount = karmaEvents.filter(e => e.type === 'distraction' || e.type === 'avoidance').length;
    const disciplineCount = karmaEvents.filter(e => e.type === 'discipline' || e.type === 'study' || e.type === 'service').length;

    // Rule 4: Struggling repeatedly (High distraction vs low discipline)
    if (distractionCount >= 5 && disciplineCount < 2) {
      weights.mentor_weight = 1.5;
      insights.push("Recent trends suggest a window where direct supportive guidance would be beneficial.");
    }

    // Rule 2: Karma suggestions ignored (High distraction count with low karma feedback rating)
    const karmaFeedback = aggregates['karma'];
    if (karmaFeedback && karmaFeedback.total / karmaFeedback.count < 3 && distractionCount > 3) {
      weights.karma_weight = 0.5; // Reduce priority to avoid overwhelm/friction
      insights.push("We are refining our behavioral reflection layer to better align with your current rhythm.");
    }

    // 4. Feedback Adjustment Rules (0.5 to 1.5 Limit)
    for (const [type, data] of Object.entries(aggregates)) {
      const avg = data.total / data.count;
      const weightKey = `${type}_weight` as keyof AdaptiveWeights;
      if (weights[weightKey] === undefined) continue;

      let adjustment = weights[weightKey];

      // Rule 1 & 3: High feedback rating
      if (avg >= 4.0) {
        adjustment = Math.min(1.5, adjustment + 0.3);
        insights.push(`Your journey shows high resonance with ${type}-based guidance.`);
      } 
      // Low feedback rating
      else if (avg <= 2.5) {
        adjustment = Math.max(0.5, adjustment - 0.3);
      }

      weights[weightKey] = adjustment;
    }

    // 5. Global Trends & Stabilization Tracking
    if (feedback.length > 5 && (feedback.filter(f => f.rating >= 4).length / feedback.length) > 0.8) {
      insights.push("Institutional guidance is achieving a high-fidelity alignment with your current realization.");
      
      // ⏳ Record Dharma Event: Stabilization (If not recently recorded)
      const recentStabilization = await prisma.dharma_events.findFirst({
        where: { user_id: userId, type: 'stabilization' },
        orderBy: { created_at: 'desc' }
      });

      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      if (!recentStabilization || recentStabilization.created_at < oneMonthAgo) {
        await this.eventService.trackGuidanceConsistency(userId, "Core");
      }
    }

    return {
      adjustments: weights,
      insights: Array.from(new Set(insights)) // De-duplicate insights
    };
  }
}
