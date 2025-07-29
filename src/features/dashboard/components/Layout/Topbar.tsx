import { BellIcon } from "@heroicons/react/24/outline";
import { studentDataService } from "../../../../api/studentData";

const Topbar = () => {
  const student = studentDataService.getStudent();

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Student Dashboard
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-1 right-1 block w-2 h-2 bg-red-400 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{student.name}</p>
            <p className="text-xs text-gray-500">{student.email}</p>
          </div>
          <img
            className="w-8 h-8 rounded-full"
            src={student.avatar}
            alt={student.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
