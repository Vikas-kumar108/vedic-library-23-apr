export interface SearchResult {
    id: string;
    nodeId: string;
    content: string;
    contentType: string;
    language: string;
    rank: number;
    shastraName?: string;
    canonicalRef?: string;
}
/**
 * Performs a professional full-text search across all scripture texts.
 */
export declare function searchByKeyword(query: string): Promise<SearchResult[]>;
