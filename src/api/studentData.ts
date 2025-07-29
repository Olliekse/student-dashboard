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

// Axios helper
const BASE = import.meta.env.BASE_URL;

// Axios artificial delay function
function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// Data Service
class StudentDataService {
  // Get student profile
  async getStudent(): Promise<Student> {
    // Simulate API call with axios and delay
    const res = await axios.get<Student>(`${BASE}mock/student.json`);
    return delay(500, res.data);
  }

  // Get all courses
  async getCourses(): Promise<Course[]> {
    const res = await axios.get<Course[]>(`${BASE}mock/courses.json`);
    return delay(500, res.data);
  }

  // Get active courses
  async getActiveCourses(): Promise<Course[]> {
    const res = await axios.get<Course[]>(`${BASE}mock/courses-active.json`);
    return delay(500, res.data);
  }

  // Get completed courses
  async getCompletedCourses(): Promise<Course[]> {
    const res = await axios.get<Course[]>(`${BASE}mock/courses-completed.json`);
    return delay(500, res.data);
  }

  // Analyze resume and return suggestions
  async analyzeResume(resumeText: string): Promise<ResumeSuggestion[]> {
    const res = await axios.get<ResumeSuggestion[]>(
      `${BASE}mock/analyze-resume.json`
    );
    const suggestions = [...res.data];

    const text = resumeText.toLowerCase();

    if (!text.includes("developed") && !text.includes("implemented")) {
      suggestions.push({
        id: "extra-1",
        type: "action-verb",
        title: "Include More Action Verbs",
        description:
          "Your resume could benefit from more dynamic action verbs like 'Developed', 'Implemented', or 'Led'.",
        priority: "high",
      });
    }

    if (!resumeText.includes("%") && !resumeText.includes("increased")) {
      suggestions.push({
        id: "extra-2",
        type: "achievement",
        title: "Add Quantifiable Results",
        description:
          "Include specific percentages or metrics to strengthen your achievements.",
        priority: "high",
      });
    }

    return delay(2000, suggestions);
  }
}

export const studentDataService = new StudentDataService();
