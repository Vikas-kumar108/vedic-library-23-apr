import { PrismaClient } from '@dharma/data-access';

export type DharmaEventType = 'samskara' | 'milestone' | 'shift' | 'insight' | 'stabilization';

/**
 * ⏳ Dharma Event Service
 * Responsibility: Record and manage the longitudinal events that constitute the seeker's journey.
 */
export class DharmaEventService {
  constructor(private prisma: PrismaClient) {}

  /**
   * recordEvent: The primary method for documenting a significant step in the seeker's evolution.
   */
  async recordEvent(params: {
    userId: string;
    type: DharmaEventType;
    title: string;
    description?: string;
    impact: number;
    eventDate?: Date;
  }) {
    return this.prisma.dharma_events.create({
      data: {
        user_id: params.userId,
        type: params.type,
        title: params.title,
        description: params.description,
        impact: params.impact,
        event_date: params.eventDate || new Date()
      }
    });
  }

  /**
   * trackRegistration: Triggered when a new seeker enters the sanctuary.
   */
  async trackRegistration(userId: string) {
    return this.recordEvent({
      userId,
      type: 'samskara',
      title: 'Beginning of Journey',
      description: 'First entry into the institutional sanctuary and commitment to the sacred path.',
      impact: 50
    });
  }

  /**
   * trackCourseCompletion: Triggered when a scholar completes a shastric course.
   */
  async trackCourseCompletion(userId: string, courseTitle: string) {
    return this.recordEvent({
      userId,
      type: 'milestone',
      title: `Completion: ${courseTitle}`,
      description: `Successfully internalized the ontological foundations of ${courseTitle}.`,
      impact: 70
    });
  }

  /**
   * trackStateShift: Triggered when the seeker's internal state undergoes a significant transition.
   */
  async trackStateShift(userId: string, fromState: string, toState: string) {
    const impact = toState === 'stable' ? 40 : -20;
    const title = toState === 'stable' ? 'Stabilization Phase' : 'Period of Internal Tension';
    
    return this.recordEvent({
      userId,
      type: 'shift',
      title,
      description: `Transitioned from ${fromState} to ${toState} inner state.`,
      impact
    });
  }

  /**
   * trackGuidanceConsistency: Triggered by the Adaptive Engine when resonance is high.
   */
  async trackGuidanceConsistency(userId: string, guidanceType: string) {
    return this.recordEvent({
      userId,
      type: 'stabilization',
      title: 'Sustained Alignment',
      description: `Demonstrated consistent resonance and application of ${guidanceType}-based guidance.`,
      impact: 60
    });
  }
}
