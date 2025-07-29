import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UserIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

import React from "react";

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "My Courses", href: "/courses", icon: BookOpenIcon },
    { name: "Resume Tool", href: "/resume", icon: DocumentTextIcon },
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">EduTech</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2025 EduTech Portal
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
