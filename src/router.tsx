import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./features/dashboard/components/Layout/DashboardLayout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Courses from "./features/dashboard/pages/Courses";
import ResumeTool from "./features/dashboard/pages/ResumeTool";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      ),
    },
    {
      path: "/courses",
      element: (
        <DashboardLayout>
          <Courses />
        </DashboardLayout>
      ),
    },
    {
      path: "/resume",
      element: (
        <DashboardLayout>
          <ResumeTool />
        </DashboardLayout>
      ),
    },
    {
      path: "/profile",
      element: (
        <DashboardLayout>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Profile Page</h1>
            <p>Profile functionality coming soon...</p>
          </div>
        </DashboardLayout>
      ),
    },
    {
      path: "/settings",
      element: (
        <DashboardLayout>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Settings Page</h1>
            <p>Settings functionality coming soon...</p>
          </div>
        </DashboardLayout>
      ),
    },
  ],
  {
    basename: "/student-dashboard",
  }
);
