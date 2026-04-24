import { BookOpen, Clock } from 'lucide-react';

interface RecommendedCardProps {
  title: string;
  type: string;
  duration: string;
  thumbnail?: string;
}

export function RecommendedCard({ title, type, duration, thumbnail }: RecommendedCardProps) {
  return (
    <div className="bg-card rounded-[20px] overflow-hidden shadow-sm border border-border hover:shadow-md transition-all">
      <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <BookOpen className="w-16 h-16 text-primary/40" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
            {type}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
        </div>

        <h4 className="text-foreground mb-4">{title}</h4>

        <button className="w-full border border-primary text-primary py-2.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
          Start Learning
        </button>
      </div>
    </div>
  );
}
