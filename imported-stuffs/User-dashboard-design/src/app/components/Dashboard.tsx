import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContinueLearningCard } from './ContinueLearningCard';
import { RecommendedCard } from './RecommendedCard';
import { DailyReflection } from './DailyReflection';
import { ProgressSummary } from './ProgressSummary';
import type { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const userName = 'Arjun';

  const recommendedCourses = [
    {
      title: 'Introduction to Vedic Meditation',
      type: 'Lesson',
      duration: '12 min',
    },
    {
      title: 'The Art of Mindful Living',
      type: 'Article',
      duration: '8 min read',
    },
    {
      title: 'Understanding Karma Yoga',
      type: 'Lesson',
      duration: '15 min',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Dashboard" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Dashboard" userName={userName} onNavigate={onNavigate} />

        <main className="p-4 sm:p-6 lg:p-8 pb-16">
          <div className="max-w-6xl mx-auto space-y-8 lg:space-y-12">
            <section>
              <h1 className="text-foreground mb-2">Welcome back, {userName}</h1>
              <p className="text-muted-foreground">
                Continue your journey where you left off.
              </p>
            </section>

            <section>
              <ContinueLearningCard
                courseTitle="Bhagavad Gita Foundations"
                lessonTitle="Understanding Dharma"
                progress={45}
                onResume={() => onNavigate('lesson')}
              />
            </section>

            <section>
              <h3 className="text-foreground mb-6">Recommended for You</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {recommendedCourses.map((course, index) => (
                  <RecommendedCard
                    key={index}
                    title={course.title}
                    type={course.type}
                    duration={course.duration}
                  />
                ))}
              </div>
            </section>

            <section>
              <DailyReflection />
            </section>

            <section>
              <ProgressSummary
                lessonsCompleted={12}
                notesWritten={28}
                currentStreak={7}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
