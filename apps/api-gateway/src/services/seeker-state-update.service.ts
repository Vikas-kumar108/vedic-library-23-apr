import { PrismaClient } from '@dharma/data-access';
import { DharmaEventService } from '../intelligence/dharma-event.service';

/**
 * 🧘 Seeker State Update Service
 * Responsibility: Manage changes to the seeker's internal and spiritual profiles, recording dharma events as needed.
 */
export class SeekerStateUpdateService {
  private eventService: DharmaEventService;

  constructor(private prisma: PrismaClient) {
    this.eventService = new DharmaEventService(prisma);
  }

  /**
   * updateInnerState: Updates the seeker's inner state and documents the shift.
   */
  async updateInnerState(userId: string, newState: string) {
    const profile = await this.prisma.spiritual_profiles.findUnique({
      where: { user_id: userId }
    });

    if (!profile) throw new Error('Spiritual profile not found.');

    const oldState = profile.inner_state || 'seeking';

    if (oldState !== newState) {
      await this.prisma.spiritual_profiles.update({
        where: { user_id: userId },
        data: { inner_state: newState }
      });

      // ⏳ Record Dharma Event: Shift
      await this.eventService.trackStateShift(userId, oldState, newState);
    }

    return { oldState, newState };
  }

  /**
   * recordCourseCompletion: Documents a course completion as a dharma milestone.
   */
  async recordCourseCompletion(userId: string, courseTitle: string) {
    await this.prisma.user_statistics.update({
      where: { user_id: userId },
      data: { courses_completed: { increment: 1 } }
    });

    // ⏳ Record Dharma Event: Milestone
    await this.eventService.trackCourseCompletion(userId, courseTitle);
  }
}
