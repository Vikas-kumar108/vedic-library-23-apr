import { useState } from "react";
import { Plus, Edit2, Trash2, Filter } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  course: string;
  type: "Video" | "Text" | "Audio";
  status: "Draft" | "Published";
  lastUpdated: string;
}

export function LessonsPage({ onAddLesson, onEditLesson }: { onAddLesson: () => void; onEditLesson: (id: number) => void }) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  const lessons: Lesson[] = [
    { id: 1, title: "Introduction to React Hooks", course: "React Fundamentals", type: "Video", status: "Published", lastUpdated: "2026-04-20" },
    { id: 2, title: "Understanding State Management", course: "React Fundamentals", type: "Text", status: "Published", lastUpdated: "2026-04-19" },
    { id: 3, title: "Advanced TypeScript Patterns", course: "TypeScript Mastery", type: "Video", status: "Draft", lastUpdated: "2026-04-18" },
    { id: 4, title: "CSS Grid Layout Guide", course: "Modern CSS", type: "Text", status: "Published", lastUpdated: "2026-04-17" },
    { id: 5, title: "Async/Await Deep Dive", course: "JavaScript Advanced", type: "Audio", status: "Draft", lastUpdated: "2026-04-16" },
  ];

  const courses = ["React Fundamentals", "TypeScript Mastery", "Modern CSS", "JavaScript Advanced"];

  const filteredLessons = lessons.filter(lesson => {
    if (statusFilter !== "all" && lesson.status !== statusFilter) return false;
    if (courseFilter !== "all" && lesson.course !== courseFilter) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-6 flex items-center justify-between">
        <h1>Lessons</h1>
        <button
          onClick={onAddLesson}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Lesson
        </button>
      </header>

      <main className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] mb-6 p-4 flex items-center gap-4">
          <Filter className="w-4 h-4 text-muted-foreground" />

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Course:</label>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.08)] bg-[#F8F7F4]">
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Title</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Course</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Type</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Last Updated</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="border-b border-[rgba(0,0,0,0.06)] last:border-0 hover:bg-[#F8F7F4]/50 transition-colors">
                  <td className="px-6 py-4 text-sm">{lesson.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{lesson.course}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {lesson.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                      lesson.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lesson.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{lesson.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditLesson(lesson.id)}
                        className="p-1.5 rounded hover:bg-secondary transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-secondary transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
