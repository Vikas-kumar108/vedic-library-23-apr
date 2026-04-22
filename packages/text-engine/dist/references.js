"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHASTRA_SHORT_CODES = exports.SHASTRA_CANONICAL_NAMES = void 0;
exports.formatReference = formatReference;
exports.parseCoordinatesFromSlug = parseCoordinatesFromSlug;
exports.SHASTRA_CANONICAL_NAMES = {
    bg: 'Bhagavad Gītā',
    ks: 'Kāmasūtra',
};
exports.SHASTRA_SHORT_CODES = {
    bg: 'BG',
    ks: 'KS',
};
/**
 * Formats a raw database reference or coordinates into a canonical string.
 */
function formatReference(shastra, chapter, verse) {
    const code = exports.SHASTRA_SHORT_CODES[shastra.toLowerCase()] || shastra.toUpperCase();
    if (shastra.toLowerCase() === 'ks') {
        return `${code} ${chapter}.${verse}`;
    }
    return `${code} ${chapter}.${verse}`;
}
/**
 * Extracts coordinates from a slug or path.
 */
function parseCoordinatesFromSlug(slug) {
    if (slug.startsWith('adhik-'))
        return { type: 'adhikarana', value: parseInt(slug.replace('adhik-', '')) };
    if (slug.startsWith('ch-'))
        return { type: 'chapter', value: parseInt(slug.replace('ch-', '')) };
    if (slug.startsWith('v-'))
        return { type: 'verse', value: slug.replace('v-', '') };
    return { type: 'unknown', value: slug };
}
