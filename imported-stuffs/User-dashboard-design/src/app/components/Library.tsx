import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContentListItem } from './ContentListItem';
import { ReadingView } from './ReadingView';
import type { Page } from '../App';

interface LibraryItem {
  id: string;
  title: string;
  type: 'Verse' | 'Article';
  category: string;
  translation: string;
  purport: string;
}

const libraryItems: LibraryItem[] = [
  {
    id: '1',
    title: 'Bhagavad Gita 2.47',
    type: 'Verse',
    category: 'Karma',
    translation: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.',
    purport: 'This verse teaches the principle of Nishkama Karma - performing action without attachment to results. It is one of the most fundamental teachings of the Bhagavad Gita, guiding us to focus on our efforts rather than outcomes. When we act with detachment, we free ourselves from anxiety and find peace in the process itself.',
  },
  {
    id: '2',
    title: 'Understanding Your Dharma',
    type: 'Article',
    category: 'Dharma',
    translation: 'Dharma is the cosmic law underlying right behavior and social order. It is the path of righteousness and living one\'s life according to universal principles.',
    purport: 'To understand dharma is to understand your unique role in the cosmic order. Every individual has a specific dharma based on their nature, stage of life, and circumstances. Living in alignment with dharma brings harmony and fulfillment.',
  },
  {
    id: '3',
    title: 'Bhagavad Gita 9.22',
    type: 'Verse',
    category: 'Bhakti',
    translation: 'To those who are constantly devoted and who worship Me with love, I give the understanding by which they can come to Me.',
    purport: 'This verse reveals the power of devotion and surrender. When we dedicate ourselves fully to the divine with pure love and devotion, we receive divine grace and guidance. The path of Bhakti Yoga emphasizes the heart\'s connection with the divine.',
  },
  {
    id: '4',
    title: 'The Qualities of a Leader',
    type: 'Article',
    category: 'Leadership',
    translation: 'True leadership emerges from self-mastery, compassion, and the ability to serve others selflessly while maintaining clarity of purpose.',
    purport: 'Vedic wisdom teaches that leadership is not about power or control, but about serving the greater good. A true leader leads by example, embodies dharma, and inspires others through their integrity and wisdom.',
  },
  {
    id: '5',
    title: 'Bhagavad Gita 6.5',
    type: 'Verse',
    category: 'Dharma',
    translation: 'One must deliver oneself with the help of one\'s mind, and not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.',
    purport: 'This verse emphasizes the importance of self-mastery and mental discipline. The mind can be our greatest ally or our worst enemy. Through practice and detachment, we can train the mind to serve our highest purpose.',
  },
];

const categories = ['All', 'Dharma', 'Karma', 'Bhakti', 'Leadership'];

interface LibraryProps {
  onNavigate: (page: Page) => void;
}

export function Library({ onNavigate }: LibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = libraryItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Library" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Library" userName="Arjun" onNavigate={onNavigate} />

        <main className="p-4 sm:p-6 lg:p-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 lg:mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search verses, topics..."
                className="w-full px-4 sm:px-6 py-3.5 bg-card rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex gap-2 sm:gap-3 mb-6 lg:mb-8 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {selectedItem ? (
              <ReadingView
                item={selectedItem}
                onBack={() => setSelectedItem(null)}
              />
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <ContentListItem
                    key={item.id}
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}
                {filteredItems.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">No items found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
