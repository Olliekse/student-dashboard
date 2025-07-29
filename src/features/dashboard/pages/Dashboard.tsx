import { studentDataService } from "../../../api/studentData";
import {
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const student = studentDataService.getStudent();
  const activeCourses = studentDataService.getActiveCourses();
  const completedCourses = studentDataService.getCompletedCourses();

  const stats = [
    {
      name: "Total Courses",
      value: student.totalCourses,
      icon: BookOpenIcon,
      color: "bg-blue-500",
    },
    {
      name: "Completed",
      value: student.completedCourses,
      icon: CheckCircleIcon,
      color: "bg-green-500",
    },
    {
      name: "In Progress",
      value: student.currentCourses,
      icon: ClockIcon,
      color: "bg-yellow-500",
    },
    {
      name: "Completion",
      value: `${Math.round((student.completedCourses / student.totalCourses) * 100)}%`,
      icon: ChartBarIcon,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {student.name}! 👋
        </h2>
        <p className="text-gray-600">
          Continue your learning journey and track your progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl-lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-4 lg:p-6"
          >
            <div className="flex items-center">
              <div
                className={`p-2 lg:p-3 rounded-lg ${stat.color} flex-shrink-0`}
              >
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                <p className="text-xs lg:text-sm xl-lg:text-xs xl:text-sm font-medium text-gray-600 truncate">
                  {stat.name}
                </p>
                <p className="text-lg lg:text-xl xl-lg:text-lg xl:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Courses */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Active Courses
            </h3>
          </div>
          <div className="p-6">
            {activeCourses.length > 0 ? (
              <div className="space-y-4">
                {activeCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {course.instructor}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No active courses
              </p>
            )}
          </div>
        </div>

        {/* Recent Completed */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recently Completed
            </h3>
          </div>
          <div className="p-6">
            {completedCourses.slice(0, 3).length > 0 ? (
              <div className="space-y-4">
                {completedCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="flex items-center space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {course.instructor}
                      </p>
                      <div className="mt-1 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No completed courses yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
