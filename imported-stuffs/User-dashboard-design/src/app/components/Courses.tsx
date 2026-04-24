import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CourseCard } from './CourseCard';
import { CourseDetail } from './CourseDetail';
import type { Page } from '../App';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  status: 'not-started' | 'in-progress' | 'completed';
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  name: string;
  status: 'completed' | 'locked' | 'available';
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Bhagavad Gita Foundations',
    description: 'Explore the fundamental teachings of the Bhagavad Gita and discover timeless wisdom for modern life.',
    progress: 45,
    totalLessons: 12,
    completedLessons: 5,
    status: 'in-progress',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to the Gita',
        lessons: [
          { id: 'l1', name: 'Historical Context', status: 'completed' },
          { id: 'l2', name: 'The Battlefield of Kurukshetra', status: 'completed' },
          { id: 'l3', name: 'Meeting Arjuna', status: 'completed' },
        ],
      },
      {
        id: 'm2',
        title: 'Core Teachings',
        lessons: [
          { id: 'l4', name: 'Understanding Dharma', status: 'completed' },
          { id: 'l5', name: 'The Three Paths', status: 'completed' },
          { id: 'l6', name: 'Karma Yoga in Practice', status: 'available' },
          { id: 'l7', name: 'Bhakti and Devotion', status: 'locked' },
        ],
      },
      {
        id: 'm3',
        title: 'Practical Applications',
        lessons: [
          { id: 'l8', name: 'Modern Leadership', status: 'locked' },
          { id: 'l9', name: 'Decision Making', status: 'locked' },
          { id: 'l10', name: 'Finding Purpose', status: 'locked' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Vedic Meditation Mastery',
    description: 'Learn ancient meditation techniques to cultivate inner peace and mental clarity.',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    status: 'not-started',
    modules: [
      {
        id: 'm1',
        title: 'Foundation',
        lessons: [
          { id: 'l1', name: 'What is Meditation?', status: 'available' },
          { id: 'l2', name: 'Preparing Your Space', status: 'locked' },
          { id: 'l3', name: 'Posture and Breathing', status: 'locked' },
        ],
      },
      {
        id: 'm2',
        title: 'Techniques',
        lessons: [
          { id: 'l4', name: 'Mantra Meditation', status: 'locked' },
          { id: 'l5', name: 'Breath Awareness', status: 'locked' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Yoga Philosophy',
    description: 'Discover the eight limbs of yoga and integrate ancient wisdom into daily practice.',
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    status: 'completed',
    modules: [
      {
        id: 'm1',
        title: 'The Eight Limbs',
        lessons: [
          { id: 'l1', name: 'Yama - Ethical Restraints', status: 'completed' },
          { id: 'l2', name: 'Niyama - Personal Observances', status: 'completed' },
          { id: 'l3', name: 'Asana - Physical Postures', status: 'completed' },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Sanskrit Fundamentals',
    description: 'Begin your journey into the sacred language of Sanskrit and unlock deeper understanding.',
    progress: 30,
    totalLessons: 15,
    completedLessons: 4,
    status: 'in-progress',
    modules: [
      {
        id: 'm1',
        title: 'The Alphabet',
        lessons: [
          { id: 'l1', name: 'Vowels', status: 'completed' },
          { id: 'l2', name: 'Consonants', status: 'completed' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Ayurvedic Lifestyle',
    description: 'Understand your unique constitution and create balance through Ayurvedic principles.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    status: 'not-started',
    modules: [
      {
        id: 'm1',
        title: 'Introduction',
        lessons: [
          { id: 'l1', name: 'What is Ayurveda?', status: 'available' },
          { id: 'l2', name: 'The Three Doshas', status: 'locked' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Mindful Living',
    description: 'Cultivate awareness and presence in everyday moments through practical exercises.',
    progress: 70,
    totalLessons: 6,
    completedLessons: 4,
    status: 'in-progress',
    modules: [
      {
        id: 'm1',
        title: 'Daily Practice',
        lessons: [
          { id: 'l1', name: 'Morning Rituals', status: 'completed' },
          { id: 'l2', name: 'Mindful Eating', status: 'completed' },
        ],
      },
    ],
  },
];

type TabType = 'all' | 'in-progress' | 'completed';

interface CoursesProps {
  onNavigate: (page: Page) => void;
}

export function Courses({ onNavigate }: CoursesProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((course) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return course.status === 'in-progress';
    if (activeTab === 'completed') return course.status === 'completed';
    return true;
  });

  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} onNavigate={onNavigate} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Courses" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Your Courses" userName="Arjun" onNavigate={onNavigate} />

        <main className="p-4 sm:p-6 lg:p-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 sm:gap-3 mb-6 lg:mb-8 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 sm:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-4 sm:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeTab === 'in-progress'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 sm:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeTab === 'completed'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-primary'
                }`}
              >
                Completed
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => setSelectedCourse(course)}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No courses found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
