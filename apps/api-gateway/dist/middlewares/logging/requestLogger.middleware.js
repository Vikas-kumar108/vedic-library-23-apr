/**
 * Request Logger Middleware
 * Responsibility: Track every incoming request for audit and debugging.
 */
export const requestLoggerMiddleware = async (request) => {
    const { method, url, ip } = request;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url} - ${ip}`);
};
/**
 * Analytics Middleware
 * Responsibility: Capture high-level usage metrics (Shastras read, searches performed).
 * Purpose: Feeds the system's "Intelligence" layer.
 */
export const analyticsMiddleware = async (request, reply) => {
    // Logic: Capture the event after the response is sent (Fastify onResponse hook)
    const user = request.user;
    const path = request.url;
    if (path.startsWith('/library/read')) {
        // Log "SHASTRA_READ" event for this user
        console.log(`Analytics: User ${user?.id || 'ANON'} read shastra ${path}`);
    }
};
