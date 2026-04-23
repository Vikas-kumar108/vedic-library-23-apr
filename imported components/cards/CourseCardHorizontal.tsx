import { Star, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';

interface CourseCardHorizontalProps {
  title: string;
  instructor: string;
  thumbnail: string;
  progress?: number;
  duration: string;
  lessonsCount: number;
  rating: number;
  enrolled?: boolean;
}

export function CourseCardHorizontal({
  title,
  instructor,
  thumbnail,
  progress,
  duration,
  lessonsCount,
  rating,
  enrolled = false,
}: CourseCardHorizontalProps) {
  return (
    <article className="group flex items-center gap-4 p-3 bg-white dark:bg-neutral-900 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-all border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs">
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <h3 className="font-semibold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <span>{instructor}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lessonsCount} lessons</span>
          </div>
        </div>

        {enrolled && progress !== undefined && (
          <div className="space-y-1">
            <Progress value={progress} className="h-1.5" />
            <p className="text-xs text-neutral-500">{progress}% complete</p>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="flex items-center gap-2">
        {enrolled ? (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
            Continue
          </button>
        ) : (
          <button className="px-4 py-2 border border-neutral-900 dark:border-white text-neutral-900 dark:text-white rounded-lg text-sm font-medium hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all whitespace-nowrap">
            Enroll
          </button>
        )}
        <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
      </div>
    </article>
  );
}
