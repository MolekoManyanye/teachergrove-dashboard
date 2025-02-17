
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { BookOpen, Users, BarChart, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're in student or teacher section
  const isStudentSection = location.pathname.startsWith("/student");

  const teacherMenuItems = [
    { icon: BookOpen, label: "Assessments", path: "/assessments" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: BarChart, label: "Analytics", path: "/analytics" },
  ];

  const studentMenuItems = [
    { icon: BookOpen, label: "Dashboard", path: "/student" },
    { icon: BookOpen, label: "Assessments", path: "/student/assessments" },
    { icon: BarChart, label: "Grades", path: "/student/grades" },
  ];

  const menuItems = isStudentSection ? studentMenuItems : teacherMenuItems;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <div className="px-4 py-6">
              <h1 className="text-xl font-semibold text-mint-600">TeacherGrove</h1>
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-mint-50 hover:text-mint-600 rounded-lg transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="absolute bottom-4 w-full px-4">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 min-h-screen p-8 animate-fadeIn">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
