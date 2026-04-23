/**
 * Learning Context Middleware
 * Responsibility: Attach the user's current learning progress to the request.
 * Purpose: Allows services to personalize content based on "Where did I leave off?"
 */
export const learningContextMiddleware = async (request) => {
    const user = request.user;
    if (!user)
        return;
    // Logic: Fetch user's active course and lesson progress
    const learningState = {
        activeCourseId: 'bg-101',
        lastLessonId: 'l2',
        progressPercentage: 45
    };
    request.learningContext = learningState;
};
/**
 * Guidance Context Middleware
 * Responsibility: Check if the request is within a personal mentorship/guidance window.
 */
export const guidanceContextMiddleware = async (request) => {
    const user = request.user;
    if (!user)
        return;
    // Logic: Check for active mentor sessions or scheduled guidance
    const guidanceState = {
        hasActiveMentor: true,
        mentorId: 'm1',
        isGuidanceWindow: true
    };
    request.guidanceContext = guidanceState;
};
