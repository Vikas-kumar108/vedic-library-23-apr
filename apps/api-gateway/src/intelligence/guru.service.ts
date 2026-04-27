import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';
import { PurusharthaService } from './purushartha.service';
import { KarmaService } from './karma.service';
import { JyotishService } from './jyotish.service';
import { SamskaraService } from './samskara.service';
import { MentorService } from './mentor.service';
import { AdaptiveService } from './adaptive.service';
import { DharmaTimelineService } from './dharma-timeline.service';
import { GovernanceService } from './governance.service';

export type UnifiedGuidanceResponse = {
  message: string;
  next_action: string;
  priorities: string[];
  warnings: string[];
  guidance_layers: {
    sadhana: any;
    grihastha: any;
    purushartha: any;
    karma: any;
    jyotish: any;
    samskara: any;
    mentor: any;
    timeline: any;
    governance: any;
  };
  adaptive_insights: string[];
};

/**
 * 🕉️ Guru Service (Unified Guidance Orchestrator)
 * Responsibility: Synthesize all intelligence and governance layers into a single, supportive profile.
 * Note: Strictly applies adaptive weighting and restorative governance.
 */
export class GuruService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getUnifiedGuidance: The primary engine for seeker direction.
   */
  async getUnifiedGuidance(userId: string): Promise<UnifiedGuidanceResponse> {
    const prisma = this.prisma;

    // 1. Initialize Individual Services
    const karmaService = new KarmaService(prisma);
    const jyotishService = new JyotishService(prisma);
    const samskaraService = new SamskaraService(prisma);
    const mentorService = new MentorService(prisma);
    const adaptiveService = new AdaptiveService(prisma);
    const timelineService = new DharmaTimelineService(prisma);
    const governanceService = new GovernanceService(prisma);

    // 2. Fetch User & Compute State
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        spiritual_profile: true,
        statistics: true,
        jyotish_profile: true
      }
    });

    if (!user) throw new Error('Seeker context not found.');

    const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
    
    // 3. Parallel Execution of All Intelligence & Governance Layers
    const [
      sadhana,
      grihastha,
      karma,
      jyotish,
      samskara,
      mentor,
      adaptive,
      timeline,
      governance
    ] = await Promise.all([
      SadhanaService.generateSadhana(state),
      GrihasthaService.generateGrihasthaPlan(state, user.profile || {}),
      karmaService.analyzeKarma(userId),
      jyotishService.getCurrentLifePhase(userId),
      samskaraService.getSamskaraTimeline(userId),
      mentorService.determineMentorshipNeeds(userId),
      adaptiveService.computeAdjustments(userId),
      timelineService.getTimeline(userId),
      governanceService.getGovernanceStatus(userId)
    ]);

    const purushartha = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);

    // 4. Weight-Based Prioritization Logic
    const weights = adaptive.adjustments;
    
    // Define candidate guidance modules with their institutional importance AND adaptive weight
    const candidates = [
      {
        id: 'governance',
        priority: 1.5, // High priority if at risk
        weight: governance.status === 'at_risk' ? 2.0 : 1.0,
        score: 1.5 * (governance.status === 'at_risk' ? 0.5 : 1.0), // Lower score = higher priority
        condition: governance.status !== 'aligned',
        message: governance.status === 'at_risk' ? "Your current alignment requires serious attention. Please review the restorative steps." : "Minor shifts in your alignment suggest a need for restorative focus.",
        next_action: governance.status === 'at_risk' ? "You may consider meeting with your assigned mentor." : "You may consider the suggested restorative directions.",
        label: "Ethical Alignment Support"
      },
      {
        id: 'mentor',
        priority: 2,
        weight: weights.mentor_weight,
        score: 2 / weights.mentor_weight,
        condition: mentor.urgency !== 'none',
        message: "This phase suggests that your journey would benefit from direct guidance.",
        next_action: "You may consider accepting the mentorship link to explore these steps with a guide.",
        label: "Mentorship Guidance Available"
      },
      {
        id: 'karma',
        priority: 3,
        weight: weights.karma_weight,
        score: 3 / weights.karma_weight,
        condition: karma.dominant_pattern !== 'Steady Practice',
        message: `This phase suggests an emerging pattern. You may notice ${karma.patterns[0]?.insight.toLowerCase()}`,
        next_action: `You may consider: ${karma.patterns[0]?.suggestion.toLowerCase()}`,
        label: "Emerging Pattern Reflection"
      }
    ];

    const activeCandidates = candidates.filter(c => c.condition).sort((a, b) => a.score - b.score);

    // 5. Final Synthesis
    let message = "Your spiritual and social duties appear to be in healthy alignment.";
    let next_action = "It would be beneficial to continue your daily Sadhana and remain observant of your emerging patterns.";
    const priorities: string[] = [];
    const warnings: string[] = [];

    // Priority 1: High-risk states (Absolute Top)
    if (state.inner_state === 'disturbed' || state.risk_flags.length > 0) {
      message = "You may notice some instability. You may consider grounding your daily practice before expanding further.";
      next_action = "It would be beneficial to engage in silent contemplation today.";
      warnings.push(...state.risk_flags);
    } 
    // Apply best candidate from weighted list (including governance)
    else if (activeCandidates.length > 0) {
      const top = activeCandidates[0];
      message = top.message;
      next_action = top.next_action;
      priorities.push(top.label);
    }
    // Default Progression
    else {
      priorities.push(`Ongoing Consideration: ${sadhana.primary_focus}`);
    }

    priorities.push("Guidance is optional; a mentor can assist with further personalization.");

    return {
      message,
      next_action,
      priorities,
      warnings,
      guidance_layers: {
        sadhana,
        grihastha,
        purushartha,
        karma,
        jyotish,
        samskara,
        mentor,
        timeline,
        governance
      },
      adaptive_insights: adaptive.insights
    };
  }
}
