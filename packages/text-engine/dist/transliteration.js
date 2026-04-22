"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_SCRIPTS = void 0;
exports.normalizeScriptKey = normalizeScriptKey;
exports.SUPPORTED_SCRIPTS = [
    { key: 'devanagari', label: 'Devanagari' },
    { key: 'iast', label: 'Roman' },
    { key: 'latin', label: 'IAST (Latin)' },
    { key: 'bengali', label: 'Bengali' },
    { key: 'tamil', label: 'Tamil' },
    { key: 'oriya', label: 'Oriya' },
];
/**
 * Normalizes script keys to ensure consistency between DB and UI.
 */
function normalizeScriptKey(key) {
    const k = key.toLowerCase();
    if (k === 'sa' || k === 'sanskrit')
        return 'devanagari';
    if (k === 'en' || k === 'english')
        return 'iast';
    return k;
}
