import { PrismaClient } from '@dharma/data-access';
import { PurusharthaService } from './purushartha.service';
import { SeekerStateService } from './seeker-state.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';
import { HarmonyService } from './harmony.service';

export type CommunityHealth = {
  population: number;
  dharma_score: number;
  moksha_score: number;
  harmony_score: number;
  risk_flags: string[];
  insights: string[];
  recommendations: string[];
};

/**
 * 🏘️ Community Intelligence Service
 * Responsibility: Provide a unified view of our community's shared progress.
 */
export class CommunityService {
  constructor(private prisma: PrismaClient) {}

  /**
   * analyzeCommunityHealth: Aggregates individual seeker metrics into a collective profile of unity.
   */
  async analyzeCommunityHealth(communityId: string): Promise<CommunityHealth> {
    const prisma = this.prisma;
    const harmonyService = new HarmonyService(prisma);

    // 1. Fetch Community Members with Profiles
    const members = await prisma.community_members.findMany({
      where: { community_id: communityId },
      include: {
        user: {
          include: {
            profile: true,
            spiritual_profile: true,
            statistics: true,
            family_links_as_user: true
          }
        }
      }
    });

    const population = members.length;
    if (population === 0) {
      return {
        population: 0,
        dharma_score: 100,
        moksha_score: 100,
        harmony_score: 100,
        risk_flags: [],
        insights: ["Our community is ready to welcome its first seekers."],
        recommendations: ["Begin institutional outreach to invite participants."]
      };
    }

    // 2. Aggregate Metrics
    let totalDharma = 0;
    let totalMoksha = 0;
    let totalHarmony = 0;
    let disturbedCount = 0;
    let youthDisturbedCount = 0;
    let lowEngagementCount = 0;
    
    const uniqueFamilyIds = new Set<string>();

    for (const member of members) {
      const user = member.user;
      const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
      const sadhana = SadhanaService.generateSadhana(state);
      const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
      const balance = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);

      totalDharma += (balance.dharma + (state.engagement_score * 0.5)); 
      
      const innerStateScore = user.spiritual_profile?.inner_state === 'stable' ? 100 : 50;
      totalMoksha += (balance.moksha + innerStateScore) / 2;

      if (user.spiritual_profile?.inner_state === 'disturbed') {
        disturbedCount++;
        if (user.spiritual_profile?.age_group === 'teen' || user.spiritual_profile?.age_group === 'young_adult') {
          youthDisturbedCount++;
        }
      }

      if (state.engagement_score < 30) lowEngagementCount++;

      if (user.family_links_as_user.length > 0) {
        uniqueFamilyIds.add(user.family_links_as_user[0].family_id);
      }
    }

    let totalHarmonyPoints = 0;
    for (const familyId of Array.from(uniqueFamilyIds)) {
      const alignment = await harmonyService.analyzeFamilyHarmony(familyId);
      totalHarmonyPoints += alignment.harmony_score;
    }
    const harmony_score = uniqueFamilyIds.size > 0 
      ? Math.round(totalHarmonyPoints / uniqueFamilyIds.size)
      : Math.round(totalDharma / population);

    const dharma_score = Math.round(totalDharma / population / 1.5); 
    const moksha_score = Math.round(totalMoksha / population);

    // 3. Generate Shared Observations (Non-identifiable)
    const risk_flags: string[] = [];
    if (disturbedCount > population * 0.3) risk_flags.push("We are observing a shared need for inner state stabilization.");
    if (uniqueFamilyIds.size > 0 && harmony_score < 70) risk_flags.push("Opportunities for deeper collective family alignment detected.");
    if (lowEngagementCount > population * 0.4) risk_flags.push("A communal focus on inspired engagement is recommended.");

    // 4. Generate Unified Insights & Recommendations
    const insights: string[] = [];
    const recommendations: string[] = [];

    if (dharma_score > 70 && moksha_score < 50) {
      insights.push("Our community shows strong shared Dharma, with an opportunity to elevate our collective Moksha focus.");
      recommendations.push("Introduce guided Shastra study sessions for our shared spiritual growth.");
    }

    if (youthDisturbedCount > population * 0.15) {
      insights.push("We are detecting a collective need for youth-focused support and inner clarity.");
      recommendations.push("Initiate collective Kirtan and youth-focused mentorship circles for our shared progress.");
    }

    if (harmony_score < 60) {
      insights.push("Relational harmony within our household clusters is a focus for shared growth.");
      recommendations.push("Offer supportive mentor intervention for family alignment workshops.");
    }

    if (insights.length === 0) {
      insights.push("Our community maintains a healthy, shared balance of Dharma and Moksha.");
      recommendations.push("Continue our collective practice and celebrate our shared stability.");
    }

    return {
      population,
      dharma_score,
      moksha_score,
      harmony_score,
      risk_flags,
      insights,
      recommendations
    };
  }
}
