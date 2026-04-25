/**
 * VEDIC INSTITUTIONAL ONTOLOGY POLICY ENGINE
 * Governs the structural integrity of the Vedic Knowledge Graph.
 * Ensures that hierarchies follow tradition-faithful patterns.
 */

export type NodeLevel = 
  | 'shastra'
  | 'parva' | 'upaparva' | 'kanda' | 'skandha' | 'sarga' | 'adhyaya' | 'adhikarana'
  | 'mandala' | 'sukta' | 'rc'
  | 'kanda_veda' | 'prapathaka' | 'anuvaka' | 'arcika' | 'gana'
  | 'valli' | 'brahmana_section' | 'khanda'
  | 'pada' | 'sutra' | 'ahnika'
  | 'patala'
  | 'sthana' | 'prakarana' | 'ullasa' | 'pariccheda' | 'prasna'
  | 'sloka' | 'mantra'
  | 'section';

/**
 * SHASTRA STRUCTURE RULES (The Universal Grammar)
 * Defines the allowed structural sequence for each scripture type.
 */
export const SHASTRA_STRUCTURE_RULES: Record<string, NodeLevel[]> = {
  mahabharata: ['shastra', 'parva', 'upaparva', 'adhyaya', 'sloka'],
  ramayana: ['shastra', 'kanda', 'sarga', 'sloka'],
  bhagavatam: ['shastra', 'skandha', 'adhyaya', 'sloka'],
  rig_veda: ['shastra', 'mandala', 'sukta', 'rc'],
  yajur_veda: ['shastra', 'kanda_veda', 'prapathaka', 'anuvaka', 'mantra'],
  sama_veda: ['shastra', 'arcika', 'prapathaka', 'gana', 'mantra'],
  upanisad: ['shastra', 'adhyaya', 'valli', 'khanda', 'mantra'],
  darsana: ['shastra', 'adhyaya', 'pada', 'sutra'],
  ayurveda: ['shastra', 'sthana', 'adhyaya', 'sloka'],
  tantra: ['shastra', 'patala', 'prakarana', 'sloka'],
  kamasutra: ['shastra', 'adhikarana', 'adhyaya', 'sutra']
};

export const DISPLAY_LABELS: Record<NodeLevel, string> = {
  shastra: "Śāstra",
  parva: "Parva",
  upaparva: "Upaparva",
  kanda: "Kāṇḍa",
  skandha: "Skandha",
  sarga: "Sarga",
  adhyaya: "Adhyāya",
  adhikarana: "Adhikaraṇa",
  mandala: "Maṇḍala",
  sukta: "Sūkta",
  rc: "Ṛc",
  kanda_veda: "Kāṇḍa (Veda)",
  prapathaka: "Prapāṭhaka",
  anuvaka: "Anuvāka",
  arcika: "Ārcika",
  gana: "Gāna",
  valli: "Vallī",
  brahmana_section: "Brāhmaṇa Section",
  khanda: "Khaṇḍa",
  pada: "Pāda",
  sutra: "Sūtra",
  ahnika: "Āhnika",
  patala: "Paṭala",
  sthana: "Sthāna",
  prakarana: "Prakaraṇa",
  ullasa: "Ullāsa",
  pariccheda: "Pariccheda",
  prasna: "Praśna",
  sloka: "Śloka",
  mantra: "Mantra",
  section: "Section"
};

/**
 * CONTENT AUTHORITY LEVELS (Epistemic Weight)
 * Defines the hierarchy of interpretation and authority.
 */
export enum ContentAuthority {
  MULA = 5,      // Absolute Source
  BHASHYA = 4,   // Primary Commentary
  TIKA = 3,      // Secondary Commentary
  BHAVARTHA = 2, // Interpretive Realization
  ANUVADA = 1    // Faithful Rendering
}

export const CONTENT_TYPE_WEIGHTS: Record<string, ContentAuthority> = {
  mula: ContentAuthority.MULA,
  bhashya: ContentAuthority.BHASHYA,
  tika: ContentAuthority.TIKA,
  tippani: ContentAuthority.TIKA,
  vivarana: ContentAuthority.TIKA,
  vyakhyana: ContentAuthority.TIKA,
  bhavartha: ContentAuthority.BHAVARTHA,
  tatparya: ContentAuthority.BHAVARTHA,
  anuvada: ContentAuthority.ANUVADA,
  bhasantara: ContentAuthority.ANUVADA,
  shabdartha: ContentAuthority.ANUVADA
};

/**
 * Validates if a structural sequence is allowed for a given shastra.
 * @param shastraType - The slug of the shastra (e.g., 'mahabharata')
 * @param levels - The proposed sequence of levels (e.g., ['shastra', 'parva', 'adhyaya'])
 */
export function validateStructuralIntegrity(shastraType: string, levels: NodeLevel[]): boolean {
  const allowedLevels = SHASTRA_STRUCTURE_RULES[shastraType];
  if (!allowedLevels) return true; // Allow if rules are not yet defined

  // Every level in the sequence must be allowed and in the correct order
  let lastIndex = -1;
  for (const level of levels) {
    const currentIndex = allowedLevels.indexOf(level);
    if (currentIndex === -1) return false; // Level not allowed for this shastra
    if (currentIndex <= lastIndex && level !== 'section') return false; // Must follow sequence order
    lastIndex = currentIndex;
  }

  return true;
}
