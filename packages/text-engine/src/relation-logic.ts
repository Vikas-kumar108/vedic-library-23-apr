/**
 * VEDIC INSTITUTIONAL RELATION LOGIC ENGINE
 * Governs the logical connections between nodes in the Knowledge Graph.
 * Defines the semantic texture of 'Paramparā Connective Tissue'.
 */

export type RelationType = 
  | 'parallel' | 'elaborates' | 'refutes' | 'source' | 'derived_from' | 'summarizes' 
  | 'leads_to' | 'exemplifies' | 'fulfills' | 'explained_by' | 'comments_on' 
  | 'supports' | 'contradicts' | 'precedes' | 'follows';

/**
 * RELATION CLASSES (Epistemic Categorization)
 * Groups relations by their functional intent.
 */
export enum RelationClass {
  EPISTEMIC = 'EPISTEMIC',     // Authority & Source (Pramāṇa)
  EXPLANATORY = 'EXPLANATORY', // Interpretation & Detail
  LOGICAL = 'LOGICAL',         // Intellectual Analysis
  NARRATIVE = 'NARRATIVE',     // Sequence & Context
  HARMONY = 'HARMONY'          // Cross-Text Coherence
}

export interface RelationDefinition {
  label: string;
  description: string;
  class: RelationClass;
  isSymmetric: boolean;
  inverseLabel?: string;
  epistemicWeight: number; // 0 to 1
}

export const RELATION_DEFINITIONS: Record<RelationType, RelationDefinition> = {
  source: {
    label: "Authoritative Source",
    description: "The primary scripture acting as evidence (Pramāṇa) for this statement.",
    class: RelationClass.EPISTEMIC,
    isSymmetric: false,
    inverseLabel: "Cited In",
    epistemicWeight: 1.0
  },
  derived_from: {
    label: "Derived From",
    description: "A teaching that originates from a more ancient source.",
    class: RelationClass.EPISTEMIC,
    isSymmetric: false,
    inverseLabel: "Source For",
    epistemicWeight: 0.9
  },
  explained_by: {
    label: "Explained By",
    description: "Points to a commentary or exposition that clarifies this node.",
    class: RelationClass.EXPLANATORY,
    isSymmetric: false,
    inverseLabel: "Explains",
    epistemicWeight: 0.8
  },
  comments_on: {
    label: "Comments On",
    description: "Active analytical commentary on a root text.",
    class: RelationClass.EXPLANATORY,
    isSymmetric: false,
    inverseLabel: "Commented On By",
    epistemicWeight: 0.7
  },
  elaborates: {
    label: "Elaborates",
    description: "Expands upon a condensed seed or brief statement.",
    class: RelationClass.EXPLANATORY,
    isSymmetric: false,
    inverseLabel: "Summarized In",
    epistemicWeight: 0.6
  },
  refutes: {
    label: "Refutes",
    description: "Directly addresses and corrects an opposing viewpoint (Pūrva-pakṣa).",
    class: RelationClass.LOGICAL,
    isSymmetric: false,
    inverseLabel: "Refuted By",
    epistemicWeight: 0.8
  },
  supports: {
    label: "Supports",
    description: "Provides logical reinforcement or secondary evidence.",
    class: RelationClass.LOGICAL,
    isSymmetric: false,
    inverseLabel: "Supported By",
    epistemicWeight: 0.7
  },
  contradicts: {
    label: "Contradicts",
    description: "Points to an apparent contradiction for deeper resolution (Samādhāna).",
    class: RelationClass.LOGICAL,
    isSymmetric: false,
    inverseLabel: "Contradicted By",
    epistemicWeight: 0.6
  },
  parallel: {
    label: "Parallel Teaching",
    description: "Identical or highly similar wisdom found in another scripture.",
    class: RelationClass.HARMONY,
    isSymmetric: true,
    epistemicWeight: 0.9
  },
  exemplifies: {
    label: "Exemplifies",
    description: "Provides a narrative or practical example of the abstract principle.",
    class: RelationClass.NARRATIVE,
    isSymmetric: false,
    inverseLabel: "Exemplified By",
    epistemicWeight: 0.5
  },
  fulfills: {
    label: "Fulfills",
    description: "The completion or realization of a prior promise or injunction.",
    class: RelationClass.NARRATIVE,
    isSymmetric: false,
    inverseLabel: "Fulfilled By",
    epistemicWeight: 0.6
  },
  precedes: {
    label: "Precedes",
    description: "Sequential narrative or logical priority.",
    class: RelationClass.NARRATIVE,
    isSymmetric: false,
    inverseLabel: "Follows",
    epistemicWeight: 0.4
  },
  follows: {
    label: "Follows",
    description: "Sequential narrative or logical consequence.",
    class: RelationClass.NARRATIVE,
    isSymmetric: false,
    inverseLabel: "Preceded By",
    epistemicWeight: 0.4
  },
  summarizes: {
    label: "Summarizes",
    description: "Condensed version of a larger section.",
    class: RelationClass.EXPLANATORY,
    isSymmetric: false,
    inverseLabel: "Summarized From",
    epistemicWeight: 0.5
  },
  leads_to: {
    label: "Leads To",
    description: "Logical or practical progression.",
    class: RelationClass.NARRATIVE,
    isSymmetric: false,
    inverseLabel: "Originates From",
    epistemicWeight: 0.5
  }
};

/**
 * Gets the display label for a relation, potentially using the inverse if the direction is flipped.
 */
export function getRelationLabel(type: RelationType, isInverted: boolean = false): string {
  const def = RELATION_DEFINITIONS[type];
  if (isInverted && def.inverseLabel) return def.inverseLabel;
  return def.label;
}

/**
 * Returns relations filtered by their epistemic class.
 */
export function getRelationsByClass(relationClass: RelationClass): RelationType[] {
  return Object.entries(RELATION_DEFINITIONS)
    .filter(([_, def]) => def.class === relationClass)
    .map(([type, _]) => type as RelationType);
}
