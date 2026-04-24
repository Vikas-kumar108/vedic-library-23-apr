import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Edit, Trash2, BookOpen, FileText } from 'lucide-react';
import type { Page } from '../App';

interface Note {
  id: string;
  title: string;
  preview: string;
  date: string;
  type: 'lesson' | 'library';
  source: string;
}

const notes: Note[] = [
  {
    id: '1',
    title: 'Understanding Dharma',
    preview: 'The concept of dharma is central to the Gita. It represents our duty and purpose, aligned with universal law...',
    date: '2026-04-18',
    type: 'lesson',
    source: 'Bhagavad Gita Foundations',
  },
  {
    id: '2',
    title: 'Bhagavad Gita 2.47',
    preview: 'Focus on action, not results. This verse has completely changed how I approach my work and personal goals...',
    date: '2026-04-15',
    type: 'library',
    source: 'Library',
  },
  {
    id: '3',
    title: 'The Three Paths',
    preview: 'Each path (Karma, Bhakti, Jnana) offers a complete route to realization. I resonate most with Karma Yoga...',
    date: '2026-04-12',
    type: 'lesson',
    source: 'Bhagavad Gita Foundations',
  },
  {
    id: '4',
    title: 'Daily Reflection',
    preview: 'Today I realized how attachment to outcomes creates suffering. Practicing detachment in small decisions...',
    date: '2026-04-10',
    type: 'lesson',
    source: 'Mindful Living',
  },
  {
    id: '5',
    title: 'Understanding Your Dharma',
    preview: 'Finding my unique dharma requires honest self-reflection. What are my natural inclinations and talents?',
    date: '2026-04-08',
    type: 'library',
    source: 'Library',
  },
];

type FilterType = 'all' | 'lesson' | 'library';

interface NotesProps {
  onNavigate: (page: Page) => void;
}

export function Notes({ onNavigate }: NotesProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [notesList, setNotesList] = useState(notes);

  const filteredNotes = notesList.filter((note) => {
    if (activeFilter === 'all') return true;
    return note.type === activeFilter;
  });

  const handleDelete = (id: string) => {
    setNotesList(notesList.filter((note) => note.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Notes" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Your Notes" userName="Arjun" onNavigate={onNavigate} />

        <main className="p-4 sm:p-6 lg:p-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 sm:gap-3 mb-6 lg:mb-8 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 sm:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('lesson')}
                className={`px-4 sm:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeFilter === 'lesson'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                Lesson Notes
              </button>
              <button
                onClick={() => setActiveFilter('library')}
                className={`px-4 sm:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeFilter === 'library'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                Library Notes
              </button>
            </div>

            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-card rounded-[20px] p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        {note.type === 'lesson' ? (
                          <BookOpen className="w-5 h-5 text-primary" />
                        ) : (
                          <FileText className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-foreground mb-1">{note.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{note.source}</span>
                          <span>•</span>
                          <span>{formatDate(note.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-xl transition-all">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-2 hover:bg-destructive/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{note.preview}</p>
                </div>
              ))}

              {filteredNotes.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No notes found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
