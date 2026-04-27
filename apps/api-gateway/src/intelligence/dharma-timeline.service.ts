import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { PurusharthaService } from './purushartha.service';
import { KarmaService } from './karma.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';

export type DharmaEvent = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  event_date: Date;
  impact: number;
};

export type DharmaTimeline = {
  past: {
    events: DharmaEvent[];
    patterns: string[];
  };
  present: {
    state: any;
    purushartha: any;
    karma_summary: string;
    grihastha_plan: any;
  };
  future: {
    trajectory: string;
    risks: string[];
    opportunities: string[];
  };
};

/**
 * ⏳ Dharma Timeline Service
 * Responsibility: Construct a longitudinal view of the seeker's journey (Past, Present, Future).
 * Refined with Samskara pattern detection and Projection logic.
 */
export class DharmaTimelineService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getTimeline: Synthesizes historical milestones, current state, and evolutionary trajectory.
   */
  async getTimeline(userId: string): Promise<DharmaTimeline> {
    const prisma = this.prisma;

    // 1. Fetch Historical Events (Past)
    const pastEvents = await prisma.dharma_events.findMany({
      where: { user_id: userId },
      orderBy: { event_date: 'asc' },
      take: 50
    });

    // 🔙 Past Pattern Detection
    const pastPatterns: string[] = [];
    const lowImpactEvents = pastEvents.filter(e => e.impact < 0).length;
    const highImpactEvents = pastEvents.filter(e => e.impact > 60).length;

    if (lowImpactEvents >= 3) pastPatterns.push("Cycles of Tension");
    if (highImpactEvents >= 2) pastPatterns.push("Spiritual Breakthroughs Observed");
    if (pastEvents.length > 5 && highImpactEvents / pastEvents.length > 0.5) pastPatterns.push("Sustained Growth Phase");

    // 2. Compute Current State (Present)
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual_profile: true,
        statistics: true,
        karma_events: { take: 5, orderBy: { created_at: 'desc' } }
      }
    });

    if (!user) throw new Error('Seeker context not found for timeline construction.');

    const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
    const sadhana = SadhanaService.generateSadhana(state);
    const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
    const purushartha = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);
    
    const karmaService = new KarmaService(prisma);
    const karma = await karmaService.analyzeKarma(userId);

    // 3. Extrapolate Trajectory (Future Projection Engine)
    let trajectory = "Steady Ascension";
    const risks: string[] = [];
    const opportunities: string[] = [];

    // Projection Logic
    // Rule: IF stable + consistent -> Deepening Wisdom
    if (state.inner_state === 'stable' && state.engagement_score > 70) {
      trajectory = "Deepening Wisdom";
      opportunities.push("Ready for advanced lineage responsibilities.");
    }

    // Rule: IF high karma + high sadhana -> Rapid Evolution
    if (karma.dominant_pattern === 'Steady Practice' && state.engagement_score > 80) {
      trajectory = "Rapid Evolution";
      opportunities.push("Institutional leadership window is opening.");
    }

    // Rule: IF disturbed + irregular -> Risk of Stagnation
    if (state.inner_state === 'disturbed' || state.engagement_score < 40) {
      trajectory = "Risk of Stagnation";
      risks.push("Current internal friction may hinder immediate progression.");
    }

    // Add specific karma risks
    if (karma.dominant_pattern !== 'Steady Practice') {
      risks.push(`Repeating behavioral loops (${karma.dominant_pattern}) require mindful observation.`);
    }

    return {
      past: {
        events: pastEvents.map(e => ({
          id: e.id,
          type: e.type,
          title: e.title,
          description: e.description,
          event_date: e.event_date,
          impact: e.impact
        })),
        patterns: pastPatterns
      },
      present: {
        state: state.inner_state,
        purushartha,
        karma_summary: karma.dominant_pattern,
        grihastha_plan: grihastha
      },
      future: {
        trajectory,
        risks,
        opportunities
      }
    };
  }
}
