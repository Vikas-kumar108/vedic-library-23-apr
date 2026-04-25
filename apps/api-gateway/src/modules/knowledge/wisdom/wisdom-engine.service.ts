import { PrismaClient } from '@dharma/data-access'
import { WisdomRepository } from './wisdom.repository'

export type WisdomContext = 'FINANCE' | 'ASSETS' | 'HUMAN_CAPITAL' | 'ECOSYSTEM' | 'CONTENT' | 'GOVERNANCE'

export class WisdomEngineService {
  constructor(private repository: WisdomRepository) {}

  // A mapping of institutional actions to Shastric philosophical roots
  private contextMap: Record<WisdomContext, string[]> = {
    FINANCE: ['bg-4.33', 'bg-9.27', 'bg-18.46'], // Sacrifice of knowledge, offering everything, worship through work
    ASSETS: ['bg-2.61', 'bg-7.10', 'bg-12.10'], // Control of senses, seed of all existence, working for the Divine
    HUMAN_CAPITAL: ['bg-3.20', 'bg-4.13', 'bg-18.42'], // Leading by example, divisions of nature, qualities of a Brahmana
    ECOSYSTEM: ['bg-6.30', 'bg-7.7', 'bg-15.7'], // Seeing the Divine everywhere, pearl on a thread, eternal fragments
    CONTENT: ['bg-10.10', 'bg-10.11', 'bg-18.68'], // Buddhi-yoga, lamp of knowledge, preaching the supreme secret
    GOVERNANCE: ['bg-3.21', 'bg-5.18', 'bg-18.45'], // Standards set by leaders, equal vision, perfection through duty
  }

  async getWisdomPulse(context: WisdomContext) {
    const slugs = this.contextMap[context]
    const randomSlug = slugs[Math.floor(Math.random() * slugs.length)]

    const node = await this.repository.findVerseBySlug(randomSlug)

    if (!node) return null

    return {
      context,
      slug: node.slug,
      shastra: node.shastra.title,
      verse: node.content,
      wisdom: this.getSpiritualCommentary(context, node.slug)
    }
  }

  private getSpiritualCommentary(context: WisdomContext, slug: string) {
    const commentaries: Record<string, string> = {
      'bg-4.33': 'Administrative expenditure is not mere accounting; it is the sacrifice of wealth for the manifestation of higher knowledge.',
      'bg-9.27': 'Every transaction recorded today is an offering to the lineage of wisdom.',
      'bg-18.46': 'By managing these institutional assets with integrity, you are worshipping the All-Pervading Divine.',
      'bg-3.21': 'The standards you set in this dashboard will be followed by the entire community of seekers.',
      'bg-15.7': 'Every member of this staff is an eternal fragment of the Divine, to be treated with absolute reverence.',
      'bg-18.68': 'This digital ecosystem is the modern chariot for the transmission of the Supreme Secret.'
    }
    return commentaries[slug] || 'Perform your duty with detachment and devotion.'
  }
}

