"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHASTRA_SHORT_CODES = exports.SHASTRA_CANONICAL_NAMES = void 0;
exports.formatReference = formatReference;
exports.generateSlug = generateSlug;
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
function formatReference(shastra, chapter, verse, section) {
    const code = exports.SHASTRA_SHORT_CODES[shastra.toLowerCase()] || shastra.toUpperCase();
    if (shastra.toLowerCase() === 'ks') {
        if (section)
            return `${code} ${section}.${chapter}.${verse}`;
        return `${code} ${chapter}.${verse}`;
    }
    if (shastra.toLowerCase() === 'bg') {
        return `${code} ${chapter}.${verse}`;
    }
    return `${code} ${chapter}.${verse}`;
}
/**
 * Generates a consistent slug for a node.
 */
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
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
