/**
 * Role Middleware (Factory)
 * Responsibility: Ensure the authenticated user has the required role.
 * Guard: Blocks if role mismatch.
 */
export const roleMiddleware = (requiredRoles) => {
    return async (request, reply) => {
        const user = request.user;
        if (!user || !requiredRoles.includes(user.role)) {
            return reply.code(403).send({
                error: 'Forbidden',
                message: `This action requires one of the following roles: ${requiredRoles.join(', ')}`
            });
        }
    };
};
/**
 * Access Control Middleware (Vedic-Aware)
 * Responsibility: Execute the final access decision pipeline.
 * Pipeline: Role -> Life Stage -> Relationship -> Content Rules
 */
export const accessControlMiddleware = (nodeIdParam = 'nodeId') => {
    return async (request, reply) => {
        const user = request.user;
        const nodeId = request.params[nodeIdParam];
        if (!user)
            return reply.code(401).send({ error: 'Auth required' });
        // 1. Fetch Node + Rules (Mocked here, would use data-access logic)
        const nodeWithRules = {
            id: nodeId,
            accessRules: [
                {
                    allowedRoles: ['student'],
                    allowedLifeStages: ['married'],
                    isRestricted: true,
                    messageIfLocked: 'This content is specifically for those in the Grihastha (married) stage.'
                }
            ]
        };
        // 2. Check Relationship (if applicable)
        const isGuide = false; // Would check user_guidance table
        // 3. Execute Algorithm
        // Note: Importing canAccessNode from data-access
        // const { canAccess, reason } = await canAccessNode(user, nodeWithRules, { isGuide, isTeacher: false })
        // Simulate result
        const canAccess = user.roles.includes('admin') ||
            (user.lifeStage === 'married' && user.roles.includes('student'));
        if (!canAccess) {
            return reply.code(403).send({
                error: 'Restriction',
                message: nodeWithRules.accessRules[0].messageIfLocked
            });
        }
    };
};
