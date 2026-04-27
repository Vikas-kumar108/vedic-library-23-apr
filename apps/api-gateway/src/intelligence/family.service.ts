import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { PurusharthaService } from './purushartha.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';
import { HarmonyService, HarmonyAnalysis } from './harmony.service';

export type FamilyMember = {
  id: string;
  name: string;
  role: string;
  life_stage: string;
  inner_state: string;
  risk_flags: string[];
};

export type FamilyDashboard = {
  members: FamilyMember[];
  family_dharma_score: number;
  family_moksha_score: number;
  harmony_score: number;
  alerts: string[];
  recommendation: string;
  harmony_analysis: HarmonyAnalysis;
};

/**
 * 👪 Family Intelligence Engine
 * Responsibility: Aggregate and analyze the spiritual and dharmic state of an entire family unit.
 */
export class FamilyService {
  constructor(private prisma: PrismaClient) {}

  /**
   * getFamilyDashboard: Orchestrates collective intelligence for a family.
   */
  async getFamilyDashboard(familyId: string): Promise<FamilyDashboard> {
    const prisma = this.prisma;

    // 1. Fetch Collective Context
    const familyLinks = await prisma.family_links.findMany({
      where: { family_id: familyId },
      include: {
        users: {
          include: {
            profile: true,
            spiritual_profile: true,
            statistics: true
          }
        }
      }
    });

    if (familyLinks.length === 0) {
      throw new Error('Family unit not found or contains no members.');
    }

    const members: FamilyMember[] = [];
    let totalDharma = 0;
    let totalMoksha = 0;
    const alerts: string[] = [];

    // 2. Compute Individual Intelligence & Aggregate
    for (const link of familyLinks) {
      const user = link.users;
      if (!user) continue;

      const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
      const sadhana = SadhanaService.generateSadhana(state);
      const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
      const balance = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);

      members.push({
        id: user.id,
        name: user.profile?.full_name || 'Seeker',
        role: link.relationship_role || 'member',
        life_stage: user.profile?.life_stage || 'unknown',
        inner_state: user.spiritual_profile?.inner_state || 'unknown',
        risk_flags: state.risk_flags
      });

      totalDharma += balance.dharma;
      totalMoksha += balance.moksha;

      // 3. Collective Alert Detection
      if (state.risk_flags.includes('drop_risk')) {
        alerts.push(`${user.profile?.full_name || 'A member'} may need additional support.`);
      }
      
      if (link.relationship_role === 'parent' && user.spiritual_profile?.inner_state === 'disturbed') {
        alerts.push('Parental instability detected; focus on restoring household harmony.');
      }

      if (link.relationship_role === 'child' && state.engagement_score < 20) {
        alerts.push('Guidance recommended: Seek to increase institutional engagement for the child.');
      }
    }

    // 4. Final Aggregation & Recommendations
    const harmonyService = new HarmonyService(prisma);
    const harmony_analysis = await harmonyService.analyzeFamilyHarmony(familyId);

    const family_dharma_score = Math.round(totalDharma / members.length);
    const family_moksha_score = Math.round(totalMoksha / members.length);

    let recommendation = "Establish a consistent family prayer routine to strengthen shared Dharma.";
    if (harmony_analysis.tensions.length > 0) {
      recommendation = harmony_analysis.summary;
    } else if (alerts.length > 3) {
      recommendation = "Prioritize emotional support and open communication to restore collective alignment.";
    } else if (family_moksha_score > 70) {
      recommendation = "Wonderful collective progress. Consider beginning advanced shared Shastra study.";
    } else if (family_dharma_score < 50) {
      recommendation = "Focus on clearly defining roles and responsibilities within the household.";
    }

    return {
      members,
      family_dharma_score,
      family_moksha_score,
      harmony_score: harmony_analysis.harmony_score,
      alerts,
      recommendation,
      harmony_analysis
    };
  }
}
