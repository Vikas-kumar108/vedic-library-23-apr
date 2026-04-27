Design System Blueprint
Indian Knowledge Library
1. Philosophy

Design must be:

Calm

Structural

Hierarchical

Non-distracting

Scholar-friendly

Visuals must never dominate śāstra.

2. Component System

All research pages must use:

components/ui/
  ResearchLayout.tsx
  Hero.tsx
  Section.tsx
  Divider.tsx
  ContentContainer.tsx

Pages must contain content only.

Layout handles:

Spacing

Typography scale

Hero image

Breadcrumb

Footer navigation

3. Hero System

Hero supports:

Title

Subtitle

Section marker

Optional background image

Image stored in:

public/images/research/{slug}.jpg
4. Navigation System

GlobalHeader reads from:

lib/navigation.config.ts

Never hardcode dropdown items.

Structure:

{
  label: "Research",
  children: [...]
}

Dropdown auto-renders.

5. Visual Rhythm Rules

Spacing scale:

Section padding: py-20

Content width: max-w-screen-lg

Headings: 2xl–5xl hierarchy

Paragraphs: text-lg

Dividers: subtle border-border

No random styling.

6. Refactoring Old Pages

Procedure:

Remove SPA routing.

Remove custom layout wrapper.

Extract pure content.

Wrap inside ResearchLayout.

Replace manual hero with system hero.

Replace manual footer nav with component.

7. Future Enhancements

Animated parallax hero

Manuscript texture backgrounds

Collapsible academic references

Parallel view for comparisons

But only after infrastructure stable.

End of Design Blueprint.