import { PrismaClient } from '@dharma/data-access';
import { MentorService } from './mentor.service';

export type GovernanceActionType = 'guidance' | 'warning' | 'restriction' | 'escalation';

/**
 * ⚖️ Dharma Governance Service
 * Responsibility: Execute restorative actions based on ethical alignment and institutional rules.
 */
export class GovernanceService {
  constructor(private prisma: PrismaClient) {}

  /**
   * evaluateViolation: Analyzes a reported violation and determines the appropriate institutional response.
   */
  async evaluateViolation(violationId: string) {
    const prisma = this.prisma;

    const violation = await prisma.dharma_violations.findUnique({
      where: { id: violationId },
      include: { dharma_rule: true }
    });

    if (!violation) throw new Error('Violation context not found.');

    const severity = violation.severity;
    const userId = violation.user_id;
    const actions: { type: GovernanceActionType; message: string }[] = [];

    // 1. Determine Action Strategy
    if (severity >= 4) {
      // Escalation & Restriction (Serious)
      actions.push({
        type: 'escalation',
        message: 'Your current path suggests a significant alignment shift. A specialized mentor has been assigned to support your restoration.'
      });
      actions.push({
        type: 'restriction',
        message: 'Access to advanced ontological content is temporarily paused to allow for grounding and mentorship focus.'
      });

      // Execute Escalation (Assign Mentor)
      const mentorService = new MentorService(prisma);
      await mentorService.assignMentor(userId, 'institutional_overseer');
    } 
    else if (severity >= 2) {
      // Warning (Moderate)
      actions.push({
        type: 'warning',
        message: 'A moderate tension in your dharmic alignment has been detected. Please prioritize the suggested restorative practices.'
      });
    } 
    else {
      // Guidance (Gentle)
      actions.push({
        type: 'guidance',
        message: 'A subtle shift in your rhythm suggests a need for gentle grounding.'
      });
    }

    // 2. Persist Actions
    await Promise.all(actions.map(action => 
      prisma.dharma_actions.create({
        data: {
          violation_id: violationId,
          action_type: action.type,
          message: action.message
        }
      })
    ));

    return { violation, actions };
  }

  /**
   * isRestricted: Checks if a seeker currently has any active content restrictions.
   */
  async isRestricted(userId: string): Promise<boolean> {
    const activeRestrictions = await this.prisma.dharma_actions.findFirst({
      where: {
        violation: {
          user_id: userId,
          resolved: false
        },
        action_type: 'restriction'
      }
    });

    return !!activeRestrictions;
  }

  /**
   * getGovernanceStatus: Summarizes the seeker's current standing and ethical history.
   */
  async getGovernanceStatus(userId: string) {
    const violations = await this.prisma.dharma_violations.findMany({
      where: { user_id: userId },
      include: { 
        dharma_rule: true,
        actions: true 
      },
      orderBy: { created_at: 'desc' }
    });

    const activeViolations = violations.filter(v => !v.resolved);
    const maxSeverity = activeViolations.length > 0 
      ? Math.max(...activeViolations.map(v => v.severity)) 
      : 0;

    let status: 'aligned' | 'under_guidance' | 'at_risk' = 'aligned';
    if (maxSeverity >= 4) status = 'at_risk';
    else if (maxSeverity >= 1) status = 'under_guidance';

    return {
      status,
      violations: violations,
      actions: violations.flatMap(v => v.actions)
    };
  }
}
