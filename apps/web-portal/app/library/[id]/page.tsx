'use client'

import React from 'react'
import { StandardPage } from '@/components/index'
import { ContentHero } from '@/components/library/ContentHero'
import { MultimodalTabs } from '@/components/library/MultimodalTabs'

/**
 * Content Detail Page (Multimodal)
 * Responsibility: Orchestrate access to a specific Shastra across multiple mediums.
 */
export default function ContentDetailPage({ params }: { params: { id: string } }) {
  const contentMetadata = {
    title: "Bhagavad Gita As It Is",
    author: "A.C. Bhaktivedanta Swami Prabhupada",
    description: "The most widely read edition of the Gita in the world, featuring original Sanskrit, transliteration, and deep purports.",
    rating: 4.9,
    reviews: 1240,
    tags: ["Dharma", "Mastery", "Essential"]
  }

  return (
    <StandardPage className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        
        {/* 1. Modular Hero Branding */}
        <ContentHero id={params.id} metadata={contentMetadata} />

        {/* 2. Modular Multimodal Engine */}
        <MultimodalTabs />

      </div>
    </StandardPage>
  )
}
