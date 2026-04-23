/**
 * Text Context Middleware
 * Responsibility: Extract and normalize scripture context from the request.
 * Purpose: Ensures all downstream services know which Book/Chapter/Verse is being discussed.
 */
export const textContextMiddleware = async (request) => {
    const params = request.params;
    const query = request.query;
    const context = {
        bookId: params.bookId || query.bookId,
        chapter: params.chapterId || query.chapterId,
        verse: params.verseId || query.verseId
    };
    request.textContext = context;
};
/**
 * Node Context Middleware
 * Responsibility: Identify the current position in the hierarchical Vedic Tree.
 */
export const nodeContextMiddleware = async (request) => {
    const nodeId = request.params.nodeId;
    // Logic: Fetch node metadata from the Vedic Tree registry
    const nodeMetadata = {
        id: nodeId,
        type: 'CHAPTER',
        depth: 2
    };
    request.nodeContext = nodeMetadata;
};
