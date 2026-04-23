/**
 * Error Middleware
 * Responsibility: Catch all unhandled exceptions and format them into a unified response.
 * Purpose: Ensures the system fails gracefully without leaking sensitive stack traces.
 */
export const errorMiddleware = (error, request, reply) => {
    const statusCode = error.statusCode || 500;
    const message = statusCode >= 500 ? 'Internal Server Error' : error.message;
    // Log the actual error for the team
    console.error(`[ERROR] ${request.method} ${request.url}:`, error);
    reply.code(statusCode).send({
        error: error.name || 'Error',
        message,
        statusCode
    });
};
/**
 * Transaction Middleware
 * Responsibility: Ensure atomicity for complex write operations (e.g. creating a course + multiple lessons).
 * Note: Typically used in services, but can be triggered by a request flag.
 */
export const transactionMiddleware = async (request) => {
    // Logic: Signal the repository layer to start a Prisma transaction
    ;
    request.useTransaction = true;
};
