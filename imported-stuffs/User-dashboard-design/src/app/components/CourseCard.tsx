import { BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: {
    title: string;
    description: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    status: 'not-started' | 'in-progress' | 'completed';
  };
  onClick: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const getButtonText = () => {
    if (course.status === 'completed') return 'Review Course';
    if (course.status === 'in-progress') return 'Resume';
    return 'Start Course';
  };

  return (
    <div className="bg-card rounded-[20px] p-6 shadow-sm border border-border hover:shadow-md transition-all flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <BookOpen className="w-6 h-6 text-primary" />
      </div>

      <h3 className="text-foreground mb-2">{course.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
        {course.description}
      </p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            {course.completedLessons} / {course.totalLessons} lessons
          </span>
          <span className="text-xs text-muted-foreground">{course.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={onClick}
        className="w-full bg-primary text-primary-foreground py-2.5 rounded-full hover:opacity-90 transition-all"
      >
        {getButtonText()}
      </button>
    </div>
  );
}
