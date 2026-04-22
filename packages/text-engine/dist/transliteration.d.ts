export type ScriptKey = 'devanagari' | 'iast' | 'telugu' | 'latin' | 'bengali' | 'tamil' | 'oriya';
export declare const SUPPORTED_SCRIPTS: {
    key: ScriptKey;
    label: string;
}[];
/**
 * Normalizes script keys to ensure consistency between DB and UI.
 */
export declare function normalizeScriptKey(key: string): ScriptKey;
