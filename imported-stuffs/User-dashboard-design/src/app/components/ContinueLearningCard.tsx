import { PlayCircle } from 'lucide-react';

interface ContinueLearningCardProps {
  courseTitle?: string;
  lessonTitle?: string;
  progress?: number;
  onResume?: () => void;
}

export function ContinueLearningCard({
  courseTitle,
  lessonTitle,
  progress,
  onResume,
}: ContinueLearningCardProps) {
  const hasProgress = courseTitle && lessonTitle && progress !== undefined;

  return (
    <div className="bg-card rounded-[20px] p-6 shadow-sm border border-border hover:shadow-md transition-all">
      {hasProgress ? (
        <>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Continue Learning</p>
              <h3 className="text-foreground mb-1">{courseTitle}</h3>
              <p className="text-foreground/70">{lessonTitle}</p>
            </div>
            <PlayCircle className="w-12 h-12 text-primary flex-shrink-0" />
          </div>

          <div className="mb-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
          </div>

          <button
            onClick={onResume}
            className="w-full bg-primary text-primary-foreground py-3 rounded-full hover:opacity-90 transition-all"
          >
            Resume Lesson
          </button>
        </>
      ) : (
        <div className="text-center py-8">
          <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-foreground mb-2">Start your first lesson</h3>
          <p className="text-muted-foreground mb-6">
            Begin your journey of learning and self-discovery
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition-all">
            Explore Courses
          </button>
        </div>
      )}
    </div>
  );
}
