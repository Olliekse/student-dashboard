import axios from "axios";

// Types for Student Dashboard
export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  image: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
}

export interface ResumeSuggestion {
  id: string;
  type: "achievement" | "action-verb" | "formatting" | "content";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalCourses: number;
  completedCourses: number;
  currentCourses: number;
}

// Mock Data
export const mockStudent: Student = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  totalCourses: 12,
  completedCourses: 8,
  currentCourses: 4,
};

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    instructor: "Sarah Chen",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    category: "Frontend Development",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    description:
      "Learn the basics of React including components, state, and props.",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    status: "active",
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    instructor: "Mike Rodriguez",
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
    description:
      "Master advanced JavaScript concepts including ES6+ features and async programming.",
    startDate: "2025-11-01",
    endDate: "2025-01-01",
    status: "completed",
  },
  {
    id: "3",
    title: "UI/UX Design Principles",
    instructor: "Emma Wilson",
    progress: 30,
    totalLessons: 20,
    completedLessons: 6,
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
    description:
      "Learn the fundamentals of user interface and user experience design.",
    startDate: "2025-02-01",
    endDate: "2025-04-01",
    status: "active",
  },
  {
    id: "4",
    title: "Node.js Backend Development",
    instructor: "David Kim",
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    category: "Backend Development",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=200&fit=crop",
    description:
      "Build scalable backend applications with Node.js and Express.",
    startDate: "2025-04-01",
    endDate: "2025-06-01",
    status: "upcoming",
  },
];

export const mockResumeSuggestions: ResumeSuggestion[] = [
  {
    id: "1",
    type: "achievement",
    title: "Add More Measurable Achievements",
    description:
      "Include specific metrics and quantifiable results in your experience descriptions.",
    priority: "high",
  },
  {
    id: "2",
    type: "action-verb",
    title: "Use Strong Action Verbs",
    description:
      'Start bullet points with powerful action verbs like "Developed", "Implemented", "Led".',
    priority: "high",
  },
  {
    id: "3",
    type: "formatting",
    title: "Improve Formatting Consistency",
    description:
      "Ensure consistent spacing, bullet points, and font usage throughout.",
    priority: "medium",
  },
  {
    id: "4",
    type: "content",
    title: "Add Relevant Skills Section",
    description:
      "Include a dedicated skills section highlighting technical and soft skills.",
    priority: "medium",
  },
];

// Data Service
class StudentDataService {
  // Get student profile
  async getStudent(): Promise<Student> {
    // Simulate API call with axios and delay
    return axios.get("/mock/student").then(() => {
      return new Promise<Student>((resolve) => {
        setTimeout(() => resolve(mockStudent), 500);
      });
    });
  }

  // Get all courses
  async getCourses(): Promise<Course[]> {
    return axios.get("/mock/courses").then(() => {
      return new Promise<Course[]>((resolve) => {
        setTimeout(() => resolve(mockCourses), 500);
      });
    });
  }

  // Get active courses
  async getActiveCourses(): Promise<Course[]> {
    return axios.get("/mock/courses/active").then(() => {
      return new Promise<Course[]>((resolve) => {
        setTimeout(
          () =>
            resolve(mockCourses.filter((course) => course.status === "active")),
          500
        );
      });
    });
  }

  // Get completed courses
  async getCompletedCourses(): Promise<Course[]> {
    return axios.get("/mock/courses/completed").then(() => {
      return new Promise<Course[]>((resolve) => {
        setTimeout(
          () =>
            resolve(
              mockCourses.filter((course) => course.status === "completed")
            ),
          500
        );
      });
    });
  }

  // Analyze resume and return suggestions
  async analyzeResume(resumeText: string): Promise<ResumeSuggestion[]> {
    return axios.post("/mock/analyze-resume", { resumeText }).then(() => {
      return new Promise<ResumeSuggestion[]>((resolve) => {
        setTimeout(() => {
          const suggestions = [...mockResumeSuggestions];

          if (
            !resumeText.toLowerCase().includes("developed") &&
            !resumeText.toLowerCase().includes("implemented")
          ) {
            suggestions.push({
              id: "5",
              type: "action-verb",
              title: "Include More Action Verbs",
              description:
                "Your resume could benefit from more dynamic action verbs.",
              priority: "high",
            });
          }

          if (!resumeText.includes("%") && !resumeText.includes("increased")) {
            suggestions.push({
              id: "6",
              type: "achievement",
              title: "Add Quantifiable Results",
              description:
                "Include specific percentages and metrics to strengthen your achievements.",
              priority: "high",
            });
          }

          resolve(suggestions);
        }, 2000); // 2 second delay to simulate processing
      });
    });
  }
}

export const studentDataService = new StudentDataService();
