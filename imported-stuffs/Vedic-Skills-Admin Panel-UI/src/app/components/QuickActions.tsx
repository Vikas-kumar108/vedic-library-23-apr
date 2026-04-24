import { Plus } from "lucide-react";

export function QuickActions({ onAddLesson, onAddArticle, onAddCourse }: { onAddLesson?: () => void; onAddArticle?: () => void; onAddCourse?: () => void }) {
  return (
    <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] p-6">
      <h3 className="mb-4">Quick Actions</h3>
      <div className="space-y-2">
        <ActionButton label="Add Lesson" onClick={onAddLesson} />
        <ActionButton label="Add Course" onClick={onAddCourse} />
        <ActionButton label="Add Article" onClick={onAddArticle} />
      </div>
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      <Plus className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
