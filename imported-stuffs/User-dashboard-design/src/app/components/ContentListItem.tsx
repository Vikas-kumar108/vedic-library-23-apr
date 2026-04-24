import { BookOpen, FileText, ChevronRight } from 'lucide-react';

interface ContentListItemProps {
  item: {
    title: string;
    type: 'Verse' | 'Article';
    category: string;
  };
  onClick: () => void;
}

export function ContentListItem({ item, onClick }: ContentListItemProps) {
  const Icon = item.type === 'Verse' ? BookOpen : FileText;

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl p-5 border border-border hover:shadow-md hover:border-primary/30 transition-all flex items-center justify-between group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="text-left">
          <h4 className="text-foreground mb-1">{item.title}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">
              {item.type}
            </span>
            <span className="text-xs text-muted-foreground">{item.category}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  );
}
