# Canonical Routing Strategy

Uniform routing pattern:

/library/[canon]/[chapter]/[verse]

Examples:

/library/bg/1/1
/library/manu/1/1
/library/bhagavata/1/1/1

Rules:

- Next verse crosses chapter boundary.
- Previous verse crosses chapter boundary.
- Canon must be abstracted from text id.
- Routing must not hardcode Gita.

Routing must be canon-agnostic.