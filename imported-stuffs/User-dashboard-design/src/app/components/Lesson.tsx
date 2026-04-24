import { useState } from 'react';
import { ArrowLeft, CheckCircle, PlayCircle, Lock } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { Page } from '../App';

interface LessonItem {
  id: string;
  name: string;
  status: 'completed' | 'available' | 'locked';
}

interface LessonPageProps {
  onNavigate: (page: Page) => void;
}

const lessons: LessonItem[] = [
  { id: '1', name: 'Historical Context', status: 'completed' },
  { id: '2', name: 'The Battlefield of Kurukshetra', status: 'completed' },
  { id: '3', name: 'Meeting Arjuna', status: 'completed' },
  { id: '4', name: 'Understanding Dharma', status: 'completed' },
  { id: '5', name: 'The Three Paths', status: 'available' },
  { id: '6', name: 'Karma Yoga in Practice', status: 'locked' },
  { id: '7', name: 'Bhakti and Devotion', status: 'locked' },
];

export function Lesson({ onNavigate }: LessonPageProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'notes' | 'discuss'>('learn');
  const [currentLesson, setCurrentLesson] = useState(lessons[4]);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNote = () => {
    if (note.trim()) {
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    }
  };

  const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id);
  const hasPrevious = currentIndex > 0 && lessons[currentIndex - 1].status !== 'locked';
  const hasNext = currentIndex < lessons.length - 1 && lessons[currentIndex + 1].status !== 'locked';

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Courses" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Bhagavad Gita Foundations" userName="Arjun" onNavigate={onNavigate} />

        <main className="p-4 sm:p-6">
          <div className="mb-4">
            <button
              onClick={() => onNavigate('courses')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px] gap-6">
            <div className="bg-card rounded-[20px] p-4 sm:p-5 shadow-sm border border-border h-fit">
              <h4 className="text-foreground mb-4">Lessons</h4>
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => lesson.status !== 'locked' && setCurrentLesson(lesson)}
                    disabled={lesson.status === 'locked'}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      currentLesson.id === lesson.id
                        ? 'bg-primary/10 border border-primary/20'
                        : lesson.status === 'locked'
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {lesson.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                    {lesson.status === 'available' && (
                      <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                    {lesson.status === 'locked' && (
                      <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="text-sm text-foreground">{lesson.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-[20px] overflow-hidden shadow-sm border border-border">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-primary/60" />
                </div>
              </div>

              <div className="bg-card rounded-[20px] p-6 shadow-sm border border-border">
                <h2 className="text-foreground mb-4">{currentLesson.name}</h2>

                <div className="flex gap-2 mb-6 bg-muted p-1 rounded-full w-fit">
                  <button
                    onClick={() => setActiveTab('learn')}
                    className={`px-5 py-2 rounded-full transition-all text-sm ${
                      activeTab === 'learn'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Learn
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-5 py-2 rounded-full transition-all text-sm ${
                      activeTab === 'notes'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('discuss')}
                    className={`px-5 py-2 rounded-full transition-all text-sm ${
                      activeTab === 'discuss'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Discuss
                  </button>
                </div>

                {activeTab === 'learn' && (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground/90 leading-relaxed">
                      The Bhagavad Gita presents three primary paths to spiritual realization:
                      Karma Yoga (the path of selfless action), Bhakti Yoga (the path of devotion),
                      and Jnana Yoga (the path of knowledge).
                    </p>
                    <p className="text-foreground/90 leading-relaxed mt-4">
                      Each path is valid and complete in itself, yet they complement one another.
                      Understanding these paths helps us choose the approach that resonates most
                      deeply with our nature and circumstances.
                    </p>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="text-sm text-muted-foreground">
                    <p>Your personal notes for this lesson will appear here.</p>
                  </div>
                )}

                {activeTab === 'discuss' && (
                  <div className="text-sm text-muted-foreground">
                    <p>Discussion forum coming soon.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  disabled={!hasPrevious}
                  className="px-6 py-3 border border-border text-foreground rounded-full hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous Lesson
                </button>
                <button
                  disabled={!hasNext}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Lesson
                </button>
              </div>
            </div>

            <div className="bg-card rounded-[20px] p-4 sm:p-5 shadow-sm border border-border h-fit">
              <h4 className="text-foreground mb-4">Lesson Notes</h4>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your insights and reflections..."
                className="w-full h-64 p-4 bg-input-background rounded-2xl border border-border resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm mb-4"
              />
              <button
                onClick={handleSaveNote}
                disabled={!note.trim()}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {noteSaved ? 'Saved!' : 'Save Note'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
