export interface ParsedRef {
    shastra: string;
    adhikarana?: number;
    adhyaya?: number;
    verse?: number;
    prakarana?: number;
}
export declare const SHASTRA_CANONICAL_NAMES: Record<string, string>;
export declare const SHASTRA_SHORT_CODES: Record<string, string>;
/**
 * Formats a raw database reference or coordinates into a canonical string.
 */
export declare function formatReference(shastra: string, chapter: number | string, verse: number | string): string;
/**
 * Extracts coordinates from a slug or path.
 */
export declare function parseCoordinatesFromSlug(slug: string): {
    type: string;
    value: string | number;
};
