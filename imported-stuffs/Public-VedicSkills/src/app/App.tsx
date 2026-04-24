import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { Explore } from "./components/Explore";
import { CourseDetail } from "./components/CourseDetail";
import { LessonPage } from "./components/LessonPage";
import { PublicLesson } from "./components/PublicLesson";
import { ArticlePage } from "./components/ArticlePage";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";

type Page =
  | "home"
  | "explore"
  | "courses"
  | "course-detail"
  | "lesson"
  | "public-lesson"
  | "article"
  | "signup"
  | "login"
  | "forgot-password";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "explore":
        return <Explore onNavigate={handleNavigate} />;
      case "courses":
      case "course-detail":
        return <CourseDetail onNavigate={handleNavigate} />;
      case "lesson":
        return <LessonPage onNavigate={handleNavigate} />;
      case "public-lesson":
        return <PublicLesson onNavigate={handleNavigate} />;
      case "article":
        return <ArticlePage onNavigate={handleNavigate} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "forgot-password":
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return <div className="min-h-screen bg-background">{renderPage()}</div>;
}