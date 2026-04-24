import { Plus, Edit2, Trash2, Settings } from "lucide-react";

interface Course {
  id: number;
  title: string;
  lessonCount: number;
  status: "Draft" | "Published";
}

export function CoursesPage({ onAddCourse, onEditCourse, onBuildCourse }: {
  onAddCourse: () => void;
  onEditCourse: (id: number) => void;
  onBuildCourse: (id: number) => void;
}) {
  const courses: Course[] = [
    { id: 1, title: "React Fundamentals", lessonCount: 12, status: "Published" },
    { id: 2, title: "TypeScript Mastery", lessonCount: 8, status: "Published" },
    { id: 3, title: "Modern CSS", lessonCount: 15, status: "Draft" },
    { id: 4, title: "JavaScript Advanced", lessonCount: 10, status: "Published" },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-6 flex items-center justify-between">
        <h1>Courses</h1>
        <button
          onClick={onAddCourse}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </header>

      <main className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.08)] bg-[#F8F7F4]">
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Course Title</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Number of Lessons</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-[rgba(0,0,0,0.06)] last:border-0 hover:bg-[#F8F7F4]/50 transition-colors">
                  <td className="px-6 py-4 text-sm">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{course.lessonCount} lessons</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                      course.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onBuildCourse(course.id)}
                        className="p-1.5 rounded hover:bg-secondary transition-colors"
                        title="Build Course"
                      >
                        <Settings className="w-4 h-4 text-accent" />
                      </button>
                      <button
                        onClick={() => onEditCourse(course.id)}
                        className="p-1.5 rounded hover:bg-secondary transition-colors"
                        title="Edit Course"
                      >
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-secondary transition-colors" title="Delete Course">
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
