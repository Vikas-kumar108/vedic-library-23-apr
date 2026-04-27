import { PrismaClient } from '@dharma/data-access';
import { SeekerStateService } from './seeker-state.service';
import { PurusharthaService } from './purushartha.service';
import { SadhanaService } from './sadhana.service';
import { GrihasthaService } from './grihastha.service';

export type TensionType = 'parent_child' | 'spouse' | 'general' | 'spiritual_mismatch';
export type TensionSeverity = 'low' | 'medium' | 'high';

export type Tension = {
  type: TensionType;
  severity: TensionSeverity;
  members: string[];
  signal: string;
  suggestion: string;
};

export type HarmonyAnalysis = {
  tensions: Tension[];
  harmony_score: number;
  summary: string;
};

/**
 * 🧘 Harmony Intelligence Engine
 * Responsibility: Detect subtle relational tensions and provide Dharmic alignment.
 */
export class HarmonyService {
  constructor(private prisma: PrismaClient) {}

  /**
   * analyzeFamilyHarmony: Analyzes a family unit for relational alignment.
   */
  async analyzeFamilyHarmony(familyId: string): Promise<HarmonyAnalysis> {
    const prisma = this.prisma;

    // 1. Fetch Family Context
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

    if (familyLinks.length === 0) return { tensions: [], harmony_score: 100, summary: "No household data available." };

    const tensions: Tension[] = [];
    let severitySum = 0;

    // 2. Extract Member Intelligence
    const memberData = familyLinks.map(link => {
      const user = link.users;
      if (!user) return null;
      
      const state = SeekerStateService.computeState(user as any, user.spiritual_profile, user.statistics);
      const sadhana = SadhanaService.generateSadhana(state);
      const grihastha = GrihasthaService.generateGrihasthaPlan(state, user.profile || {});
      const balance = PurusharthaService.computePurusharthaBalance(state, sadhana, grihastha);
      
      return {
        userId: user.id,
        role: link.relationship_role,
        state,
        balance,
        innerState: user.spiritual_profile?.inner_state || 'seeking'
      };
    }).filter(Boolean);

    // 3. Tension Detection Logic
    
    // RULE 1: Spouse Tension (Stable vs Disturbed/Confused)
    const parents = memberData.filter(m => m?.role === 'parent');
    if (parents.length === 2) {
      const [p1, p2] = parents;
      if (p1 && p2) {
        const isOneStable = p1.innerState === 'stable' || p2.innerState === 'stable';
        const isOneDisturbed = p1.innerState === 'disturbed' || p2.innerState === 'disturbed' || p1.innerState === 'confused' || p2.innerState === 'confused';
        
        if (isOneStable && isOneDisturbed) {
          tensions.push({
            type: 'spouse',
            severity: 'medium',
            members: [p1.userId, p2.userId],
            signal: "emotional mismatch between partners",
            suggestion: "Engage in shared listening and stabilizing practice to bridge the inner state gap."
          });
          severitySum += 15;
        }

        // RULE 4: Spiritual Mismatch (Moksha high vs low)
        const mokshaDiff = Math.abs(p1.balance.moksha - p2.balance.moksha);
        if (mokshaDiff > 40) {
          tensions.push({
            type: 'spiritual_mismatch',
            severity: 'low',
            members: [p1.userId, p2.userId],
            signal: "difference in spiritual pace",
            suggestion: "Respect individual spiritual velocity while maintaining shared worldly duties."
          });
          severitySum += 5;
        }
      }
    }

    // RULE 2: Parent-Child Tension (Parent disturbed vs Child confused/seeking)
    const children = memberData.filter(m => m?.role === 'child');
    for (const parent of parents) {
      for (const child of children) {
        if (parent && child) {
          if (parent.innerState === 'disturbed' && (child.innerState === 'confused' || child.innerState === 'seeking')) {
            tensions.push({
              type: 'parent_child',
              severity: 'high',
              members: [parent.userId, child.userId],
              signal: "child lacks stable guidance",
              suggestion: "Parental inner stabilization is recommended to better support the child's journey."
            });
            severitySum += 30;
          }

          // RULE 3: Neglect Pattern (Child engagement low vs Parent artha high)
          if (child.state.engagement_score < 30 && parent.balance.artha > 75) {
            tensions.push({
              type: 'parent_child',
              severity: 'medium',
              members: [parent.userId, child.userId],
              signal: "overfocus on livelihood affecting family alignment",
              suggestion: "Rebalance Artha (work) with Dharma (family care) to restore household connection."
            });
            severitySum += 15;
          }
        }
      }
    }

    // 4. Final Aggregation
    const harmony_score = Math.max(0, 100 - severitySum);
    let summary = "Your household is in a high state of Dharmic alignment.";
    if (harmony_score < 70) summary = "Subtle tensions detected; prioritize collective harmony over individual aims.";
    if (harmony_score < 40) summary = "Relational alignment needs attention; institutional support is recommended for the whole family.";

    return {
      tensions,
      harmony_score,
      summary
    };
  }
}
