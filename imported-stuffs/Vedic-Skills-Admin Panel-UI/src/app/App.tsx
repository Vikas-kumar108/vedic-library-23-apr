import { useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsCard } from "./components/StatsCard";
import { RecentActivity } from "./components/RecentActivity";
import { QuickActions } from "./components/QuickActions";
import { LessonsPage } from "./components/LessonsPage";
import { LessonForm } from "./components/LessonForm";
import { ArticlesPage } from "./components/ArticlesPage";
import { ArticleEditor } from "./components/ArticleEditor";
import { LibraryPage } from "./components/LibraryPage";
import { LibraryEditor } from "./components/LibraryEditor";
import { CoursesPage } from "./components/CoursesPage";
import { CourseForm } from "./components/CourseForm";
import { CourseBuilder } from "./components/CourseBuilder";

type View = "dashboard" | "lessons" | "lesson-form" | "articles" | "article-editor" | "library" | "library-editor" | "courses" | "course-form" | "course-builder";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("courses");
  const [editingLessonId, setEditingLessonId] = useState<number | undefined>();
  const [editingArticleId, setEditingArticleId] = useState<number | undefined>();
  const [editingLibraryId, setEditingLibraryId] = useState<number | undefined>();
  const [editingCourseId, setEditingCourseId] = useState<number | undefined>();
  const [buildingCourseId, setBuildingCourseId] = useState<number | undefined>();

  const handleAddLesson = () => {
    setEditingLessonId(undefined);
    setCurrentView("lesson-form");
  };

  const handleEditLesson = (id: number) => {
    setEditingLessonId(id);
    setCurrentView("lesson-form");
  };

  const handleBackToLessons = () => {
    setCurrentView("lessons");
    setEditingLessonId(undefined);
  };

  const handleAddArticle = () => {
    setEditingArticleId(undefined);
    setCurrentView("article-editor");
  };

  const handleEditArticle = (id: number) => {
    setEditingArticleId(id);
    setCurrentView("article-editor");
  };

  const handleBackToArticles = () => {
    setCurrentView("articles");
    setEditingArticleId(undefined);
  };

  const handleAddLibrary = () => {
    setEditingLibraryId(undefined);
    setCurrentView("library-editor");
  };

  const handleEditLibrary = (id: number) => {
    setEditingLibraryId(id);
    setCurrentView("library-editor");
  };

  const handleBackToLibrary = () => {
    setCurrentView("library");
    setEditingLibraryId(undefined);
  };

  const handleAddCourse = () => {
    setEditingCourseId(undefined);
    setCurrentView("course-form");
  };

  const handleEditCourse = (id: number) => {
    setEditingCourseId(id);
    setCurrentView("course-form");
  };

  const handleBuildCourse = (id: number) => {
    setBuildingCourseId(id);
    setCurrentView("course-builder");
  };

  const handleBackToCourses = () => {
    setCurrentView("courses");
    setEditingCourseId(undefined);
    setBuildingCourseId(undefined);
  };

  const handleNavigate = (page: string) => {
    if (page === "dashboard") {
      setCurrentView("dashboard");
    } else if (page === "lessons") {
      setCurrentView("lessons");
    } else if (page === "articles") {
      setCurrentView("articles");
    } else if (page === "library") {
      setCurrentView("library");
    } else if (page === "courses") {
      setCurrentView("courses");
    }
    setEditingLessonId(undefined);
    setEditingArticleId(undefined);
    setEditingLibraryId(undefined);
    setEditingCourseId(undefined);
    setBuildingCourseId(undefined);
  };

  return (
    <div className="size-full flex bg-background">
      <AdminSidebar currentPage={currentView} onNavigate={handleNavigate} />

      {currentView === "dashboard" && (
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />

          <main className="flex-1 p-8 overflow-auto">
            <div className="grid grid-cols-4 gap-6 mb-8">
              <StatsCard title="Total Users" value="2,847" icon="👥" />
              <StatsCard title="Total Lessons" value="156" icon="📚" />
              <StatsCard title="Total Courses" value="24" icon="🎓" />
              <StatsCard title="Total Notes" value="1,293" icon="📝" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <RecentActivity />
              </div>
              <div>
                <QuickActions onAddLesson={handleAddLesson} onAddArticle={handleAddArticle} onAddCourse={handleAddCourse} />
              </div>
            </div>
          </main>
        </div>
      )}

      {currentView === "lessons" && (
        <LessonsPage onAddLesson={handleAddLesson} onEditLesson={handleEditLesson} />
      )}

      {currentView === "lesson-form" && (
        <LessonForm onBack={handleBackToLessons} lessonId={editingLessonId} />
      )}

      {currentView === "articles" && (
        <ArticlesPage onAddArticle={handleAddArticle} onEditArticle={handleEditArticle} />
      )}

      {currentView === "article-editor" && (
        <ArticleEditor onBack={handleBackToArticles} articleId={editingArticleId} />
      )}

      {currentView === "library" && (
        <LibraryPage onAddLibrary={handleAddLibrary} onEditLibrary={handleEditLibrary} />
      )}

      {currentView === "library-editor" && (
        <LibraryEditor onBack={handleBackToLibrary} libraryId={editingLibraryId} />
      )}

      {currentView === "courses" && (
        <CoursesPage
          onAddCourse={handleAddCourse}
          onEditCourse={handleEditCourse}
          onBuildCourse={handleBuildCourse}
        />
      )}

      {currentView === "course-form" && (
        <CourseForm onBack={handleBackToCourses} courseId={editingCourseId} />
      )}

      {currentView === "course-builder" && (
        <CourseBuilder onBack={handleBackToCourses} courseId={buildingCourseId} />
      )}
    </div>
  );
}