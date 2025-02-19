
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAssessments from "./pages/teacher/TeacherAssessments";
import TeacherUsers from "./pages/teacher/TeacherUsers";
import TeacherAnalytics from "./pages/teacher/TeacherAnalytics";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAssessments from "./pages/student/StudentAssessments";
import StudentGrades from "./pages/student/StudentGrades";
import SchoolManagement from "./pages/SchoolManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to student dashboard */}
          <Route path="/" element={<Navigate to="/student" replace />} />
          
          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <DashboardLayout>
                <TeacherDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/teacher/assessments"
            element={
              <DashboardLayout>
                <TeacherAssessments />
              </DashboardLayout>
            }
          />
          <Route
            path="/teacher/users"
            element={
              <DashboardLayout>
                <TeacherUsers />
              </DashboardLayout>
            }
          />
          <Route
            path="/teacher/analytics"
            element={
              <DashboardLayout>
                <TeacherAnalytics />
              </DashboardLayout>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <DashboardLayout>
                <StudentDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/student/assessments"
            element={
              <DashboardLayout>
                <StudentAssessments />
              </DashboardLayout>
            }
          />
          <Route
            path="/student/grades"
            element={
              <DashboardLayout>
                <StudentGrades />
              </DashboardLayout>
            }
          />
          <Route
            path="/school-management"
            element={
              <DashboardLayout>
                <SchoolManagement />
              </DashboardLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
