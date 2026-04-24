import { BookCheck, FileText, Flame } from 'lucide-react';

interface ProgressSummaryProps {
  lessonsCompleted?: number;
  notesWritten?: number;
  currentStreak?: number;
}

export function ProgressSummary({
  lessonsCompleted = 0,
  notesWritten = 0,
  currentStreak = 0,
}: ProgressSummaryProps) {
  const stats = [
    {
      label: 'Lessons Completed',
      value: lessonsCompleted,
      icon: BookCheck,
      color: 'text-primary',
    },
    {
      label: 'Notes Written',
      value: notesWritten,
      icon: FileText,
      color: 'text-accent',
    },
    {
      label: 'Current Streak',
      value: currentStreak,
      icon: Flame,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-card rounded-[20px] p-6 shadow-sm border border-border"
          >
            <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <p className="text-3xl text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
