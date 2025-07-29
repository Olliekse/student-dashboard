import { useState, useCallback, useEffect } from "react";
import { studentDataService, Course } from "../../../api/studentData";
import {
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Button from "../../../components/Button";

const Courses = () => {
  const [filter, setFilter] = useState<
    "all" | "active" | "completed" | "upcoming"
  >("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    studentDataService
      .getCourses()
      .then((data) => {
        setCourses(data);
        setError(null);
      })
      .catch(() => setError("Failed to load courses."))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (filter === "all") return true;
    return course.status === filter;
  });

  const handleSetFilter = useCallback(
    (key: "all" | "active" | "completed" | "upcoming") => setFilter(key),
    []
  );

  // Helper functions for course status display
  const getStatusIcon = (status: Course["status"]) => {
    switch (status) {
      case "active":
        return <PlayIcon className="w-5 h-5 text-blue-500" />;
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "upcoming":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <BookOpenIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: Course["status"]) => {
    switch (status) {
      case "active":
        return "In Progress";
      case "completed":
        return "Completed";
      case "upcoming":
        return "Upcoming";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">
            Track your learning progress and manage your courses
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All Courses" },
            { key: "active", label: "In Progress" },
            { key: "completed", label: "Completed" },
            { key: "upcoming", label: "Upcoming" },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() =>
                handleSetFilter(
                  filterOption.key as
                    | "all"
                    | "active"
                    | "completed"
                    | "upcoming"
                )
              }
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                filter === filterOption.key
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading/Error State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Loading courses...
          </h3>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-red-600 mb-2">{error}</h3>
        </div>
      ) : (
        <>
          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Course Image with Status Badge */}
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {getStatusText(course.status)}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Course Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    {getStatusIcon(course.status)}
                  </div>

                  {/* Course Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">Instructor:</span>
                      <span className="ml-2">{course.instructor}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">Category:</span>
                      <span className="ml-2">{course.category}</span>
                    </div>

                    {/* Progress Section for Active Courses */}
                    {course.status === "active" && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {course.completedLessons} of {course.totalLessons}{" "}
                          lessons completed
                        </div>
                      </div>
                    )}

                    {/* Completion Status */}
                    {course.status === "completed" && (
                      <div className="flex items-center text-sm text-green-600 pt-2">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Course completed successfully
                      </div>
                    )}

                    {/* Upcoming Course Start Date */}
                    {course.status === "upcoming" && (
                      <div className="text-sm text-gray-500 pt-2">
                        Starts:{" "}
                        {new Date(course.startDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Course Action Button */}
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Handle course action based on status
                      console.log(`Action for ${course.title}`);
                    }}
                    className="w-full mt-6"
                  >
                    {course.status === "active"
                      ? "Continue Learning"
                      : course.status === "completed"
                      ? "Review Course"
                      : "View Details"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpenIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500">
                No courses match your current filter.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Courses;
