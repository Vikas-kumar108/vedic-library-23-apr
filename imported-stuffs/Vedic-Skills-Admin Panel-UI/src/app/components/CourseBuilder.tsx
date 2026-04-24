import { useState } from "react";
import { ArrowLeft, GripVertical, Plus, X } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Lesson {
  id: number;
  title: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

const ITEM_TYPE = "LESSON";

function DraggableLesson({ lesson, source }: { lesson: Lesson; source: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { lesson, source },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 px-3 py-2.5 bg-white border border-border rounded-lg hover:border-primary cursor-move transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <GripVertical className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm flex-1">{lesson.title}</span>
    </div>
  );
}

function ModuleDropZone({
  module,
  onDropLesson,
  onRemoveLesson,
}: {
  module: Module;
  onDropLesson: (moduleId: number, lesson: Lesson, source: string) => void;
  onRemoveLesson: (moduleId: number, lessonId: number) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { lesson: Lesson; source: string }) => {
      onDropLesson(module.id, item.lesson, item.source);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] overflow-hidden">
      <div className="bg-[#F8F7F4] px-4 py-3 border-b border-[rgba(0,0,0,0.08)]">
        <h3 className="text-sm">{module.title}</h3>
      </div>
      <div
        ref={drop}
        className={`p-4 min-h-[200px] space-y-2 ${
          isOver ? 'bg-primary/5' : ''
        }`}
      >
        {module.lessons.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Drop lessons here
          </div>
        ) : (
          module.lessons.map((lesson) => (
            <div key={lesson.id} className="flex items-center gap-2">
              <div className="flex-1">
                <DraggableLesson lesson={lesson} source={`module-${module.id}`} />
              </div>
              <button
                onClick={() => onRemoveLesson(module.id, lesson.id)}
                className="p-1.5 rounded hover:bg-destructive/10 text-destructive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function CourseBuilder({ onBack, courseId }: { onBack: () => void; courseId?: number }) {
  const [availableLessons, setAvailableLessons] = useState<Lesson[]>([
    { id: 1, title: "Introduction to React Hooks" },
    { id: 2, title: "Understanding State Management" },
    { id: 3, title: "Advanced TypeScript Patterns" },
    { id: 4, title: "CSS Grid Layout Guide" },
    { id: 5, title: "Async/Await Deep Dive" },
    { id: 6, title: "React Context API" },
    { id: 7, title: "Performance Optimization" },
  ]);

  const [modules, setModules] = useState<Module[]>([
    { id: 1, title: "Module 1: Getting Started", lessons: [] },
    { id: 2, title: "Module 2: Core Concepts", lessons: [] },
  ]);

  const handleDropLesson = (moduleId: number, lesson: Lesson, source: string) => {
    if (source === "available") {
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === moduleId
            ? { ...module, lessons: [...module.lessons, lesson] }
            : module
        )
      );
      setAvailableLessons((prev) => prev.filter((l) => l.id !== lesson.id));
    } else {
      const sourceModuleId = parseInt(source.split("-")[1]);
      if (sourceModuleId !== moduleId) {
        setModules((prevModules) =>
          prevModules.map((module) => {
            if (module.id === sourceModuleId) {
              return {
                ...module,
                lessons: module.lessons.filter((l) => l.id !== lesson.id),
              };
            }
            if (module.id === moduleId) {
              return {
                ...module,
                lessons: [...module.lessons, lesson],
              };
            }
            return module;
          })
        );
      }
    }
  };

  const handleRemoveLesson = (moduleId: number, lessonId: number) => {
    const module = modules.find((m) => m.id === moduleId);
    const lesson = module?.lessons.find((l) => l.id === lessonId);

    if (lesson) {
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === moduleId
            ? { ...module, lessons: module.lessons.filter((l) => l.id !== lessonId) }
            : module
        )
      );
      setAvailableLessons((prev) => [...prev, lesson]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-[#F8F7F4] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1>Course Builder</h1>
          </div>
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Structure
          </button>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="h-full flex">
            <div className="w-80 bg-white border-r border-[rgba(0,0,0,0.08)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Available Lessons</h2>
                <span className="text-sm text-muted-foreground">
                  {availableLessons.length}
                </span>
              </div>
              <div className="space-y-2">
                {availableLessons.map((lesson) => (
                  <DraggableLesson key={lesson.id} lesson={lesson} source="available" />
                ))}
              </div>
            </div>

            <div className="flex-1 p-8 bg-background">
              <div className="max-w-4xl mx-auto space-y-6">
                {modules.map((module) => (
                  <ModuleDropZone
                    key={module.id}
                    module={module}
                    onDropLesson={handleDropLesson}
                    onRemoveLesson={handleRemoveLesson}
                  />
                ))}

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors text-muted-foreground hover:text-primary"
                >
                  <Plus className="w-4 h-4" />
                  Add Module
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}
