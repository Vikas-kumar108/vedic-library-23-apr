import { ArrowLeft, CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { Page } from '../App';

interface Lesson {
  id: string;
  name: string;
  status: 'completed' | 'locked' | 'available';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseDetailProps {
  course: {
    id: string;
    title: string;
    description: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    modules: Module[];
  };
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export function CourseDetail({ course, onBack, onNavigate }: CourseDetailProps) {
  const getNextLesson = () => {
    for (const module of course.modules) {
      const availableLesson = module.lessons.find((lesson) => lesson.status === 'available');
      if (availableLesson) return availableLesson;
    }
    return null;
  };

  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Courses" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Course Details" userName="Arjun" onNavigate={onNavigate} />

        <main className="p-4 sm:p-6 lg:p-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </button>

            <div className="bg-card rounded-[20px] p-8 shadow-sm border border-border mb-6">
              <h1 className="text-foreground mb-3">{course.title}</h1>
              <p className="text-muted-foreground mb-6">{course.description}</p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </span>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {nextLesson && (
                <button
                  onClick={() => onNavigate('lesson')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-full hover:opacity-90 transition-all"
                >
                  {course.progress === 0 ? 'Start Course' : 'Resume Learning'}
                </button>
              )}
            </div>

            <div className="space-y-6">
              {course.modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-card rounded-[20px] p-6 shadow-sm border border-border"
                >
                  <h3 className="text-foreground mb-4">{module.title}</h3>

                  <div className="space-y-3">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                          lesson.status === 'available'
                            ? 'bg-primary/5 border border-primary/20 hover:bg-primary/10 cursor-pointer'
                            : lesson.status === 'completed'
                            ? 'bg-muted/50'
                            : 'bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {lesson.status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          )}
                          {lesson.status === 'available' && (
                            <PlayCircle className="w-5 h-5 text-primary" />
                          )}
                          {lesson.status === 'locked' && (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span
                            className={`${
                              lesson.status === 'locked'
                                ? 'text-muted-foreground'
                                : 'text-foreground'
                            }`}
                          >
                            {lesson.name}
                          </span>
                        </div>

                        {lesson.status === 'available' && (
                          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm hover:opacity-90 transition-all">
                            Start
                          </button>
                        )}
                        {lesson.status === 'completed' && (
                          <span className="text-xs text-primary px-3 py-1 bg-primary/10 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
