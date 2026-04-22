"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByKeyword = searchByKeyword;
const data_access_1 = __importDefault(require("@dharma/data-access"));
/**
 * Performs a professional full-text search across all scripture texts.
 */
async function searchByKeyword(query) {
    // Use PostgreSQL websearch_to_tsquery for advanced boolean-style search
    const results = await data_access_1.default.$queryRaw `
    SELECT 
      t.id,
      t.node_id as "nodeId",
      t.content,
      t.content_type as "contentType",
      t.language,
      ts_rank(t.fts_vector, websearch_to_tsquery('english', ${query})) as rank,
      s.name as "shastraName",
      n.canonical_ref as "canonicalRef"
    FROM texts t
    JOIN nodes n ON t.node_id = n.id
    JOIN shastras s ON n.shastra_id = s.id
    WHERE t.fts_vector @@ websearch_to_tsquery('english', ${query})
    ORDER BY rank DESC
    LIMIT 20;
  `;
    return results;
}
