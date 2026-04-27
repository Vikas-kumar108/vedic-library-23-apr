# Canonical Metadata Registry (CKR)

Location:
src/lib/corpus.structure.ts

This registry defines:

- Ontological hierarchy
- Routing behavior
- Commentary capability
- Comparative compatibility
- Curriculum integration
- Pillar compatibility

Each node structure:

{
  id: string
  label: string
  type: domain | text | section | chaptered
  route?: string
  chaptered?: boolean
  verseBased?: boolean
  supportsCommentaries?: boolean
  curriculumEligible?: boolean
  comparable?: boolean
  pillars?: ["library", "education", "guidance"]
  children?: CorpusNode[]
}

This registry must be manually curated.
It must not mirror filesystem blindly.