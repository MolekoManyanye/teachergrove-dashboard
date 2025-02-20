
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
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
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
